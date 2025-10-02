'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import { api } from '@/config/axios';


export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  try {
    const subdomain = formData.get('subdomain') as string;
    const title = formData.get('title') as string;
    const data = {
        name: title,
        subdomain,
    }

  if (!subdomain || !title) {
    return { success: false, error: 'Subdomain and title are required' };
  }


  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (sanitizedSubdomain !== subdomain) {
    return {
      subdomain,
      title,
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.'
    };
  }

  const response = await api.post('/churches', data);

  redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
    };
  }
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain');
//   await redis.del(`subdomain:${subdomain}`);
  revalidatePath('/admin');
  return { success: 'Domain deleted successfully' };
}
