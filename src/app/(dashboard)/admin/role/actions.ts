'use server';

import { createServerApi } from "@/lib/axios.server";
import { INITIAL_STATE_ROLE } from "@/constants/role-constant";
import { roleSchema } from "@/validations/role-validation";
import { RoleFormState } from "@/types/role";


export async function createRole(prevState: RoleFormState, formData: FormData | null) {

    if (!formData) {
        return INITIAL_STATE_ROLE;
    }

    let validateFields = roleSchema.safeParse({
        alias: formData.get('alias'),
        isActive: formData.get('isActive') === 'true' ? true : false,
        name: formData.get('name')
    });

    if (!validateFields.success) {
        return {
            status: 'error',
            errors: {
                ...validateFields.error.flatten().fieldErrors,
                _form: []
            }
        };
    }
    
    const api = await createServerApi();

    try {
        await api.post("/roles", validateFields.data);

        return {
            status: 'success'
        };
    } catch (error: any) {

        const errorData = error?.response?.data;

        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [errorData?.message || "Terjadi kesalahan yang tidak terduga."]
            }
        };
    }

}

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


export async function updateRole(prevState: RoleFormState, formData: FormData | null) {

    if (!formData) {
        return INITIAL_STATE_ROLE;
    }

    let validateFields = roleSchema.safeParse({
        alias: formData.get('alias'),
        isActive: formData.get('isActive') === 'true' ? true : false,
        name: formData.get('name')
    });

    if (!validateFields.success) {
        return {
            status: 'error',
            errors: {
                ...validateFields.error.flatten().fieldErrors,
                _form: []
            }
        };
    }


    const api = await createServerApi();

    try {
        await api.patch(`/roles/${formData.get('id')}`, {
            ...validateFields.data
        });

        return {
            status: 'success'
        }

    } catch (error: any) {
        const errorData = error?.response?.data;

        return {
            status: 'error',
            errors: {
                ...prevState.errors,
                _form: [errorData?.message || "Terjadi kesalahan yang tidak terduga."]
            }
        };
    }

}