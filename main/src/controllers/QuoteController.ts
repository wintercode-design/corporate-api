import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { QuoteLogic } from "../logic/QuoteLogic";

const quoteLogic = new QuoteLogic();

const quoteSchema = Joi.object({
  companyName: Joi.string().optional().min(0),
  contactPerson: Joi.string().optional().min(0),
  phone: Joi.string().optional().min(0),
  email: Joi.string().optional().min(0),
  location: Joi.string().optional().min(0),
  hasWebsite: Joi.boolean().optional(),
  website: Joi.string().optional().min(0),
  businessDescription: Joi.string().optional().min(0),
  targetAudience: Joi.string().optional().min(0),
  products: Joi.string().optional().min(0),
  goals: Joi.string().optional().min(0),
  otherGoal: Joi.string().optional().min(0),
  priorities: Joi.string().optional().min(0),
  designLikes: Joi.string().optional().min(0),
  designDislikes: Joi.string().optional().min(0),
  colorPreferences: Joi.string().optional().min(0),
  referenceWebsites: Joi.string().optional().min(0),
  competitors: Joi.string().optional().min(0),
  budget: Joi.string().optional().min(0),
  timeline: Joi.string().optional().min(0),
  additional: Joi.string().optional().min(0),
});

const paramSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

class QuoteController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = quoteSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = quoteSchema.validate(request.body);
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

  createQuote = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newQuote = await quoteLogic.createQuote(request.body);
      response.status(201).json(newQuote);
    } catch (err) {
      throw new CustomError("Failed to create quote", undefined, err as Error);
    }
  };

  getQuote = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const quote = await quoteLogic.getQuoteById(id);
      response.status(200).json(quote);
    } catch (err) {
      throw new CustomError("Failed to fetch quote", undefined, err as Error);
    }
  };

  getQuotes = async (request: Request, response: Response) => {
    try {
      const quotes = await quoteLogic.getAllQuotes();
      response.status(200).json(quotes);
    } catch (err) {
      throw new CustomError("Failed to fetch quotes", undefined, err as Error);
    }
  };

  updateQuote = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    if (!this.validate(request, response, "update")) return;
    try {
      const id = Number(request.params.id);
      const updatedQuote = await quoteLogic.updateQuote(id, request.body);
      response.status(200).json(updatedQuote);
    } catch (err) {
      throw new CustomError("Failed to update quote", undefined, err as Error);
    }
  };

  deleteQuote = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      await quoteLogic.deleteQuote(id);
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete quote", undefined, err as Error);
    }
  };
}

export default QuoteController;
