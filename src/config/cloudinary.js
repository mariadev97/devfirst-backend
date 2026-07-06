import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const esPDF = file.mimetype === "application/pdf";
    return {
      folder: "devfirst/cvs",
      resource_type: esPDF ? "raw" : "image",
      type: "upload",
      format: esPDF ? "pdf" : undefined,
    };
  },
});

export const uploadCV = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];
    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten PDF, PNG o JPG."), false);
    }
  },
});