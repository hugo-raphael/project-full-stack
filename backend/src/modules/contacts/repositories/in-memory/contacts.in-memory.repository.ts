import { plainToInstance } from 'class-transformer';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { UpdateContactDto } from '../../dto/update-contact.dto';
import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contacts.repository';
import { Contact } from '../../entities/contact.entity';

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = [];
  create(data: CreateContactDto, clientId: string): Contact | Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, {
      ...data,
      clientId,
    });

    this.database.push(newContact);

    return plainToInstance(Contact, newContact);
  }

  async findOneByClientId(clientId: string, contactId: string) {
    const contact = this.database.find(
      (contact) => contact.id === contactId && contact.clientId === clientId,
    );

    return contact;
  }

  findAll(): Contact[] | Promise<Contact[]> {
    return plainToInstance(Contact, this.database);
  }

  findOne(id: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.id === id);
    return plainToInstance(Contact, contact);
  }

  findByEmail(email: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.email === email);
    return plainToInstance(Contact, contact);
  }

  getContactsByClientId(clientId: string): Contact[] | Promise<Contact[]> {
    const contacts = this.database.filter(
      (contact) => contact.clientId === clientId,
    );
    return plainToInstance(Contact, contacts);
  }

  update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
    const contactIndex = this.database.findIndex(
      (contact) => contact.id === id,
    );
    this.database[contactIndex] = {
      ...this.database[contactIndex],
      ...data,
    };

    return plainToInstance(Contact, this.database[contactIndex]);
  }

  delete(id: string): void | Promise<void> {
    const contactIndex = this.database.findIndex(
      (contact) => contact.id === id,
    );
    this.database.splice(contactIndex, 1);
  }
}
