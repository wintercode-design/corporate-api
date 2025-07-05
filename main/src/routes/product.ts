import { Router } from "express";
import ProductController from "../controllers/ProductController";
import upload from "../utils/upload";

export default class ProductRouter {
  routes: Router = Router();
  private productController = new ProductController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.productController.getProducts);
    this.routes.get("/:id", this.productController.getOneProduct);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.productController.createProduct
    );
    this.routes.put("/:id", this.productController.updateProduct);
    this.routes.delete("/:id", this.productController.deleteProduct);
  }
}
