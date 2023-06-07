import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty({
    default: 'johndoe@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'teste123',
  })
  @IsNotEmpty()
  password: string;
}
