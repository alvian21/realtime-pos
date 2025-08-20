'use server';

import { INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { AuthFormState } from "@/types/auth";
import { loginSchemaForm } from "@/validations/auth-validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerApi } from "@/lib/axios.server";

export async function getAllRoles(
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

        const response = await api.get("/roles", {
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
