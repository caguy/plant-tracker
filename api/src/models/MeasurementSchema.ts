import mongoose from "mongoose";
import { IMeasurement } from "../types/Plant";

const MeasurementSchema = new mongoose.Schema<IMeasurement>({
  date: { type: Date, required: true, default: () => Date.now() },
  value: { type: Number, required: true },
});

export default MeasurementSchema;
