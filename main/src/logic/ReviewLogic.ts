import { PrismaClient, Review } from "@prisma/client";
const prisma = new PrismaClient();

export class ReviewLogic {
  async createReview(data: Omit<Review, "id">): Promise<Review> {
    return prisma.review.create({ data });
  }

  async getReviewById(id: number): Promise<Review | null> {
    return prisma.review.findUnique({ where: { id } });
  }

  async getAllReviews(): Promise<Review[]> {
    return prisma.review.findMany();
  }

  async updateReview(
    id: number,
    data: Partial<Omit<Review, "id">>
  ): Promise<Review | null> {
    return prisma.review.update({ where: { id }, data });
  }

  async deleteReview(id: number): Promise<Review | null> {
    return prisma.review.delete({ where: { id } });
  }
}
