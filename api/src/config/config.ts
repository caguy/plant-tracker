import { FastifyPluginAsync } from "fastify";
import "dotenv/config";
import env from "@fastify/env";
import S from "fluent-json-schema";
import fp from "fastify-plugin";
import appSettings from "./appSettings.js";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      port: number;
      environment: "development" | "production" | "test";
      dbConnect: string;
      version: string;
      jwtKey: string;
      jwtExpiresIn: number | string;
      bcryptSaltRounds: number;
    };
  }
}

const config: FastifyPluginAsync = async (app) => {
  app.register(env, {
    confKey: "config",
    data: appSettings,
    schema: S.object()
      .prop("port", S.number().default(9000))
      .prop("environment", S.enum(["development", "production", "test"]))
      .default("development")
      .prop("dbConnect", S.string().required())
      .prop("version", S.string().required())
      .prop("jwtKey", S.string().required())
      .prop("jwtExpiresIn", S.anyOf([S.string(), S.number()]).required())
      .prop("bcryptSaltRounds", S.number().required())
  });
};

export default fp(config);
