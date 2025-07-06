import { PrismaClient, Quote } from "@prisma/client";
const prisma = new PrismaClient();

export class QuoteLogic {
  async createQuote(
    data: Omit<Quote, "id" | "createdAt" | "updatedAt">
  ): Promise<Quote> {
    return prisma.quote.create({ data });
  }

  async getQuoteById(id: number): Promise<Quote | null> {
    return prisma.quote.findUnique({ where: { id } });
  }

  async getAllQuotes(): Promise<Quote[]> {
    return prisma.quote.findMany();
  }

  async updateQuote(
    id: number,
    data: Partial<Omit<Quote, "id" | "createdAt" | "updatedAt">>
  ): Promise<Quote | null> {
    return prisma.quote.update({ where: { id }, data });
  }

  async deleteQuote(id: number): Promise<Quote | null> {
    return prisma.quote.delete({ where: { id } });
  }
}
