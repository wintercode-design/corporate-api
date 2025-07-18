import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Subscriber } from "@prisma/client";
import { SubscriberLogic } from "../logic/SubscriberLogic";
import Mailer from "../services/email";

const subscriberLogic = new SubscriberLogic();
const mailer = new Mailer();

const createSubscriberSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  subscribedAt: Joi.date().optional(),
  status: Joi.string().required(),
  source: Joi.string().required(),
});

const updateSubscriberSchema = Joi.object({
  email: Joi.string().optional(),
  name: Joi.string().optional(),
  subscribedAt: Joi.date().optional(),
  status: Joi.string().optional(),
  source: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class SubscriberController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createSubscriberSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateSubscriberSchema.validate(request.body);
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

  createSubscriber = async (
    request: Request<object, object, Omit<Subscriber, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newSubscriber = await subscriberLogic.createSubscriber(
        request.body
      );
      // Send newsletter welcome email
      await mailer.sendNewsletterWelcomeEmail({
        name: newSubscriber.name || null,
        email: newSubscriber.email,
      });
      response.status(201).json(newSubscriber);
    } catch (err) {
      throw new CustomError(
        "Failed to create subscriber",
        undefined,
        err as Error
      );
    }
  };

  updateSubscriber = async (
    request: Request<{ id: string }, object, Partial<Omit<Subscriber, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedSubscriber = await subscriberLogic.updateSubscriber(
        Number(id),
        request.body
      );
      response.status(200).json(updatedSubscriber);
    } catch (err) {
      throw new CustomError(
        "Failed to update subscriber",
        undefined,
        err as Error
      );
    }
  };

  getSubscribers = async (request: Request, response: Response) => {
    try {
      const subscribers = await subscriberLogic.getAllSubscribers();
      response.status(200).json(subscribers);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch subscribers",
        undefined,
        err as Error
      );
    }
  };

  getOneSubscriber = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const subscriber = await subscriberLogic.getSubscriberById(id);
      response.status(200).json(subscriber);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch subscriber",
        undefined,
        err as Error
      );
    }
  };

  deleteSubscriber = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await subscriberLogic.deleteSubscriber(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete subscriber",
        undefined,
        err as Error
      );
    }
  };
}

export default SubscriberController;
