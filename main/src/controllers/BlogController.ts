import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Blog } from "@prisma/client";
import { BlogLogic } from "../logic/BlogLogic";

const blogLogic = new BlogLogic();

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().required(),
  publishedDate: Joi.date().required(),
  tags: Joi.string().optional(),
  content: Joi.string().required(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  category: Joi.string().optional(),
  status: Joi.string().optional(),
  publishedDate: Joi.date().optional(),
  tags: Joi.string().optional(),
  content: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

const slugSchema = Joi.object({
  slug: Joi.string().required(),
});

class BlogController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId" | "slug"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createBlogSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateBlogSchema.validate(request.body);
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

  createBlog = async (
    request: Request<object, object, Omit<Blog, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newBlog = await blogLogic.createBlog(request.body);
      response.status(201).json(newBlog);
    } catch (err) {
      throw new CustomError("Failed to create blog", undefined, err as Error);
    }
  };

  updateBlog = async (
    request: Request<{ id: string }, object, Partial<Omit<Blog, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedBlog = await blogLogic.updateBlog(Number(id), request.body);
      response.status(200).json(updatedBlog);
    } catch (err) {
      throw new CustomError("Failed to update blog", undefined, err as Error);
    }
  };

  getBlogs = async (request: Request, response: Response) => {
    try {
      const blogs = await blogLogic.getAllBlogs();
      response.status(200).json(blogs);
    } catch (err) {
      throw new CustomError("Failed to fetch blogs", undefined, err as Error);
    }
  };

  getOneBlog = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const blog = await blogLogic.getBlogById(id);
      response.status(200).json(blog);
    } catch (err) {
      throw new CustomError("Failed to fetch blog", undefined, err as Error);
    }
  };

  getOneBlogSlug = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "slug")) return;
    try {
      const slug = request.params.slug;
      const blog = await blogLogic.getBlogBySlug(slug);
      response.status(200).json(blog);
    } catch (err) {
      throw new CustomError("Failed to fetch blog", undefined, err as Error);
    }
  };

  deleteBlog = async (request: Request<{ id: string }>, response: Response) => {
    const { id } = request.params;
    try {
      await blogLogic.deleteBlog(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError("Failed to delete blog", undefined, err as Error);
    }
  };
}

export default BlogController;
