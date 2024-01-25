import express from "express";
import  {getAllBlogs,uploadBlog ,getBlogById, deleteBlog, updateBlog} from "./controllers/index.js";

import path from "path";
import multer from "multer";
const router = express.Router();
const welcome = async (req, res, next) => {
  res.send("Hey! Good to see you...");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, 'public/images')
  },
  filename: (req, file, cb) =>{
      cb(null, file.fieldname + "_" + Date.now()+path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage
});
router.route("/").get(welcome);
router.route("/get").get(getAllBlogs);
router.post("/upload",upload.single('file'),uploadBlog);
router.get("/get/:id",getBlogById);
router.delete("/delete/:id", deleteBlog);
router.patch("/update/:id",upload.single('file'),updateBlog);
export default router;
