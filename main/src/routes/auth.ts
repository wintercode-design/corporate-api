import { Router } from "express";
import AuthController from "../controllers/AuthController";

export default class AuthRouter {
  routes: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.post("/login", this.authController.login);
    this.routes.post("/register", this.authController.register);
    this.routes.get("/me/:id", this.authController.getMe);
    this.routes.post(
      "/password-reset",
      this.authController.sendPasswordResetEmail
    );
  }
}
