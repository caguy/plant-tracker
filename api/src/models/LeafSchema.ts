import mongoose from "mongoose";
import MeasurementSchema from "./MeasurementSchema";

const LeafSchema = new mongoose.Schema<Leaf>({
  date: { type: Date, required: true, default: () => Date.now() },
  type: { type: String, enum: ["leaf", "flower"] },
  index: { type: Number, required: true },
  measurements: [MeasurementSchema],
});

export default LeafSchema;
