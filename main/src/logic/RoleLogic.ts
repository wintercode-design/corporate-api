import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

export class RoleLogic {
  async createRole(data: Omit<Role, "id">): Promise<Role> {
    return prisma.role.create({ data });
  }

  async getRoleById(id: number): Promise<Role | null> {
    return prisma.role.findUnique({ where: { id } });
  }

  async getAllRoles(): Promise<Role[]> {
    return prisma.role.findMany();
  }

  async updateRole(
    id: number,
    data: Partial<Omit<Role, "id">>
  ): Promise<Role | null> {
    return prisma.role.update({ where: { id }, data });
  }

  async deleteRole(id: number): Promise<Role | null> {
    return prisma.role.delete({ where: { id } });
  }
}
