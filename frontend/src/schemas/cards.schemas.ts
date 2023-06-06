import {z} from "zod";


export const contactsSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  clientId: z.string(),
})


export type contactData = z.infer<typeof contactsSchema>