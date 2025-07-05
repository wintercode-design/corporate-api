import { PrismaClient, Permission } from "@prisma/client";
const prisma = new PrismaClient();

export class PermissionLogic {
  async createPermission(data: Omit<Permission, "id">): Promise<Permission> {
    return prisma.permission.create({ data });
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    return prisma.permission.findUnique({ where: { id } });
  }

  async getAllPermissions(): Promise<Permission[]> {
    return prisma.permission.findMany();
  }

  async updatePermission(
    id: number,
    data: Partial<Omit<Permission, "id">>
  ): Promise<Permission | null> {
    return prisma.permission.update({ where: { id }, data });
  }

  async deletePermission(id: number): Promise<Permission | null> {
    return prisma.permission.delete({ where: { id } });
  }
}
