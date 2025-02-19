import { Router } from "express";
import { UsersController } from "../users.controller";
import { Service } from "typedi";

@Service()
export class UserRoute {
  public router: Router;
  private usersController: UsersController;

  constructor(usersController: UsersController) {
    this.usersController = usersController;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/users",
      this.usersController.getAllUsers.bind(this.usersController),
    );
    this.router.get(
      "/user",
      this.usersController.getUser.bind(this.usersController),
    );
    this.router.post(
      "/users",
      this.usersController.createUser.bind(this.usersController),
    );
  }
}
