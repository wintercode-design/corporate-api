import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Review } from "@prisma/client";
import { ReviewLogic } from "../logic/ReviewLogic";

const reviewLogic = new ReviewLogic();

const createReviewSchema = Joi.object({
  clientName: Joi.string().required(),
  clientTitle: Joi.string().required(),
  clientCompany: Joi.string().required(),
  rating: Joi.number().required(),
  review: Joi.string().required(),
  projectType: Joi.string().required(),
  status: Joi.string().required(),
  featured: Joi.boolean().required(),
  clientImage: Joi.string().required(),
  createdAt: Joi.date().optional(),
});

const updateReviewSchema = Joi.object({
  clientName: Joi.string().optional(),
  clientTitle: Joi.string().optional(),
  clientCompany: Joi.string().optional(),
  rating: Joi.number().optional(),
  review: Joi.string().optional(),
  projectType: Joi.string().optional(),
  status: Joi.string().optional(),
  featured: Joi.boolean().optional(),
  clientImage: Joi.string().optional(),
  createdAt: Joi.date().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class ReviewController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createReviewSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateReviewSchema.validate(request.body);
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

  createReview = async (
    request: Request<object, object, Omit<Review, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newReview = await reviewLogic.createReview(request.body);
      response.status(201).json(newReview);
    } catch (err) {
      throw new CustomError("Failed to create review", undefined, err as Error);
    }
  };

  updateReview = async (
    request: Request<{ id: string }, object, Partial<Omit<Review, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedReview = await reviewLogic.updateReview(
        Number(id),
        request.body
      );
      response.status(200).json(updatedReview);
    } catch (err) {
      throw new CustomError("Failed to update review", undefined, err as Error);
    }
  };

  getReviews = async (request: Request, response: Response) => {
    try {
      const reviews = await reviewLogic.getAllReviews();
      response.status(200).json(reviews);
    } catch (err) {
      throw new CustomError("Failed to fetch reviews", undefined, err as Error);
    }
  };

  getOneReview = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const review = await reviewLogic.getReviewById(id);
      response.status(200).json(review);
    } catch (err) {
      throw new CustomError("Failed to fetch review", undefined, err as Error);
    }
  };

  deleteReview = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await reviewLogic.deleteReview(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete review", undefined, err as Error);
    }
  };
}

export default ReviewController;
