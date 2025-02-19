import mongoose, { Connection } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import userSchema from "../model/user.db.model";
import Container from "typedi";
import { DatabaseConstants } from "../../common/constants/database.constants";

export async function userDatabaseInjection() {
  mongoose.set("debug", true);
  const databaseURL: string = `mongodb://127.0.0.1:27017/expressjs-DI`;
  const userDBConnection: Connection = await mongoose
    .createConnection(databaseURL, {
      maxPoolSize: 10,
    })
    .asPromise();
  const UserDBModel = userDBConnection.model<IUser>("User", userSchema);
  Container.set(DatabaseConstants.USER_DB_MONGOOSE_MODEL, UserDBModel);
}
