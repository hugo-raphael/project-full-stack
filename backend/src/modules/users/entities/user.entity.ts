import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  fullName: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  readonly registrationDate: string;

  constructor() {
    this.id = randomUUID();
    this.registrationDate = new Date(Date.now()).toISOString();
  }
}

/* 
  nome completo
  email
  telefone
  data de registro (data em que o cliente foi registrado)
*/
