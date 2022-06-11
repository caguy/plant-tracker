import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import swagger from "@fastify/swagger";

const Swagger: FastifyPluginAsync = async (app) => {
  app.register(swagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Documentation de l'API",
        description: "Description de l'API",
        version: app.config.version,
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: app.config.environment === "development",
    staticCSP: true,
  });

  app.addHook("onReady", () => app.swagger());
};

export default fp(Swagger);
