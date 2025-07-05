import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Permission } from "@prisma/client";
import { PermissionLogic } from "../logic/PermissionLogic";

const permissionLogic = new PermissionLogic();

const createPermissionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const updatePermissionSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class PermissionController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createPermissionSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updatePermissionSchema.validate(request.body);
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

  createPermission = async (
    request: Request<object, object, Omit<Permission, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newPermission = await permissionLogic.createPermission(
        request.body
      );
      response.status(201).json(newPermission);
    } catch (err) {
      throw new CustomError(
        "Failed to create permission",
        undefined,
        err as Error
      );
    }
  };

  updatePermission = async (
    request: Request<{ id: string }, object, Partial<Omit<Permission, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedPermission = await permissionLogic.updatePermission(
        Number(id),
        request.body
      );
      response.status(200).json(updatedPermission);
    } catch (err) {
      throw new CustomError(
        "Failed to update permission",
        undefined,
        err as Error
      );
    }
  };

  getPermissions = async (request: Request, response: Response) => {
    try {
      const permissions = await permissionLogic.getAllPermissions();
      response.status(200).json(permissions);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch permissions",
        undefined,
        err as Error
      );
    }
  };

  getOnePermission = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const permission = await permissionLogic.getPermissionById(id);
      response.status(200).json(permission);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch permission",
        undefined,
        err as Error
      );
    }
  };

  deletePermission = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await permissionLogic.deletePermission(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete permission",
        undefined,
        err as Error
      );
    }
  };
}

export default PermissionController;
