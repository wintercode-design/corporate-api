import { PrismaClient, Project, Status } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
import slugify from "slugify";
const prisma = new PrismaClient();

export class ProjectLogic {
  async createProject(data: Omit<Project, "id">): Promise<Project> {
    // Convert string status to enum if needed
    const projectData = {
      ...data,
      slug: slugify(data.title),
    };
    return prisma.project.create({ data: projectData });
  }

  async getProjectById(id: number): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } });
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    return prisma.project.findFirst({ where: { slug } });
  }

  async getAllProjects(): Promise<Project[]> {
    return prisma.project.findMany();
  }

  async updateProject(
    id: number,
    data: Partial<Omit<Project, "id">>
  ): Promise<Project | null> {
    // Convert string status to enum if needed
    const updateData = {
      ...data,
      ...(data.status && {
        status:
          typeof data.status === "string"
            ? (data.status as Status)
            : data.status,
      }),
    };
    return prisma.project.update({ where: { id }, data: updateData });
  }

  async deleteProject(id: number): Promise<Project | null> {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error("Project not found");
    if (project.imageUrl) deleteImage(project.imageUrl);
    return prisma.project.delete({ where: { id } });
  }
}
