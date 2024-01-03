# A Remix stack with Mongoose integration

This is a basic [custom template][custom-template] that integrates [Remix][remix] with [Mongoose][mongoose] (and thereby [MongoDB][mongodb]), and configures [Tailwind CSS][tailwindcss] and [Prettier][prettier].

## Installation

Run the following in a terminal (you will be prompted to create a directory to contain your project, so run this command in the parent directory):

```sh
npx create-remix@latest --template bewildergeist/remix-mongoose-stack
```

[More information on using custom templates in Remix][custom-template].

## Getting started

1. Rename `.env.example` to `.env` and add your MongoDB connection string as the `MONGODB_URL` variable
2. [Initialize a new repository][vs-code-git-init] in this directory and push it to GitHub

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

[tailwindcss]: https://tailwindcss.com
[mongodb]: https://www.mongodb.com/atlas
[mongoose]: https://mongoosejs.com
[prettier]: https://prettier.io
[remix]: https://remix.run
[custom-template]: https://remix.run/docs/en/main/guides/templates
[vs-code-git-init]: https://code.visualstudio.com/docs/editor/versioncontrol#_initialize-a-repository
