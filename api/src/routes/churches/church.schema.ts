import { z } from "zod";


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

export type ChurchCreateTypes = z.infer<typeof ChurchCreateSchema>;

export type BaseChurchTypes = z.infer<typeof ChurchBaseSchema>;