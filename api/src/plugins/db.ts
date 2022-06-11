import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    db: mongoose.Mongoose;
  }
}

const db = async function (app: FastifyInstance) {
  try {
    app.log.info("Connecting to database...");

    const db = await mongoose.connect(app.config.dbConnect);

    app.decorate("db", db);

    app.addHook("onClose", () => {
      mongoose.disconnect();
      app.log.info("Database disconnected");
    });

    app.log.info("Database connected");
  } catch (err) {
    app.log.error("Failed to connect to database");
    throw err;
  }
};

export default fp(db);
