'use server';

import { createServerApi } from "@/lib/axios.server";

export async function getAllUsers(
    {
        currentPage,
        currentLimit,
        currentSearch
    }:
        {
            currentPage: number,
            currentLimit: number,
            currentSearch?: string
        }) {

    try {

        const api = await createServerApi();

        const response = await api.get("/users", {
            params: {
                skip: currentPage,
                take: currentLimit,
                search: currentSearch
            }
        });

        return response.data;

    } catch (error: any) {
        return {
            status: "error"
        };
    }
}
