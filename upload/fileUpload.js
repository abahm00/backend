import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

export const fileUpload = (folder) => {
  const uploadPath = `upload/${folder}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, uuid() + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("invalid"), false);
    }
  }

  return multer({ storage, fileFilter });
};

export const uploadSingleFile = (folderName, fileName) =>
  fileUpload(folderName).single(fileName);

export const uploadMultibleFiles = (folderName, single, multiple) =>
  fileUpload(folderName).fields([
    { name: single, maxCount: 1 },
    { name: multiple, maxCount: 5 },
  ]);
