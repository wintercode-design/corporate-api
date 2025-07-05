import { Router } from "express";
import UserController from "../controllers/UserController";
import upload from "../utils/upload";

export default class UserRouter {
  routes: Router = Router();
  private userController = new UserController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.userController.getUsers);
    this.routes.get("/:id", this.userController.getOneUser);
    this.routes.post(
      "/",
      upload.single("avatarUrl"),
      this.userController.createUser
    );
    this.routes.put("/:id", this.userController.updateUser);
    this.routes.delete("/:id", this.userController.deleteUser);
  }
}
