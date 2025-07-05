import { Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../middleware/errorHandler";
import { Product } from "@prisma/client";
import ProductLogic from "../logic/ProductLogic";

const productLogic = new ProductLogic();

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  status: Joi.string().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  stock: Joi.number().optional(),
  category: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
  status: Joi.string().optional(),
});

const paramSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required(),
});

export default class ProductController {
  validate = (
    request: Request<{ id?: string }>,
    response: Response,
    schema: "create" | "update" | "paramId"
  ) => {
    let result: Joi.ValidationResult | null = null;
    switch (schema) {
      case "create":
        result = createProductSchema.validate(request.body);
        if (result.error) {
          response.status(400).json({ error: result.error.details[0].message });
        }
        break;
      case "update":
        result = updateProductSchema.validate(request.body);
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

  createProduct = async (
    request: Request<object, object, Omit<Product, "id">>,
    response: Response
  ) => {
    if (!this.validate(request, response, "create")) return;
    try {
      const newProduct = await productLogic.createProduct(request.body);
      response.status(201).json(newProduct);
    } catch (err) {
      throw new CustomError(
        "Failed to create product",
        undefined,
        err as Error
      );
    }
  };

  updateProduct = async (
    request: Request<{ id: string }, object, Partial<Omit<Product, "id">>>,
    response: Response
  ) => {
    const { id } = request.params;
    if (!this.validate(request, response, "update")) return;
    try {
      const updatedProduct = await productLogic.updateProduct(
        Number(id),
        request.body
      );
      response.status(200).json(updatedProduct);
    } catch (err) {
      throw new CustomError(
        "Failed to update product",
        undefined,
        err as Error
      );
    }
  };

  getProducts = async (request: Request, response: Response) => {
    try {
      const products = await productLogic.getAllProducts();
      response.status(200).json(products);
    } catch (err) {
      throw new CustomError(
        "Failed to fetch products",
        undefined,
        err as Error
      );
    }
  };

  getOneProduct = async (request: Request, response: Response) => {
    if (!this.validate(request, response, "paramId")) return;
    try {
      const id = Number(request.params.id);
      const product = await productLogic.getProductById(id);
      response.status(200).json(product);
    } catch (err) {
      throw new CustomError("Failed to fetch product", undefined, err as Error);
    }
  };

  deleteProduct = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const { id } = request.params;
    try {
      await productLogic.deleteProduct(Number(id));
      response.status(204).send();
    } catch (err) {
      throw new CustomError(
        "Failed to delete product",
        undefined,
        err as Error
      );
    }
  };
}
