import mongoose from "mongoose";
import { IUser } from "../types/User";

export enum Profile {
  ADMIN = "ADMIN",
  USER = "USER",
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    profile: {
      type: String,
      enum: Profile,
      required: true,
    },
  },
  { timestamps: true },
);

export default UserSchema;
