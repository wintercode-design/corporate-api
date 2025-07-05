import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Contact } from "@prisma/client";
import { ContactLogic } from "../logic/ContactLogic";

const contactLogic = new ContactLogic();

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  status: Joi.string().required(),
  priority: Joi.string().required(),
  createdAt: Joi.date().optional(),
  replied: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  subject: Joi.string().optional(),
  message: Joi.string().optional(),
  status: Joi.string().optional(),
  priority: Joi.string().optional(),
  createdAt: Joi.date().optional(),
  replied: Joi.boolean().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class ContactController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createContactSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateContactSchema.validate(request.body);
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

  createContact = async (
    request: Request<object, object, Omit<Contact, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newContact = await contactLogic.createContact(request.body);
      response.status(201).json(newContact);
    } catch (err) {
      throw new CustomError(
        "Failed to create contact",
        undefined,
        err as Error
      );
    }
  };

  updateContact = async (
    request: Request<{ id: string }, object, Partial<Omit<Contact, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedContact = await contactLogic.updateContact(
        Number(id),
        request.body
      );
      response.status(200).json(updatedContact);
    } catch (err) {
      throw new CustomError(
        "Failed to update contact",
        undefined,
        err as Error
      );
    }
  };

  getContacts = async (request: Request, response: Response) => {
    try {
      const contacts = await contactLogic.getAllContacts();
      response.status(200).json(contacts);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch contacts",
        undefined,
        err as Error
      );
    }
  };

  getOneContact = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const contact = await contactLogic.getContactById(id);
      response.status(200).json(contact);
    } catch (err) {
      throw new CustomError("Failed to fetch contact", undefined, err as Error);
    }
  };

  deleteContact = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await contactLogic.deleteContact(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete contact",
        undefined,
        err as Error
      );
    }
  };
}

export default ContactController;
