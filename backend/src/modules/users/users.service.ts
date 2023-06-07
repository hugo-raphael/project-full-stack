import {
  ConflictException,
  HttpCode,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const verifyEmail = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (verifyEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();

    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const verifyId = await this.usersRepository.findOne(id);

    if (!verifyId) {
      throw new NotFoundException('User does not exist');
    }

    const verifyEmail = await this.usersRepository.findByEmail(
      updateUserDto.email,
    );

    if (verifyEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  @HttpCode(204)
  async remove(id: string) {
    const verifyId = await this.usersRepository.findOne(id);

    if (!verifyId) {
      throw new NotFoundException('User does not exist');
    }

    await this.usersRepository.delete(id);
    return;
  }
}
