import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Event } from "@prisma/client";
import { EventLogic } from "../logic/EventLogic";

const eventLogic = new EventLogic();

const createEventSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

const updateEventSchema = Joi.object({
  name: Joi.string().optional(),
  date: Joi.date().optional(),
  time: Joi.string().optional(),
  category: Joi.string().optional(),
  location: Joi.string().optional(),
  description: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

const slugSchema = Joi.object({
  slug: Joi.string().required(),
});

class EventController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId" | "slug"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createEventSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateEventSchema.validate(request.body);
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
      case "slug":
        result = slugSchema.validate(request.params);
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

  createEvent = async (
    request: Request<object, object, Omit<Event, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newEvent = await eventLogic.createEvent(request.body);
      response.status(201).json(newEvent);
    } catch (err) {
      throw new CustomError("Failed to create event", undefined, err as Error);
    }
  };

  updateEvent = async (
    request: Request<{ id: string }, object, Partial<Omit<Event, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedEvent = await eventLogic.updateEvent(
        Number(id),
        request.body
      );
      response.status(200).json(updatedEvent);
    } catch (err) {
      throw new CustomError("Failed to update event", undefined, err as Error);
    }
  };

  getEvents = async (request: Request, response: Response) => {
    try {
      const events = await eventLogic.getAllEvents();
      response.status(200).json(events);
    } catch (err) {
      throw new CustomError("Failed to fetch events", undefined, err as Error);
    }
  };

  getOneEvent = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const event = await eventLogic.getEventById(id);
      response.status(200).json(event);
    } catch (err) {
      throw new CustomError("Failed to fetch event", undefined, err as Error);
    }
  };

  getOneEventSlug = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "slug")) return;
    try {
      const slug = request.params.slug;
      const event = await eventLogic.getEventBySlug(slug);
      response.status(200).json(event);
    } catch (err) {
      throw new CustomError("Failed to fetch event", undefined, err as Error);
    }
  };

  deleteEvent = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await eventLogic.deleteEvent(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete event", undefined, err as Error);
    }
  };
}

export default EventController;
