'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import { api } from '@/config/axios';
import { churchFormSchema } from '@/types/church.schema';
import z from 'zod';

export async function createSubdomainAction(data: {
  title: string;
  subdomain: string;
}) {
  try {
    // Validate with zod
    const validatedData = churchFormSchema.parse(data);

    const response = await api.post('/churches', {
      name: validatedData.title,
      subdomain: validatedData.subdomain,
    });

    // Return success data for API call
      redirect (`${protocol}://${validatedData.subdomain}.${rootDomain}`);
    
  } catch (error: any) {
    //ZOD ERRORS
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed",
      };
    }

    // Handle specific HTTP status codes
    if (error.response) {
       const {status, data} = error.response;
       switch (status) {
        case 409: //conflict
         return {
          success: false,
          error: data.error || "Resource Conflict Occurred",
         };
         case 400: //Bad Request
         return {
          success: false,
          error: data.error || "Invalid Request Data",
         };
         case 401: //Unauthorized
         case 403: //Forbidden
         return {
          success: false,
          error: data.error || "You don't have permission to perform this action",
         };
         case 500: //Server Error
         return {
          success: false,
          error: data.error || "Server error. Please try again later",
         };
         default:
         return {
          success: false,
          error: data.error || "Unexpected error occurred",
         };
       }
     }
     
      return {
        success: false,
        error: "Network error: Unable to reach server. Please check your connection.",
      };
    }

     
  
}