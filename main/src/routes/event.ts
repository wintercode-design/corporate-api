import { Router } from "express";
import EventController from "../controllers/EventController";
import upload from "../utils/upload";

export default class EventRouter {
  routes: Router = Router();
  private eventController = new EventController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.eventController.getEvents);
    this.routes.get("/id/:id", this.eventController.getOneEvent);
    this.routes.get("/slug/:slug", this.eventController.getOneEventSlug);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.eventController.createEvent
    );
    this.routes.put("/:id", this.eventController.updateEvent);
    this.routes.delete("/:id", this.eventController.deleteEvent);
  }
}
