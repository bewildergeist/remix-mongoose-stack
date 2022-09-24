import { useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = connectDb();
  const books = await db.models.Book.find();
  return books;
}

export default function Index() {
  const books = useLoaderData();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Remix + Mongoose</h1>
      <h2 className="mb-3 text-lg font-bold">
        Here are a few of my favorite books:
      </h2>
      <ul className="ml-5 list-disc">
        {books.map((book) => {
          return (
            <li key={book._id}>
              <Link
                to={`/books/${book._id}`}
                className="text-blue-600 hover:underline"
              >
                {book.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
