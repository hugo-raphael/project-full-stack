import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactsRepository } from '../contacts.repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ContactPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto, clientId: string): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, {
      ...data,
      clientId,
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

  async getContactsByClientId(clientId: string): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: { clientId },
    });

    return contacts;
  }

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
