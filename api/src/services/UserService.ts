import { FastifyInstance, FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import UserSchema from "../models/UserSchema.js";
import { IUser } from "../types/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

declare module "fastify" {
  interface FastifyInstance {
    user: ReturnType<typeof UserService>;
  }
}

const UserService = (app: FastifyInstance, model: mongoose.Model<IUser>) => ({
  create: async (user: IUser) => {
    const hashedPassword = await bcrypt.hash(
      user.password,
      app.config.bcryptSaltRounds,
    );
    return await model.create({
      username: user.username,
      password: hashedPassword,
      profile: user.profile,
      fullName: user.fullName,
    });
  },
  getByUsername: async (username: string) => {
    return await model.findOne({ username });
  },
  getById: async (id: string) => {
    return await model.findById(id);
  },
  passwordMatch: async (user: IUser & mongoose.Document, password: string) => {
    return await bcrypt.compare(password, user.password);
  },
  createAccessToken: (user: IUser & mongoose.Document) => {
    return jwt.sign(
      {
        id: user._id,
        profile: user.profile,
      },
      app.config.jwtKey,
      {
        expiresIn: app.config.jwtExpiresIn,
      },
    );
  },
});

const UserPlugin: FastifyPluginAsync = async (app) => {
  const model = app.db.model<IUser>("user", UserSchema);
  app.decorate("user", UserService(app, model));
};

export default UserPlugin;
