import { Router } from "express";
import OfferController from "../controllers/OfferController";
import upload from "../utils/upload";

export default class OfferRouter {
  routes: Router = Router();
  private offerController = new OfferController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.offerController.getOffers);
    this.routes.get("/:id", this.offerController.getOneOffer);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.offerController.createOffer
    );
    this.routes.put("/:id", this.offerController.updateOffer);
    this.routes.delete("/:id", this.offerController.deleteOffer);
  }
}
