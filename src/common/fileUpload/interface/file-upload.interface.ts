import { FileUploadType } from "@src/common/enum/file-upload.enum";

export interface IFileUploadConfig {
  fileUploadType: FileUploadType;
  maxSize: number;
  allowedType: RegExp;
  s3Bucket?: string;
}
