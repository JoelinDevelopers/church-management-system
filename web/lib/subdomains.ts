import { api } from '@/config/axios';
import { Role, Status } from '@/types/auth2';
import { BaseChurchTypes, ChurchBrief } from '@/types/church.schema';



export async function getSubdomainData(
  subdomain: string
):Promise<ChurchBrief | null> {
  try {
    const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const response = await api.get(`/churches/domains/${sanitizedSubdomain}`);
     
    return response.data;
  } catch (error: any) {
     if (error.response?.status === 404) {
      return null;
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:", subdomain);
      return null;
     }

     console.error("Error fetching subdomain data:", error);
      return null;
  }
}

export async function getAllChurches():Promise<BaseChurchTypes []> {
  try {
    const response = await api.get(`/churches`);
     
    return response.data;
  } catch (error: any) {
     if (error.response?.status === 404) {
      return [];
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
     }

     console.error("Error fetching subdomain data:", error);
      return [];
  }
}

export async function getChurchAdmins(id:string):Promise<ChurchAdmin []> {
  try {
    const response = await api.get(`/church-admins/${id}`);
     
    return response.data;
  } catch (error: any) {
     if (error.response?.status === 404) {
      return [];
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
     }

     console.error("Error fetching subdomain data:", error);
      return [];
  }
}

export type ChurchAdmin = {
    id: string;
    name: string;
    createdAt: Date;
    status: Status;
    email: string;
    phone: string;
    image: string;
    role: Role;
}

export async function getChurchById(
  id: string
):Promise<ChurchBrief | null> {
  try {
    const response = await api.get(`/church/brief/${id}`);
     
    return response.data;
  } catch (error: any) {
     if (error.response?.status === 404) {
      return null;
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:", id);
      return null;
     }

     console.error("Error fetching subdomain data:", error);
      return null;
  }
}

// export async function getAllSubdomains() {
//   const keys = await redis.keys('subdomain:*');

//   if (!keys.length) {
//     return [];
//   }

//   const values = await redis.mget<SubdomainData[]>(...keys);

//   return keys.map((key, index) => {
//     const subdomain = key.replace('subdomain:', '');
//     const data = values[index];

//     return {
//       subdomain,
//       emoji: data?.emoji || '❓',
//       createdAt: data?.createdAt || Date.now()
//     };
//   });
// }
