import { Router } from "express";
import RoleController from "../controllers/RoleController";

export default class RoleRouter {
  routes: Router = Router();
  private roleController = new RoleController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.roleController.getRoles);
    this.routes.get("/:id", this.roleController.getOneRole);
    this.routes.post("/", this.roleController.createRole);
    this.routes.put("/:id", this.roleController.updateRole);
    this.routes.delete("/:id", this.roleController.deleteRole);
  }
}
