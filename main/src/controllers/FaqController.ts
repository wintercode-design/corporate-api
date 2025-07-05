import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Faq } from "@prisma/client";
import { FaqLogic } from "../logic/FaqLogic";

const faqLogic = new FaqLogic();

const createFaqSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().required(),
  order: Joi.number().required(),
  createdAt: Joi.date().optional(),
});

const updateFaqSchema = Joi.object({
  question: Joi.string().optional(),
  answer: Joi.string().optional(),
  category: Joi.string().optional(),
  status: Joi.string().optional(),
  order: Joi.number().optional(),
  createdAt: Joi.date().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class FaqController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createFaqSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateFaqSchema.validate(request.body);
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

  createFaq = async (
    request: Request<object, object, Omit<Faq, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newFaq = await faqLogic.createFaq(request.body);
      response.status(201).json(newFaq);
    } catch (err) {
      throw new CustomError("Failed to create faq", undefined, err as Error);
    }
  };

  updateFaq = async (
    request: Request<{ id: string }, object, Partial<Omit<Faq, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedFaq = await faqLogic.updateFaq(Number(id), request.body);
      response.status(200).json(updatedFaq);
    } catch (err) {
      throw new CustomError("Failed to update faq", undefined, err as Error);
    }
  };

  getFaqs = async (request: Request, response: Response) => {
    try {
      const faqs = await faqLogic.getAllFaqs();
      response.status(200).json(faqs);
    } catch (err) {
      throw new CustomError("Failed to fetch faqs", undefined, err as Error);
    }
  };

  getOneFaq = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const faq = await faqLogic.getFaqById(id);
      response.status(200).json(faq);
    } catch (err) {
      throw new CustomError("Failed to fetch faq", undefined, err as Error);
    }
  };

  deleteFaq = async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      await faqLogic.deleteFaq(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete faq", undefined, err as Error);
    }
  };
}

export default FaqController;
