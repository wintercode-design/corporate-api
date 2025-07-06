import { PrismaClient, TeamMember } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
import slugify from "slugify";
const prisma = new PrismaClient();

export class TeamMemberLogic {
  async createTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
    return prisma.teamMember.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
    });
  }

  async getTeamMemberById(id: number): Promise<TeamMember | null> {
    return prisma.teamMember.findUnique({ where: { id } });
  }

  async getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    return prisma.teamMember.findFirst({ where: { slug } });
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return prisma.teamMember.findMany();
  }

  async updateTeamMember(
    id: number,
    data: Partial<Omit<TeamMember, "id">>
  ): Promise<TeamMember | null> {
    return prisma.teamMember.update({ where: { id }, data });
  }

  async deleteTeamMember(id: number): Promise<TeamMember | null> {
    const teamMember = await prisma.teamMember.findUnique({ where: { id } });
    if (!teamMember) throw new Error("Team member not found");
    if (teamMember.avatarUrl) deleteImage(teamMember.avatarUrl);
    if (teamMember.resumeUrl) deleteImage(teamMember.resumeUrl);
    return prisma.teamMember.delete({ where: { id } });
  }
}
