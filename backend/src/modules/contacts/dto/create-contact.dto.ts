import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

//   @IsNotEmpty()
//   @IsString()
//   registrationDate: string;
