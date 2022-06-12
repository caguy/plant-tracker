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
  findById: async (id: string) => {
    if (!mongoose.isValidObjectId(id)) return;
    return await model.findById(id);
  },
  update: async (
    id: string,
    data: Partial<
      IPlant & {
        _id: unknown;
        createdAt: unknown;
      }
    >,
  ) => {
    if (!mongoose.isValidObjectId(id)) return;
    delete data._id;
    return await model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: "query",
    });
  },
  delete: async (id: string) => {
    if (!mongoose.isValidObjectId(id)) return;
    return await model.findByIdAndDelete(id);
  },
});

const PlantPlugin: FastifyPluginAsync = async (app) => {
  const model = app.db.model<IPlant>("plant", PlantSchema);
  app.decorate("plant", PlantService(app, model));
};

export default PlantPlugin;
