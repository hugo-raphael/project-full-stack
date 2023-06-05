import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ContactsRepository } from './repositories/contacts.repository';
import { ContactsInMemoryRepository } from './repositories/in-memory/contacts.in-memory.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    {
      provide: ContactsRepository,
      useClass: ContactsInMemoryRepository,
    },
  ],
})
export class ContactsModule {}
