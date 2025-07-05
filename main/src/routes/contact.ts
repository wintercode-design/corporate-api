import { Router } from "express";
import ContactController from "../controllers/ContactController";

export default class ContactRouter {
  routes: Router = Router();
  private contactController = new ContactController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.contactController.getContacts);
    this.routes.get("/:id", this.contactController.getOneContact);
    this.routes.post("/", this.contactController.createContact);
    this.routes.put("/:id", this.contactController.updateContact);
    this.routes.delete("/:id", this.contactController.deleteContact);
  }
}
