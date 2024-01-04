import mongoose from "mongoose";
import { models } from "./models.js";

const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  if (NODE_ENV === "production") {
    throw new Error(
      "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name.",
    );
  } else {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name.",
    );
  }
}

// We reuse any existing Mongoose db connection to avoid creating multiple
// connections in dev mode when Remix "purges the require cache" when reloading
// on file changes.
export default function connectDb() {
  // Reuse the existing Mongoose connection if we have one...
  // https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState
  if (mongoose.connection.readyState > 0) {
    console.log("Re-using existing Mongoose connection (readyState=%d)", mongoose.connection.readyState);
    // ...but overwrite all models in development to ensure we pick up any changes made in schemas
    if (NODE_ENV === "development") {
      for (const model of models) {
        if (mongoose.connection.models[model.name]) {
          console.log("Deleting existing Mongoose model: %s", model.name);
          mongoose.connection.deleteModel(model.name);
        }
        console.log("Creating Mongoose model: %s", model.name);
        mongoose.connection.model(model.name, model.schema, model.collection);
      }
    }

    return mongoose.connection;
  }

  // If no connection exists yet, set up event logging...
  mongoose.connection.on('connected', () => console.log('Mongoose: connected, NODE_ENV=%s', NODE_ENV));
  mongoose.connection.on('disconnected', () => console.log('Mongoose: disconnected'));
  mongoose.connection.on('reconnected', () => console.log('Mongoose: reconnected'));
  mongoose.connection.on('disconnecting', () => console.log('Mongoose: disconnecting'));
  mongoose.connection.on('close', () => console.log('Mongoose: close'));

  // ...and create a new connection:
  mongoose.connect(MONGODB_URL).catch((error) => {
    console.error(error);
  });

  // "Models are always scoped to a single connection."
  // https://mongoosejs.com/docs/connections.html#multiple_connections
  // So we set them up here to avoid overwriting and getting errors in dev mode.
  for (const model of models) {
    console.log("Creating Mongoose model: %s", model.name);
    mongoose.connection.model(model.name, model.schema, model.collection);
  }

  return mongoose.connection;
}
