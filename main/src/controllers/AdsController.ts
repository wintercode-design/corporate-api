import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Ads } from "@prisma/client";
import { AdsLogic } from "../logic/AdsLogic";

const adsLogic = new AdsLogic();

const createAdsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  linkUrl: Joi.string().required(),
  position: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  priority: Joi.number().required(),
  createdAt: Joi.date().optional(),
  clicks: Joi.number().optional(),
  impressions: Joi.number().optional(),
});

const updateAdsSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
  linkUrl: Joi.string().optional(),
  position: Joi.string().optional(),
  type: Joi.string().optional(),
  status: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  priority: Joi.number().optional(),
  createdAt: Joi.date().optional(),
  clicks: Joi.number().optional(),
  impressions: Joi.number().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class AdsController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createAdsSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateAdsSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "paramId":
        result = paramSchema.validate(request.params);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      default:
        break;
    }
    if (result !== null && result.error) {
      return false;
    }
    return true;
  };

  getAds = async (request: Request, response: Response) => {
    try {
      const ads = await adsLogic.getAllAds();
      response.status(200).json(ads);
    } catch (err) {
      throw new CustomError("Failed to fetch ads", undefined, err as Error);
    }
  };

  getOneAds = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const ads = await adsLogic.getAdsById(id);
      response.status(200).json(ads);
    } catch (err) {
      throw new CustomError("Failed to fetch ads", undefined, err as Error);
    }
  };

  createAds = async (
    request: Request<object, object, Omit<Ads, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newAds = await adsLogic.createAds(request.body);
      response.status(201).json(newAds);
    } catch (err) {
      throw new CustomError("Failed to create ads", undefined, err as Error);
    }
  };

  updateAds = async (
    request: Request<{ id: string }, object, Partial<Omit<Ads, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedAds = await adsLogic.updateAds(Number(id), request.body);
      response.status(200).json(updatedAds);
    } catch (err) {
      throw new CustomError("Failed to update ads", undefined, err as Error);
    }
  };

  deleteAds = async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      await adsLogic.deleteAds(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete ads", undefined, err as Error);
    }
  };
}

export default AdsController;
