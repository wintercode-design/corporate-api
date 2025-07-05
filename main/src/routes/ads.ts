import { Router } from "express";
import AdsController from "../controllers/AdsController";
import upload from "../utils/upload";

export default class AdsRouter {
  routes: Router = Router();
  private adsController = new AdsController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    this.routes.get("/", this.adsController.getAds);
    this.routes.get("/:id", this.adsController.getOneAds);
    this.routes.post(
      "/",
      upload.single("imageUrl"),
      this.adsController.createAds
    );
    this.routes.put("/:id", this.adsController.updateAds);
    this.routes.delete("/:id", this.adsController.deleteAds);
  }
}
