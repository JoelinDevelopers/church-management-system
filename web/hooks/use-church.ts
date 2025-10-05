"use-client"

import { createSubdomainAction } from "@/actions/sub-domain";
import { useMutation } from "@tanstack/react-query";


export function useCreateChurch() {
    return useMutation({
        mutationFn: createSubdomainAction,
        onSuccess: () => {

        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
        },
    });
}