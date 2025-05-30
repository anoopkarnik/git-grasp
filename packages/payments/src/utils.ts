
import {z} from  'zod';

export function formatDate (date:Date){
  return new Intl.DateTimeFormat("en-US",{
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date)
}

export function formatAmount (amount:number, currency:string){
  return new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency
  }).format(amount/100)
}

export const billingAddressSchema = z.object({
    name: z.string().max(100),
    email: z.string().email(),
    street: z.string().max(100),
    city: z.string().max(100),
    state: z.string().max(100),
    zipcode: z.string().max(10),
    country: z.string().max(100),
})

export type billingAddressSchemaType = z.infer<typeof billingAddressSchema>