import mongoose from "mongoose";

export interface userType extends Document {
  email: string;
  password: string;
  admin: boolean;
  name: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String },
  password: { type: String },
  admin: { type: Boolean },
});

export default mongoose.model<userType>("User", userSchema);
