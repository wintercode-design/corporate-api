import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { User } from "@prisma/client";
import { UserLogic } from "../logic/UserLogic";

const userLogic = new UserLogic();

const createUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string().optional(),
  roleId: Joi.number().required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  name: Joi.string().optional(),
  status: Joi.string().optional(),
  roleId: Joi.number().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class UserController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createUserSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateUserSchema.validate(request.body);
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

  createUser = async (
    request: Request<object, object, Omit<User, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newUser = await userLogic.createUser(request.body);
      response.status(201).json(newUser);
    } catch (err) {
      throw new CustomError("Failed to create user", undefined, err as Error);
    }
  };

  updateUser = async (
    request: Request<{ id: string }, object, Partial<Omit<User, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedUser = await userLogic.updateUser(Number(id), request.body);
      response.status(200).json(updatedUser);
    } catch (err) {
      throw new CustomError("Failed to update user", undefined, err as Error);
    }
  };

  getUsers = async (request: Request, response: Response) => {
    try {
      const users = await userLogic.getAllUsers();
      response.status(200).json(users);
    } catch (err) {
      throw new CustomError("Failed to fetch users", undefined, err as Error);
    }
  };

  getOneUser = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const user = await userLogic.getUserById(id);
      response.status(200).json(user);
    } catch (err) {
      throw new CustomError("Failed to fetch user", undefined, err as Error);
    }
  };

  deleteUser = async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      await userLogic.deleteUser(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete user", undefined, err as Error);
    }
  };
}

export default UserController;
