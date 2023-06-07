import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtServices: JwtService,
  ) {}
  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userServices.findByEmail(userEmail);

    if (user) {
      const matchPassword = await compare(userEmail, user.password);
      if (matchPassword) {
        return { email: user.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.userServices.findByEmail(email);
    return {
      token: this.jwtServices.sign({ email }, { subject: user.id }),
    };
  }
}
