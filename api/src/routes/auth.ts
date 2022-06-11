import { FastifyRequest } from "fastify";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import S from "fluent-json-schema";

const AuthRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/auth/login",
    schema: {
      tags: ["auth"],
      body: S.object()
        .prop("username", S.string().required())
        .prop("password", S.string().required()),
      response: {
        200: S.object()
          .prop("accessToken", S.string().required())
          .prop(
            "userInfos",
            S.object()
              .prop("username", S.string().required())
              .prop("fullName", S.string().required())
              .prop("profile", S.enum(["ADMIN", "USER"]).required())
              .prop("createdAt", S.string().required())
              .prop("updatedAt", S.string().required()),
          ),
      },
    },
    handler: async function (
      req: FastifyRequest<{ Body: { username: string; password: string } }>,
    ) {
      const { username, password } = req.body;
      const user = await this.user.getByUsername(username);
      this.assert(
        user && (await this.user.passwordMatch(user, password)),
        401,
        "Identifiants invalides",
      );
      return {
        accessToken: this.user.createAccessToken(user),
        userInfos: user,
      };
    },
  });
};

export default AuthRoutes;
