import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = connectDb();
  const book = await db.models.Book.findById(params.bookId);
  if (!book) {
    throw new Response(`Couldn't find book with id ${params.bookId}`, {
      status: 404,
    });
  }
  return json(book);
}

export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{book.title}</h1>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </code>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="font-bold text-red-500">
      {error.name}: {error.message}
    </h1>
  );
}
