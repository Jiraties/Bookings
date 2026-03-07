import mongoose from "mongoose";

export interface userType extends Document {
  username: string;
  password: string;
  admin: boolean;
  name: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String },
  password: { type: String },
  admin: { type: Boolean },
});

export default mongoose.model<userType>("User", userSchema);
