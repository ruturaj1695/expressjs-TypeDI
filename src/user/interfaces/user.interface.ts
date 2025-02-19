import { Document } from "mongoose";
import { UserRoles } from "../../common/enum/roles.enum";

/**
 * Interface represents the User fields
 * @interface IUser
 */
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRoles[];
}
