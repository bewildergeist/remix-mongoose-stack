import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return [{ title: "Remix + Mongoose" }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 p-4 font-sans text-slate-800">
        <header className="mb-4 border-b-2 pb-3">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link to="/books/new" className="ml-3 text-blue-600 hover:underline">
            New book
          </Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
