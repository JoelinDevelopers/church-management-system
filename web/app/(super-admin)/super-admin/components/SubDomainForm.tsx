'use client';

import type React from 'react';

import { useState } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import { Card } from '@/components/ui/card';
 
 
import { rootDomain } from '@/lib/utils';
import { title } from 'process';

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  title?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Subdomain</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="your-subdomain"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

function TitleInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Church Title</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="title"
            name="title"
            placeholder="Your church title"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
      </div>
    </div>
  );
}

 

export function SubdomainForm() {

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <TitleInput />
      <SubdomainInput defaultValue={state?.subdomain} />
      

       

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isPending || !title}>
        {isPending ? 'Creating...' : 'Create Church'}
      </Button>
    </form>
  );
}
function createSubdomainAction(state: CreateState, payload: FormData): CreateState | Promise<CreateState> {
    throw new Error('Function not implemented.');
}

