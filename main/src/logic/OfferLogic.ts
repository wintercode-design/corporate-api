import { PrismaClient, Offer } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class OfferLogic {
  async createOffer(data: Omit<Offer, "id">): Promise<Offer> {
    return prisma.offer.create({ data });
  }

  async getOfferById(id: number): Promise<Offer | null> {
    return prisma.offer.findUnique({ where: { id } });
  }

  async getAllOffers(): Promise<Offer[]> {
    return prisma.offer.findMany();
  }

  async updateOffer(
    id: number,
    data: Partial<Omit<Offer, "id">>
  ): Promise<Offer | null> {
    return prisma.offer.update({ where: { id }, data });
  }

  async deleteOffer(id: number): Promise<Offer | null> {
    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) throw new Error("Offer not found");
    if (offer.imageUrl) deleteImage(offer.imageUrl);
    return prisma.offer.delete({ where: { id } });
  }
}
