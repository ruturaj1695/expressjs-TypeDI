import { Service } from "typedi";
import { UserService } from "./user.service";
import { Request, Response, NextFunction } from "express";
import { IUser } from "./interfaces/user.interface";
import { APIError } from "@src/utils/api.error";

@Service()
export class UsersController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, size } = req.query;
      const users: IUser[] = await this.userService.getAllUsers(
        {},
        +page,
        +size
      );
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.query;
      const user: IUser | null | undefined = await this.userService.getUser({
        email,
      });

      if (!user) {
        throw new APIError("User not found", 404);
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: IUser = req.body;
      const user: IUser = await this.userService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
