import {
  ConflictException,
  HttpCode,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto) {
    const verifyEmail = await this.contactsRepository.findByEmail(
      createContactDto.email,
    );

    if (verifyEmail) {
      throw new ConflictException('Email already exists');
    }

    const contact = await this.contactsRepository.create(createContactDto);

    return contact;
  }

  async findAll(clientId: string) {
    const contacts = await this.contactsRepository.findAll(clientId);

    return contacts;
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne(id);
    return contact;
  }

  async findOneByClientId(clientId: string, contactId: string) {
    const contact = await this.contactsRepository.findOneByClientId(
      clientId,
      contactId,
    );

    if (!contact) {
      throw new NotFoundException('Contact does not exist');
    }
    return contact;
  }

  async findByEmail(email: string) {
    const contact = await this.contactsRepository.findOne(email);
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const verifyId = await this.contactsRepository.findOne(id);

    if (!verifyId) {
      throw new NotFoundException('Contact does not exist');
    }

    const verifyEmail = await this.contactsRepository.findByEmail(
      updateContactDto.email,
    );

    if (verifyEmail) {
      throw new ConflictException('Email already exists');
    }

    const contact = await this.contactsRepository.update(id, updateContactDto);
    return contact;
  }

  @HttpCode(204)
  async remove(id: string) {
    const verifyId = await this.contactsRepository.findOne(id);

    if (!verifyId) {
      throw new NotFoundException('Contact does not exist');
    }

    await this.contactsRepository.delete(id);
    return;
  }
}
