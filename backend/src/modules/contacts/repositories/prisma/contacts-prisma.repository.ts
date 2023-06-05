import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';
import { PrismaService } from 'src/database/prisma.service';

export class ContactPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  findByClientId(clientId: string): Contact | Promise<Contact> {
    throw new Error('Method not implemented.');
  }
  async create(data: CreateContactDto): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, {
      ...data,
    });

    const newContact = await this.prisma.contact.create({
      data: { ...contact },
    });

    return newContact;
  }

  async findAll(): Promise<Contact[]> {
    const contact = await this.prisma.contact.findMany();

    return contact;
  }

  async findOneByClientId(clientId: string, contactId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id: contactId,
        client: {
          id: clientId,
        },
      },
    });

    return contact;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    return contact;
  }

  async findByEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { email },
    });

    return contact;
  }

  // async findByClientId(clientId: string): Promise<Contact> {
  //   const contact = await this.prisma.contact.findUnique({
  //     where: { clientId },
  //   });

  //   return contact;
  // }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data },
    });

    return contact;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });

    return;
  }
}
