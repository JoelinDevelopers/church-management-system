import { apiRequest } from '@/config/axios';



type SubdomainData = {
  emoji: string;
  createdAt: number;
};

export async function getSubdomainData(subdomain: string) {
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  console.log(sanitizedSubdomain);
  const data = await apiRequest(`/churches/${sanitizedSubdomain}`);
  console.log(sanitizedSubdomain);
  return data;
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
