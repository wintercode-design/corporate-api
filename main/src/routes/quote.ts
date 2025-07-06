import { Router } from "express";
import QuoteController from "../controllers/QuoteController";
import { requireRole } from "../middleware/rbac";

export default class QuoteRouter {
  routes: Router = Router();
  private quoteController = new QuoteController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get(
      "/",
      requireRole(["admin"]),
      this.quoteController.getQuotes
    );
    this.routes.get(
      "/:id",
      requireRole(["admin"]),
      this.quoteController.getQuote
    );
    this.routes.post("/", this.quoteController.createQuote);
    this.routes.put(
      "/:id",
      requireRole(["admin"]),
      this.quoteController.updateQuote
    );
    this.routes.delete(
      "/:id",
      requireRole(["admin"]),
      this.quoteController.deleteQuote
    );
  }
}
