import { PrismaClient, Ads } from "@prisma/client";
import deleteImage from "../utils/deleteImage";
const prisma = new PrismaClient();

export class AdsLogic {
  async createAds(data: Omit<Ads, "id">): Promise<Ads> {
    return prisma.ads.create({ data });
  }

  async getAdsById(id: number): Promise<Ads | null> {
    return prisma.ads.findUnique({ where: { id } });
  }

  async getAllAds(): Promise<Ads[]> {
    return prisma.ads.findMany();
  }

  async updateAds(
    id: number,
    data: Partial<Omit<Ads, "id">>
  ): Promise<Ads | null> {
    return prisma.ads.update({ where: { id }, data });
  }

  async deleteAds(id: number): Promise<Ads | null> {
    const ad = await prisma.ads.findUnique({ where: { id } });
    if (!ad) throw new Error("Ad not found");
    if (ad.imageUrl) deleteImage(ad.imageUrl);
    return prisma.ads.delete({ where: { id } });
  }
}
