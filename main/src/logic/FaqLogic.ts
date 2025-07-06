import { PrismaClient, Faq } from "@prisma/client";
const prisma = new PrismaClient();

export class FaqLogic {
  async createFaq(data: Omit<Faq, "id">): Promise<Faq> {
    const { createdAt, ...faqData } = data;
    return prisma.faq.create({
      data: {
        ...faqData,
        createdAt: new Date(createdAt).toISOString(),
      },
    });
  }

  async getFaqById(id: number): Promise<Faq | null> {
    return prisma.faq.findUnique({ where: { id } });
  }

  async getAllFaqs(): Promise<Faq[]> {
    return prisma.faq.findMany();
  }

  async updateFaq(
    id: number,
    data: Partial<Omit<Faq, "id">>
  ): Promise<Faq | null> {
    return prisma.faq.update({ where: { id }, data });
  }

  async deleteFaq(id: number): Promise<Faq | null> {
    return prisma.faq.delete({ where: { id } });
  }
}
