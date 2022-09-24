# A Remix stack with Mongoose integration

This is a basic ["custom stack" template][custom-stack] that integrates [Remix][remix] with [Mongoose][mongoose] (and thereby [MongoDB][mongodb]), and configures [Tailwind CSS][tailwindcss].

## Installation

Run the following in a terminal (you will be prompted to create a directory to contain your project, so run this command in the parent directory):

```sh
npx create-remix@latest --template bewildergeist/remix-mongoose-stack
```

[More information on using custom stacks in Remix][custom-stack].

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
[remix]: https://remix.run
[custom-stack]: https://remix.run/docs/en/v1/pages/stacks#custom-stacks
[vs-code-git-init]: https://code.visualstudio.com/docs/editor/versioncontrol#_initialize-a-repository
