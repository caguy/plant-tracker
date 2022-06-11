import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fp from "fastify-plugin";
import { Profile } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import { Token } from "../types/User.js";

declare module "fastify" {
  interface FastifyInstance {
    authorize: (
      profile?: Profile[],
    ) => (req: FastifyRequest, reply: FastifyReply) => void;
  }
  interface FastifyRequest {
    user: Token | null;
  }
}

const Authentication: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.decorateRequest("user", null);
  app.decorate(
    "authorize",
    (authorizedProfiles?: Profile[]) =>
      async (req: FastifyRequest, reply: FastifyReply) => {
        const token = req.headers.authorization?.match(
          /Bearer ([\w-]+\.[\w-]+\.[\w-]+)/,
        )?.[1];
        app.assert(token, 401);

        try {
          const decoded = jwt.verify(token, app.config.jwtKey) as Token;

          if (
            !!authorizedProfiles &&
            !authorizedProfiles.includes(decoded.profile)
          ) {
            reply.forbidden();
          }

          req.user = decoded;
        } catch (err) {
          reply.unauthorized();
        }
        return;
      },
  );
};

export default fp(Authentication);
