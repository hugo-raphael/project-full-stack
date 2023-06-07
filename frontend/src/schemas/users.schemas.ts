import { object, z } from 'zod';
import { contactsSchema } from './contacts.schemas';


const userSchema = z.object({
  id: z.string(),
	fullName: z.string(),
	email: z.string(),
	phone: z.string(),
	registrationDate: z.string(),
  contacts: z.array(contactsSchema)
})

export type userData = z.infer<typeof userSchema>