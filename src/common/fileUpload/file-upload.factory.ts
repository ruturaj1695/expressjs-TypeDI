import { Service } from "typedi";
import { Request } from "express";
import { FileUploadType } from "../enum/file-upload.enum";
import { IFileUploadConfig } from "./interface/file-upload.interface";
import multer, { StorageEngine } from "multer";
import { APIError } from "../../utils/api.error";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

@Service()
export class FileUploadFactory {
  public getUploader(config: IFileUploadConfig) {
    let storage: StorageEngine;
    switch (config.fileUploadType) {
      case FileUploadType.LOCAL:
        storage = multer.diskStorage({
          destination: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, `./src/uploads`);
          },
          filename: (req: Request, file: Express.Multer.File, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
          },
        });
        break;
      case FileUploadType.MEMORY:
        storage = multer.memoryStorage();
        break;
      case FileUploadType.S3:
        if (!config.s3Bucket)
          throw new APIError("S3 bucket name is required for S3 uploads.", 400);
        const s3 = new S3Client({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
          region: process.env.AWS_REGION,
        });
        storage = multerS3({
          s3,
          bucket: config.s3Bucket,
          acl: "public-read",
          key: (req, file, cb) => {
            cb(null, `uploads/${Date.now()}-${file.originalname}`);
          },
        });
        break;
      default:
        throw new APIError("Invalid upload type.", 400);
    }
    return multer({
      storage,
      limits: { fileSize: config.maxSize || 2 * 1024 * 1024 }, // Default 2MB
      fileFilter: (req, file, cb) =>
        this.validateFile(file, config.allowedType, cb),
    });
  }

  private validateFile(
    file: Express.Multer.File,
    allowedTypes: RegExp,
    cb: Function,
  ) {
    console.log(file);
    if (!allowedTypes?.test(file.mimetype)) {
      return cb(
        new APIError("Invalid file type. Only images are allowed!", 400),
      );
    }
    cb(null, true);
  }
}
