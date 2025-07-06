import { Router } from "express";
import ProjectController from "../controllers/ProjectController";
import upload from "../utils/upload";

export default class ProjectRouter {
  routes: Router = Router();
  private projectController = new ProjectController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.projectController.getProjects);
    this.routes.get("/id/:id", this.projectController.getOneProject);
    this.routes.get("/slug/:slug", this.projectController.getOneProjectSlug);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.projectController.createProject
    );
    this.routes.put("/:id", this.projectController.updateProject);
    this.routes.delete("/:id", this.projectController.deleteProject);
  }
}
