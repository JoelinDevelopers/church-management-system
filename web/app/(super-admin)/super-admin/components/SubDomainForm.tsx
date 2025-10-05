'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { rootDomain } from '@/lib/utils';
import { churchFormSchema, type ChurchFormData } from '@/types/church.schema';
import { useCreateChurch } from '@/hooks/use-church';
import { Loader2 } from 'lucide-react';

// Create a client-side function to call the server action
 function SubdomainInput({
  defaultValue,
  error,
  ...props
}: {
  defaultValue?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Subdomain</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            className="w-full rounded-r-none focus:z-10"
            {...props}
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

function TitleInput({
  error,
  ...props
}: {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Church Title</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="title"
            className="w-full focus:z-10"
            {...props}
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function SubdomainForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<ChurchFormData>({
    resolver: zodResolver(churchFormSchema),
    defaultValues: {
      title: '',
      subdomain: '',
    },
  });

  const createChurchMutation = useCreateChurch();

  const onSubmit = async (data: ChurchFormData) => {
    clearErrors("root");
    try {
      const result = await createChurchMutation.mutateAsync(data);
      if (result && !result.success) {
        setError("root", {message: result.error});
      }
    } catch (error: any) {
      if(error.error){
        setError("root", {message: error.error});
      }
    }
  };

  const clearFieldError = (fieldName: keyof ChurchFormData) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    if (errors.root) {
      clearErrors("root");
    }
  };

  const isLoading = isSubmitting || createChurchMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TitleInput
        {...register('title', {
          onChange: () => clearFieldError("title")
        })}
        error={errors.title?.message}
        placeholder="Your church title"
      />
      
      <SubdomainInput
        {...register('subdomain', {
          onChange: () => clearFieldError("subdomain")
        })}
        error={errors.subdomain?.message}
        placeholder="your-church-name"
      />

      {errors.root && (
        <div className="text-sm text-red-500 p-3 bg-red-50 rounded-md border border-red-200">
          {errors.root.message}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-sping"/>
            Creating...
          </>
        ) : (
          "Create Church"
         )}
      </Button>
    </form>
  );
}