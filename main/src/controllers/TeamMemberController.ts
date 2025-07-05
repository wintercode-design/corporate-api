import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { TeamMember } from "@prisma/client";
import { TeamMemberLogic } from "../logic/TeamMemberLogic";

const teamMemberLogic = new TeamMemberLogic();

const createTeamMemberSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  avatarUrl: Joi.string().required(),
  status: Joi.string().required(),
  email: Joi.string().required(),
  linkedin: Joi.string().optional(),
  github: Joi.string().optional(),
  website: Joi.string().optional(),
  bio: Joi.string().optional(),
  resumeUrl: Joi.string().optional(),
  certifications: Joi.any().optional(),
  achievements: Joi.string().optional(),
  skills: Joi.string().optional(),
});

const updateTeamMemberSchema = Joi.object({
  name: Joi.string().optional(),
  role: Joi.string().optional(),
  avatarUrl: Joi.string().optional(),
  status: Joi.string().optional(),
  email: Joi.string().optional(),
  linkedin: Joi.string().optional(),
  github: Joi.string().optional(),
  website: Joi.string().optional(),
  bio: Joi.string().optional(),
  resumeUrl: Joi.string().optional(),
  certifications: Joi.any().optional(),
  achievements: Joi.string().optional(),
  skills: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

class TeamMemberController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createTeamMemberSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateTeamMemberSchema.validate(request.body);
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

  createTeamMember = async (
    request: Request<object, object, Omit<TeamMember, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newTeamMember = await teamMemberLogic.createTeamMember(
        request.body
      );
      response.status(201).json(newTeamMember);
    } catch (err) {
      throw new CustomError(
        "Failed to create team member",
        undefined,
        err as Error
      );
    }
  };

  updateTeamMember = async (
    request: Request<{ id: string }, object, Partial<Omit<TeamMember, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedTeamMember = await teamMemberLogic.updateTeamMember(
        Number(id),
        request.body
      );
      response.status(200).json(updatedTeamMember);
    } catch (err) {
      throw new CustomError(
        "Failed to update team member",
        undefined,
        err as Error
      );
    }
  };

  getTeamMembers = async (request: Request, response: Response) => {
    try {
      const teamMembers = await teamMemberLogic.getAllTeamMembers();
      response.status(200).json(teamMembers);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch team members",
        undefined,
        err as Error
      );
    }
  };

  getOneTeamMember = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const teamMember = await teamMemberLogic.getTeamMemberById(id);
      response.status(200).json(teamMember);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch team member",
        undefined,
        err as Error
      );
    }
  };

  deleteTeamMember = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await teamMemberLogic.deleteTeamMember(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete team member",
        undefined,
        err as Error
      );
    }
  };
}

export default TeamMemberController;
