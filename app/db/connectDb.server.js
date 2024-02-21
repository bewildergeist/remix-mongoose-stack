import mongoose from "mongoose";
import { models } from "./models.js";

const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  const errorMessage =
    NODE_ENV === "production"
      ? "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
      : "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}

// Call this function from entry.server.jsx. We reuse an existing Mongoose db
// connection to avoid creating multiple connections in dev mode when Remix
// "purges the require cache" when reloading on file changes.
export default function connectDb() {
  // Just for logging purposes:
  let modelCreationType = "Creating";

  if (NODE_ENV === "development") {
    // In development mode, we want to overwrite any existing models to ensure
    // we pick up any changes made in schemas.
    mongoose.set("overwriteModels", true);
    // If we have any models already, log out that we're overwriting them:
    if (Object.keys(mongoose.models).length > 0) {
      modelCreationType = "Overwriting";
    }
  }

  console.log(
    // E.g. "Mongoose: Creating 2 models (Book, Author)"
    "Mongoose: %s %d %s (%s)",
    modelCreationType,
    models.length,
    models.length === 1 ? "model" : "models",
    models.map((model) => model.name).join(", "),
  );

  // Create or overwrite the models exported from ./models.js:
  for (const model of models) {
    mongoose.model(model.name, model.schema, model.collection);
  }

  // Reuse the existing Mongoose connection if we have one...
  // https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState
  const readyState = mongoose.connection.readyState;
  if (readyState > 0) {
    console.log(
      "Mongoose: Re-using existing connection (readyState: %d)",
      readyState,
    );
    return;
  }

  // If no connection exists yet, set up event logging...
  // https://mongoosejs.com/docs/connections.html#connection-events
  mongoose.connection.on("error", (error) => {
    console.error("Mongoose: error %s", error);
  });

  for (const event of ["connected", "reconnected", "disconnected", "close"]) {
    mongoose.connection.on(event, () => console.log("Mongoose: %s", event));
  }

  // ...and create a new connection:
  mongoose.connect(MONGODB_URL).catch((error) => {
    console.error(error);
  });
}
