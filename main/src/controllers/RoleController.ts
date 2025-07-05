import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Role } from "@prisma/client";
import { RoleLogic } from "../logic/RoleLogic";

const roleLogic = new RoleLogic();

const createRoleSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const updateRoleSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class RoleController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createRoleSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateRoleSchema.validate(request.body);
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

  createRole = async (
    request: Request<object, object, Omit<Role, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newRole = await roleLogic.createRole(request.body);
      response.status(201).json(newRole);
    } catch (err) {
      throw new CustomError("Failed to create role", undefined, err as Error);
    }
  };

  updateRole = async (
    request: Request<{ id: string }, object, Partial<Omit<Role, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedRole = await roleLogic.updateRole(Number(id), request.body);
      response.status(200).json(updatedRole);
    } catch (err) {
      throw new CustomError("Failed to update role", undefined, err as Error);
    }
  };

  getRoles = async (request: Request, response: Response) => {
    try {
      const roles = await roleLogic.getAllRoles();
      response.status(200).json(roles);
    } catch (err) {
      throw new CustomError("Failed to fetch roles", undefined, err as Error);
    }
  };

  getOneRole = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const role = await roleLogic.getRoleById(id);
      response.status(200).json(role);
    } catch (err) {
      throw new CustomError("Failed to fetch role", undefined, err as Error);
    }
  };

  deleteRole = async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      await roleLogic.deleteRole(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete role", undefined, err as Error);
    }
  };
}

export default RoleController;
