import { Router } from "express";
import BlogController from "../controllers/BlogController";
import upload from "../utils/upload";

export default class BlogRouter {
  routes: Router = Router();
  private blogController = new BlogController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.blogController.getBlogs);
    this.routes.get("/:id", this.blogController.getOneBlog);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.blogController.createBlog
    );
    this.routes.put("/:id", this.blogController.updateBlog);
    this.routes.delete("/:id", this.blogController.deleteBlog);
  }
}
