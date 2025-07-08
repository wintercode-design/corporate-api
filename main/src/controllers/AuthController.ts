import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import AuthLogic from "../logic/AuthLogic";

const authLogic = new AuthLogic();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  // roleId: Joi.number().required(),
});

const passwordResetSchema = Joi.object({
  email: Joi.string().email().required(),
  resetUrl: Joi.string().uri().required(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

export default class AuthController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "login" | "register" | "passwordReset" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "login":
        result = loginSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "register":
        result = registerSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "passwordReset":
        result = passwordResetSchema.validate(request.body);
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

  login = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "login")) return;
    try {
      const { email, password } = request.body;
      const result = await authLogic.loginUser(email, password);
      response.status(200).json(result);
    } catch (err) {
      throw new CustomError("Login failed", undefined, err as Error);
    }
  };

  register = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "register")) return;
    try {
      const userData = request.body;
      const newUser = await authLogic.registerUser(userData);
      response.status(201).json(newUser);
    } catch (err) {
      throw new CustomError("Registration failed", undefined, err as Error);
    }
  };

  getMe = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const userId = Number(request.params.id);
      const user = await authLogic.getMe(userId);
      response.status(200).json(user);
    } catch (err) {
      throw new CustomError("Failed to fetch user", undefined, err as Error);
    }
  };

  sendPasswordResetEmail = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "passwordReset")) return;
    try {
      const { email, resetUrl } = request.body;
      const result = await authLogic.sendPasswordResetEmail(email, resetUrl);
      response.status(200).json(result);
    } catch (err) {
      throw new CustomError(
        "Failed to send password reset email",
        undefined,
        err as Error
      );
    }
  };
}
