import { PrismaClient, Project } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class ProjectLogic {
  async createProject(data: Omit<Project, "id">): Promise<Project> {
    return prisma.project.create({ data });
  }

  async getProjectById(id: number): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } });
  }

  async getAllProjects(): Promise<Project[]> {
    return prisma.project.findMany();
  }

  async updateProject(
    id: number,
    data: Partial<Omit<Project, "id">>
  ): Promise<Project | null> {
    return prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: number): Promise<Project | null> {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error("Project not found");
    if (project.imageUrl) deleteImage(project.imageUrl);
    return prisma.project.delete({ where: { id } });
  }
}
