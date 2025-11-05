import { z } from "zod";
import { nullableString } from "../(users)/users/users.schema";


export const ChurchBaseSchema = z.object({
  id: z.string(),
  name: z.string(),         
  subdomain: z.string(),           
  createdAt: z.string(),    
  updatedAt: z.string(),  
});

export const ChurchCreateSchema = ChurchBaseSchema.omit({
  id: true,           
  createdAt: true,    
  updatedAt: true,  
});

export const ChurchAdminsSchema = z.array(z.object({

    id: z.string(),
    name: nullableString,
    email: nullableString,
    phone: nullableString,
    image: nullableString,
    role: z.string(),
    status: z.string(),
    createdAt: z.string()
  
})
);

export type ChurchCreateTypes = z.infer<typeof ChurchCreateSchema>;

export type BaseChurchTypes = z.infer<typeof ChurchBaseSchema>;