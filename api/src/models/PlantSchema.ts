import mongoose from "mongoose";
import LeafSchema from "./LeafSchema";

const PlantSchema = new mongoose.Schema<Plant>({
  name: { type: String, required: true },
  leaves: [LeafSchema],
});

export default PlantSchema;
