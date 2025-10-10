"use-client"

import { createSubdomainAction, deleteChurchAction } from "@/actions/sub-domain";
import { getAllChurches, getSubdomainData } from "@/lib/subdomains";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";


export function useCreateChurch() {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createSubdomainAction,
        onSuccess: () => {
           queryClient.invalidateQueries({
            queryKey: ["churches"]
           })
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
        },
    });
}

export function useSubdomainData(subdomain: string){
    return useQuery({
        queryKey: ["subdomain", subdomain],
        queryFn: () => getSubdomainData(subdomain),
        enabled: !!subdomain,
        retry: 1,
        staleTime: 5 * 60 * 1000
    });
}

export function useChurchesData(){
    return useQuery({
        queryKey: ["churches"],
        queryFn: () => getAllChurches(),
        retry: 1,
        staleTime: 5 * 60 * 1000
    });
}


export function useDeleteChurch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChurchAction,
    onSuccess: () => {
      // Invalidate and refetch churches query
      queryClient.invalidateQueries({ queryKey: ['churches'] });
    },
    onError: (error: any) => {
        console.error("Delete church error:", error);
    },
  });
}

