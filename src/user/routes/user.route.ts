import { Router } from "express";
import { UsersController } from "../users.controller";
import { Service } from "typedi";
import { FileUploadFactory } from "../../common/fileUpload/file-upload.factory";
import { FileUploadType } from "../../common/enum/file-upload.enum";

@Service()
export class UserRoute {
  public router: Router;
  private usersController: UsersController;
  private fileUploadFactory: FileUploadFactory;

  constructor(
    usersController: UsersController,
    fileUploadFactory: FileUploadFactory,
  ) {
    this.usersController = usersController;
    this.fileUploadFactory = fileUploadFactory;
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
      this.fileUploadFactory
        .getUploader({
          allowedType: /jpeg|png|gif/,
          fileUploadType: FileUploadType.LOCAL,
          maxSize: 2 * 1024 * 1024,
        })
        .single("file"),
      this.usersController.createUser.bind(this.usersController),
    );
  }
}
