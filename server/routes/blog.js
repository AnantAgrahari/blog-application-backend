import express from "express";
import AuthController from "../controller/authController.js";
import blogController from "../controller/blogController.js";
import CategoryController from "../controller/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`public/upload/`);
    },
   filename:function(req,file,cb){
    cb(null,`${Date.now()}-${file.originalname}`);
   },
});
const upload=multer({storage:storage});  
const router=express.Router();

router.post("/user/register",AuthController.userRegistration);
router.post("/user/login",AuthController.userLogin);

//protected routes
router.get("/get/allblogs",checkIsUserAuthenticated,blogController.getAllBlogs);
router.post("/add/blog",upload.single("thumbnail"),checkIsUserAuthenticated,blogController.addNewBlogs);
router.get("/get/blog/:id",checkIsUserAuthenticated,blogController.getSingleBlog);
router.get("/get/categories",checkIsUserAuthenticated,CategoryController.getAllCategories);
router.post("/add/category",checkIsUserAuthenticated,CategoryController.addNewCategory);
  export default router; 
  //"644946532774291123d1118a"