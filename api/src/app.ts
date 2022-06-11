import fastify, { FastifyServerOptions } from "fastify";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";
import autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import underPressure from "under-pressure";
import config from "./config/config.js";
import db from "./plugins/db.js";
import swagger from "./plugins/swagger.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import authentication from "./plugins/authentication.js";

const server = (options: FastifyServerOptions = {}) => {
  const app = fastify(options);

  app.register(config);
  app.register(db);
  app.register(sensible);
  app.register(swagger);
  app.register(helmet, { global: true });
  app.register(cors);
  app.register(authentication);

  /*   app.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 100000000,
    maxRssBytes: 100000000,
    maxEventLoopUtilization: 0.98,
  });
 */
  app.register(autoload, {
    dir: join(dirname(fileURLToPath(import.meta.url)), "services"),
    forceESM: true,
    encapsulate: false,
  });

  app.register(autoload, {
    dir: join(dirname(fileURLToPath(import.meta.url)), "routes"),
    forceESM: true,
    options: {
      prefix: "/api",
    },
  });

  return app;
};

export default server;
