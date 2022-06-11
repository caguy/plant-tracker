import { FastifyInstance } from "fastify";
import { FastifyPluginAsync } from "fastify";
import S from "fluent-json-schema";
import { Token } from "../types/User";
import { addMeta } from "../utils/schemas.js";

const userSchemaBase = S.object()
  .prop("username", S.string().required())
  .prop("fullName", S.string().required())
  .prop("profile", S.enum(["ADMIN", "USER"]).required());

const userSchema = addMeta(userSchemaBase);

const UsersRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: "GET",
    url: "/users/me",
    preHandler: app.authorize(),
    schema: {
      tags: ["users"],
      response: {
        200: userSchema,
      },
    },
    handler: async function (req) {
      const user = this.user.getById((req.user as Token).id);
      this.assert(user, 403);
      return user;
    },
  });
};

export default UsersRoutes;
