import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Offer } from "@prisma/client";
import { OfferLogic } from "../logic/OfferLogic";

const offerLogic = new OfferLogic();

const createOfferSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  originalPrice: Joi.number().required(),
  discountedPrice: Joi.number().required(),
  discountPercentage: Joi.number().required(),
  validUntil: Joi.date().required(),
  status: Joi.string().required(),
  category: Joi.string().required(),
  createdAt: Joi.date().optional(),
});

const updateOfferSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  originalPrice: Joi.number().optional(),
  discountedPrice: Joi.number().optional(),
  discountPercentage: Joi.number().optional(),
  validUntil: Joi.date().optional(),
  status: Joi.string().optional(),
  category: Joi.string().optional(),
  createdAt: Joi.date().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class OfferController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createOfferSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateOfferSchema.validate(request.body);
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

  createOffer = async (
    request: Request<object, object, Omit<Offer, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newOffer = await offerLogic.createOffer(request.body);
      response.status(201).json(newOffer);
    } catch (err) {
      throw new CustomError("Failed to create offer", undefined, err as Error);
    }
  };

  updateOffer = async (
    request: Request<{ id: string }, object, Partial<Omit<Offer, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedOffer = await offerLogic.updateOffer(
        Number(id),
        request.body
      );
      response.status(200).json(updatedOffer);
    } catch (err) {
      throw new CustomError("Failed to update offer", undefined, err as Error);
    }
  };

  getOffers = async (request: Request, response: Response) => {
    try {
      const offers = await offerLogic.getAllOffers();
      response.status(200).json(offers);
    } catch (err) {
      throw new CustomError("Failed to fetch offers", undefined, err as Error);
    }
  };

  getOneOffer = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const offer = await offerLogic.getOfferById(id);
      response.status(200).json(offer);
    } catch (err) {
      throw new CustomError("Failed to fetch offer", undefined, err as Error);
    }
  };

  deleteOffer = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await offerLogic.deleteOffer(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete offer", undefined, err as Error);
    }
  };
}

export default OfferController;
