import { PrismaClient, Blog } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class BlogLogic {
  async createBlog(data: Omit<Blog, "id">): Promise<Blog> {
    return prisma.blog.create({ data });
  }

  async getBlogById(id: number): Promise<Blog | null> {
    return prisma.blog.findUnique({ where: { id } });
  }

  async getAllBlogs(): Promise<Blog[]> {
    return prisma.blog.findMany();
  }

  async updateBlog(
    id: number,
    data: Partial<Omit<Blog, "id">>
  ): Promise<Blog | null> {
    return prisma.blog.update({ where: { id }, data });
  }

  async deleteBlog(id: number): Promise<Blog | null> {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) throw new Error("Blog not found");
    if (blog.imageUrl) deleteImage(blog.imageUrl);
    return prisma.blog.delete({ where: { id } });
  }
}
