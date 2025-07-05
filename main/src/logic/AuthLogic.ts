// AuthLogic.ts
import { PrismaClient, User, Status } from "@prisma/client";
import bcrypt from "bcryptjs";
import Mailer from "../services/email";
import jwt from "jsonwebtoken";
import config from "../config/config";

const prisma = new PrismaClient();

export default class AuthLogic {
  private mailer = new Mailer();

  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid email or password");
    const token = jwt.sign({ userId: user.id }, config.JWT.SECRET, {
      expiresIn: "1d",
    });
    return { ...user, token };
  }

  async registerUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt"> & {
      password: string;
    }
  ) {
    const existing = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existing) throw new Error("Email already in use");
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        status: Status.ACTIVE,
      },
    });
    // Send welcome email
    await this.mailer.sendWelcomeEmail({
      name: user.name,
      email: user.email,
      appName: process.env.APP_NAME || "LOUMO",
      loginUrl: process.env.BASE_URL || "",
    });
    return user;
  }

  async getMe(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");
    return user;
  }

  async sendPasswordResetEmail(email: string, resetUrl: string) {
    const user = await this.getUserByEmail(email);
    await this.mailer.sendPasswordRestOtp({
      name: user.name,
      email: user.email,
      resetUrl,
    });
    return { message: "Password reset email sent" };
  }
}
