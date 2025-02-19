import mongoose, { Connection } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import userSchema from "../model/user.db.model";
import Container from "typedi";
import { DatabaseConstants } from "../../common/constants/database.constants";

export async function userDatabaseInjection() {
  mongoose.set("debug", true);
  const databaseURL: string = `${process.env.DB_URL}/${process.env.DB_NAME}`;
  const userDBConnection: Connection = await mongoose
    .createConnection(databaseURL, {
      maxPoolSize: 10,
    })
    .asPromise();
  const UserDBModel = userDBConnection.model<IUser>("User", userSchema);
  Container.set(DatabaseConstants.USER_DB_MONGOOSE_MODEL, UserDBModel);
}
