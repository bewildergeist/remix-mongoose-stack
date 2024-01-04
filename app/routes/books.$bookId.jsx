import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import mongoose from "mongoose";

export async function loader({ params }) {
  const book = await mongoose.models.Book.findById(params.bookId);
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{`${error.status} ${error.statusText}`}</h1>
        <h2>{error.data}</h2>
      </div>
    );
  }

  return (
    <h1 className="font-bold text-red-500">
      {error?.name}: {error?.message}
    </h1>
  );
}
