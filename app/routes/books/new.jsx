import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function action({ request }) {
  const form = await request.formData();
  const db = connectDb();
  try {
    const newBook = await db.models.Book.create({ title: form.get("title") });
    return redirect(`/books/${newBook._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 },
    );
  }
}

export default function CreateBook() {
  const actionData = useActionData();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Create book</h1>
      <Form method="post">
        <label htmlFor="title" className="mb-1 block font-semibold">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          defaultValue={actionData?.values.title}
          className={
            actionData?.errors.title ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.title && (
          <p className="mt-1 mb-0 text-red-500">
            {actionData.errors.title.message}
          </p>
        )}
        <br />
        <button
          type="submit"
          className="mt-3 rounded bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
        >
          Save
        </button>
      </Form>
    </div>
  );
}
