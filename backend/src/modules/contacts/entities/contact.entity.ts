import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  fullName: string;
  email: string;
  phone: string;
  readonly registrationDate: Date;
  clientId: string;

  constructor() {
    this.id = randomUUID();
    this.registrationDate = new Date(Date.now());
  }
}
