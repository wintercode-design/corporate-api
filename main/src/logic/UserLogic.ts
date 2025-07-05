import { PrismaClient, User } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class UserLogic {
  async createUser(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async updateUser(
    id: number,
    data: Partial<Omit<User, "id">>
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    if (user.avatarUrl) deleteImage(user.avatarUrl);
    return prisma.user.delete({ where: { id } });
  }
}
