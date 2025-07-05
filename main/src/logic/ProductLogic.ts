import { PrismaClient, Product } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export default class ProductLogic {
  async createProduct(data: Omit<Product, "id">): Promise<Product> {
    return prisma.product.create({ data });
  }

  async getProductById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async updateProduct(
    id: number,
    data: Partial<Omit<Product, "id">>
  ): Promise<Product | null> {
    return prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");
    if (product.imageUrl) deleteImage(product.imageUrl);
    return prisma.product.delete({ where: { id } });
  }
}
