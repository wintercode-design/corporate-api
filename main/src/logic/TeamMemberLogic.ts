import { PrismaClient, TeamMember } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class TeamMemberLogic {
  async createTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
    return prisma.teamMember.create({ data });
  }

  async getTeamMemberById(id: number): Promise<TeamMember | null> {
    return prisma.teamMember.findUnique({ where: { id } });
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
