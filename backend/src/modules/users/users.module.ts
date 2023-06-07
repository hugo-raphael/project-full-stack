import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
//import { UsersInMemoryRepository } from './repositories/in-memory/users.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/users-prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
