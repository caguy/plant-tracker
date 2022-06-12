import mongoose from "mongoose";
import { ILeaf } from "../types/Plant";
import MeasurementSchema from "./MeasurementSchema.js";

const LeafSchema = new mongoose.Schema<ILeaf>({
  date: { type: Date, required: true, default: () => Date.now() },
  type: { type: String, enum: ["leaf", "flower"] },
  index: { type: Number, required: true },
  measurements: [MeasurementSchema],
});

export default LeafSchema;
