import { Router } from "express";
import SubscriberController from "../controllers/SubscriberController";

export default class SubscriberRouter {
  routes: Router = Router();
  private subscriberController = new SubscriberController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.subscriberController.getSubscribers);
    this.routes.get("/:id", this.subscriberController.getOneSubscriber);
    this.routes.post("/", this.subscriberController.createSubscriber);
    this.routes.put("/:id", this.subscriberController.updateSubscriber);
    this.routes.delete("/:id", this.subscriberController.deleteSubscriber);
  }
}
