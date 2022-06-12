import { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import S from "fluent-json-schema";
import { paginateSchema } from "../utils/schemas.js";

const PlantsRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/plants",
    schema: {
      tags: ["plants"],
      response: {
        200: S.array().items(
          S.object()
            .prop("_id", S.string().required())
            .prop("name", S.string().required())
            .prop("leaves", S.array().default([])),
        ),
      },
    },
    handler: async function () {
      const plants = this.plant.getAll();
      return plants;
    },
  });

  app.route({
    method: "POST",
    url: "/plants",
    schema: {
      tags: ["plants"],
      body: S.object().prop("name", S.string().required()),
      response: {
        200: S.object()
          .prop("_id", S.string().required())
          .prop("name", S.string().required())
          .prop("leaves", S.array().default([])),
      },
    },
    handler: async function (req: FastifyRequest<{ Body: { name: string } }>) {
      const props = req.body;
      const plant = await this.plant.create(props);
      return plant;
    },
  });
};

export default PlantsRoutes;
