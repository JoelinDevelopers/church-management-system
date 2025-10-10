import { z } from "zod";


export const ChurchBaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Church title is required").max(
    100, "Title is too long"
  ),       
  subdomain: z.string().min(1, "Subdomain is required").max(
    63, "Subdomain is too long").regex(/^[a-z0-9-]+$/,
      "Subdomain can only contain lowercase letters, numbers and hyphens"
    ),         
  createdAt: z.string(),    
  updatedAt: z.string(),  
});

export const churchFormSchema = ChurchBaseSchema.omit({
  id: true,           
  createdAt: true,    
  updatedAt: true,  
});


export type ChurchFormData = z.infer<typeof churchFormSchema>;

export type ChurchBrief = ChurchFormData;

export type BaseChurchTypes = z.infer<typeof ChurchBaseSchema>;