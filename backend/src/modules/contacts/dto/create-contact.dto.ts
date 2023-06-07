import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateContactDto {
  @ApiProperty({
    default: 'John Doe Contacts',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    default: 'johncontacs@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: '999998888',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    default: randomUUID(),
  })
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

//   @IsNotEmpty()
//   @IsString()
//   registrationDate: string;
