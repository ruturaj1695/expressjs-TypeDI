import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import paginate from "mongoose-paginate-v2";

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(paginate);
export default userSchema;
