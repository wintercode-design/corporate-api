import { PrismaClient, Subscriber } from "@prisma/client";
const prisma = new PrismaClient();

export class SubscriberLogic {
  async createSubscriber(data: Omit<Subscriber, "id">): Promise<Subscriber> {
    // Check if subscriber already exists with the same email
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: data.email },
    });

    if (existingSubscriber) {
      return existingSubscriber;
    }

    // Create new subscriber if email doesn't exist
    return prisma.subscriber.create({ data });
  }

  async getSubscriberById(id: number): Promise<Subscriber | null> {
    return prisma.subscriber.findUnique({ where: { id } });
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return prisma.subscriber.findMany();
  }

  async updateSubscriber(
    id: number,
    data: Partial<Omit<Subscriber, "id">>
  ): Promise<Subscriber | null> {
    return prisma.subscriber.update({ where: { id }, data });
  }

  async deleteSubscriber(id: number): Promise<Subscriber | null> {
    return prisma.subscriber.delete({ where: { id } });
  }
}
