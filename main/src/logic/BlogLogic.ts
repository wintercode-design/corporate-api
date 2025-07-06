import { PrismaClient, Blog } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
import slugify from "slugify";
const prisma = new PrismaClient();

export class BlogLogic {
  async createBlog(data: Omit<Blog, "id">): Promise<Blog> {
    return prisma.blog.create({
      data: {
        ...data,
        slug: slugify(data.title),
      },
    });
  }

  async getBlogById(id: number): Promise<Blog | null> {
    return prisma.blog.findUnique({ where: { id } });
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return prisma.blog.findFirst({ where: { slug } });
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
