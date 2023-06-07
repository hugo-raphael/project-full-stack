import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface IUserLogin {
  email: string;
  password: string;
}

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() userLogin: IUserLogin) {
    return this.authService.login(userLogin.email);
  }
}
