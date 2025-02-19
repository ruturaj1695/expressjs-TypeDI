import { DatabaseConstants } from "../common/constants/database.constants";
import {
  FilterQuery,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
} from "mongoose";
import { Inject, Service } from "typedi";
import { IUser } from "./interfaces/user.interface";

@Service()
export class UserService {
  private userModel: PaginateModel<IUser>;

  constructor(
    @Inject(DatabaseConstants.USER_DB_MONGOOSE_MODEL)
    userModel: PaginateModel<IUser>
  ) {
    this.userModel = userModel;
  }

  public async getAllUsers(
    filterQuery: FilterQuery<IUser>,
    page?: number,
    size?: number
  ): Promise<IUser[]> {
    try {
      const paginateOptions: PaginateOptions = {
        page: page || 1,
        limit: size || 1,
        sort: {
          createdAt: -1,
        },
        lean: true,
      };
      const users: PaginateResult<IUser> = await this.userModel.paginate(
        filterQuery,
        paginateOptions
      );
      return users.docs || [];
    } catch (error) {
      throw error;
    }
  }

  public async getUser(
    filterQuery: FilterQuery<IUser>
  ): Promise<IUser | null | undefined> {
    try {
      const user: IUser | null = await this.userModel.findOne(
        filterQuery,
        null,
        {
          lean: true,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async createUser(userData: IUser): Promise<IUser> {
    try {
      const { email } = userData;
      const user: IUser = await this.userModel.findOneAndUpdate(
        { email },
        userData,
        {
          upsert: true,
          new: true,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}
