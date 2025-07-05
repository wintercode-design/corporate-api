import { PrismaClient, Contact } from "@prisma/client";
const prisma = new PrismaClient();

export class ContactLogic {
  async createContact(data: Omit<Contact, "id">): Promise<Contact> {
    return prisma.contact.create({ data });
  }

  async getContactById(id: number): Promise<Contact | null> {
    return prisma.contact.findUnique({ where: { id } });
  }

  async getAllContacts(): Promise<Contact[]> {
    return prisma.contact.findMany();
  }

  async updateContact(
    id: number,
    data: Partial<Omit<Contact, "id">>
  ): Promise<Contact | null> {
    return prisma.contact.update({ where: { id }, data });
  }

  async deleteContact(id: number): Promise<Contact | null> {
    return prisma.contact.delete({ where: { id } });
  }
}
