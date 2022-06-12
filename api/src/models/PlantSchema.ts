import mongoose from "mongoose";
import { IPlant } from "../types/Plant";
import LeafSchema from "./LeafSchema.js";

const PlantSchema = new mongoose.Schema<IPlant>(
  {
    name: { type: String, required: true },
    leaves: [LeafSchema],
  },
  { timestamps: true },
);

export default PlantSchema;
