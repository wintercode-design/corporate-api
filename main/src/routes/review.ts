import { Router } from "express";
import ReviewController from "../controllers/ReviewController";

export default class ReviewRouter {
  routes: Router = Router();
  private reviewController = new ReviewController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.reviewController.getReviews);
    this.routes.get("/:id", this.reviewController.getOneReview);
    this.routes.post("/", this.reviewController.createReview);
    this.routes.put("/:id", this.reviewController.updateReview);
    this.routes.delete("/:id", this.reviewController.deleteReview);
  }
}
