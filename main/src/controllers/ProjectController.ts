import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Project } from "@prisma/client";
import { ProjectLogic } from "../logic/ProjectLogic";

const projectLogic = new ProjectLogic();

const createProjectSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string()
    .valid(
      "ACTIVE",
      "INACTIVE",
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
      "PENDING",
      "RESOLVED",
      "REJECTED",
      "IN_PROGRESS",
      "COMPLETED",
      "HALTED"
    )
    .required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  description: Joi.string().required(),
});

const updateProjectSchema = Joi.object({
  title: Joi.string().optional(),
  category: Joi.string().optional(),
  status: Joi.string()
    .valid(
      "ACTIVE",
      "INACTIVE",
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
      "PENDING",
      "RESOLVED",
      "REJECTED",
      "IN_PROGRESS",
      "COMPLETED",
      "HALTED"
    )
    .optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  description: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

const slugSchema = Joi.object({
  slug: Joi.string().required(),
});

class ProjectController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId" | "slug"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createProjectSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateProjectSchema.validate(request.body);
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

  createProject = async (
    request: Request<object, object, Omit<Project, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newProject = await projectLogic.createProject(request.body);
      response.status(201).json(newProject);
    } catch (err) {
      throw new CustomError(
        "Failed to create project",
        undefined,
        err as Error
      );
    }
  };

  updateProject = async (
    request: Request<{ id: string }, object, Partial<Omit<Project, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedProject = await projectLogic.updateProject(
        Number(id),
        request.body
      );
      response.status(200).json(updatedProject);
    } catch (err) {
      throw new CustomError(
        "Failed to update project",
        undefined,
        err as Error
      );
    }
  };

  getProjects = async (request: Request, response: Response) => {
    try {
      const projects = await projectLogic.getAllProjects();
      response.status(200).json(projects);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch projects",
        undefined,
        err as Error
      );
    }
  };

  getOneProject = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const project = await projectLogic.getProjectById(id);
      response.status(200).json(project);
    } catch (err) {
      throw new CustomError("Failed to fetch project", undefined, err as Error);
    }
  };

  getOneProjectSlug = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "slug")) return;
    try {
      const slug = request.params.slug;
      const project = await projectLogic.getProjectBySlug(slug);
      response.status(200).json(project);
    } catch (err) {
      throw new CustomError("Failed to fetch project", undefined, err as Error);
    }
  };

  deleteProject = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await projectLogic.deleteProject(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete project",
        undefined,
        err as Error
      );
    }
  };
}

export default ProjectController;
