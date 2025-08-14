import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), 
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
      return cb(new Error(".exe file not allowed"), false);
    }
    cb(null, true);
  }
});

export default upload;