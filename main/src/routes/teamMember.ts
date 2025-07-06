import { Router } from "express";
import TeamMemberController from "../controllers/TeamMemberController";
import upload from "../utils/upload";

export default class TeamMemberRouter {
  routes: Router = Router();
  private teamMemberController = new TeamMemberController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.teamMemberController.getTeamMembers);
    this.routes.get("/id/:id", this.teamMemberController.getOneTeamMember);
    this.routes.get(
      "/slug/:slug",
      this.teamMemberController.getOneTeamMemberSlug
    );
    this.routes.post(
      "/",
      upload.single("avatarUrl"),
      this.teamMemberController.createTeamMember
    );
    this.routes.put("/:id", this.teamMemberController.updateTeamMember);
    this.routes.delete("/:id", this.teamMemberController.deleteTeamMember);
  }
}
