import { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import S from "fluent-json-schema";

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
            .prop("leaves", S.array().default([]))
            .prop("createdAt", S.string())
            .prop("updatedAt", S.string()),
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
          .prop("leaves", S.array().default([]))
          .prop("createdAt", S.string())
          .prop("updatedAt", S.string()),
      },
    },
    handler: async function (req: FastifyRequest<{ Body: { name: string } }>) {
      const props = req.body;
      const plant = await this.plant.create(props);
      return plant;
    },
  });

  app.route({
    method: "GET",
    url: "/plants/:id",
    schema: {
      tags: ["plants"],
      params: S.object().prop("id", S.string().required()),
      response: {
        200: S.object()
          .prop("_id", S.string().required())
          .prop("name", S.string().required())
          .prop("leaves", S.array().default([]))
          .prop("createdAt", S.string())
          .prop("updatedAt", S.string()),
      },
    },
    handler: async function (req: FastifyRequest<{ Params: { id: string } }>) {
      const id = req.params.id;
      const plant = await this.plant.findById(id);
      this.assert(plant, 404);
      return plant;
    },
  });

  app.route({
    method: "PATCH",
    url: "/plants/:id",
    schema: {
      tags: ["plants"],
      params: S.object().prop("id", S.string().required()),
      body: S.object().prop("name", S.string().required()),
      response: {
        200: S.object()
          .prop("_id", S.string().required())
          .prop("name", S.string().required())
          .prop("leaves", S.array().default([]))
          .prop("createdAt", S.string())
          .prop("updatedAt", S.string()),
      },
    },
    handler: async function (
      req: FastifyRequest<{ Params: { id: string }; Body: { name?: string } }>,
    ) {
      const id = req.params.id;
      const props = req.body;
      const plant = await this.plant.update(id, props);
      this.assert(plant, 404);
      return plant;
    },
  });

  app.route({
    method: "DELETE",
    url: "/plants/:id",
    schema: {
      tags: ["plants"],
      params: S.object().prop("id", S.string().required()),
    },
    handler: async function (req: FastifyRequest<{ Params: { id: string } }>) {
      const { id } = req.params;
      const deletedItem = await this.plant.delete(id);
      this.assert(deletedItem, 404);
      return {};
    },
  });
};

export default PlantsRoutes;
