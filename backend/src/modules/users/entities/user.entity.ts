import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  readonly registrationDate: Date;

  constructor() {
    this.id = randomUUID();
  }
}
