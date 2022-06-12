import { FastifyInstance, FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import PlantSchema from "../models/PlantSchema.js";
import { IPlant } from "../types/Plant";

declare module "fastify" {
  interface FastifyInstance {
    plant: ReturnType<typeof PlantService>;
  }
}

const PlantService = (app: FastifyInstance, model: mongoose.Model<IPlant>) => ({
  getAll: async () => {
    return await model.find({});
  },
  create: async (plant: { name: string }) => {
    return await model.create(plant);
  },
});

const PlantPlugin: FastifyPluginAsync = async (app) => {
  const model = app.db.model<IPlant>("plant", PlantSchema);
  app.decorate("plant", PlantService(app, model));
};

export default PlantPlugin;
