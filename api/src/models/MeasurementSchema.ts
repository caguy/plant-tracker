import mongoose from "mongoose";

const MeasurementSchema = new mongoose.Schema<Measurement>({
  date: { type: Date, required: true, default: () => Date.now() },
  value: { type: Number, required: true },
});

export default MeasurementSchema;
