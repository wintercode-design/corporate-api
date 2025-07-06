import { PrismaClient, Event } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
import slugify from "slugify";
const prisma = new PrismaClient();

export class EventLogic {
  async createEvent(data: Omit<Event, "id">): Promise<Event> {
    return prisma.event.create({
      data: {
        ...data,
        slug: slugify(data.name),
      },
    });
  }

  async getEventById(id: number): Promise<Event | null> {
    return prisma.event.findUnique({ where: { id } });
  }

  async getEventBySlug(slug: string): Promise<Event | null> {
    return prisma.event.findFirst({ where: { slug } });
  }

  async getAllEvents(): Promise<Event[]> {
    return prisma.event.findMany();
  }

  async updateEvent(
    id: number,
    data: Partial<Omit<Event, "id">>
  ): Promise<Event | null> {
    return prisma.event.update({ where: { id }, data });
  }

  async deleteEvent(id: number): Promise<Event | null> {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) throw new Error("Event not found");
    if (event.imageUrl) deleteImage(event.imageUrl);
    return prisma.event.delete({ where: { id } });
  }
}
