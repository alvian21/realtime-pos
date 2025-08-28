'use server';

import { INITIAL_STATE_USER } from "@/constants/user-constant";
import { createServerApi } from "@/lib/axios.server";
import { UserFormState } from "@/types/user";
import { createUserSchema } from "@/validations/user-validation";


export async function createUser(prevState: UserFormState, formData: FormData | null) {

    if (!formData) {
        return INITIAL_STATE_USER;
    }

    let validateFields = createUserSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        nickname: formData.get('nickname'),
        password: formData.get('password'),
        roleId: formData.get('roleId'),
        file: formData.get('file'),
        isActive: formData.get('isActive') === 'true' ? true : false,
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
        await api.post("/users", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            status: 'success'
        };
    } catch (error: any) {

        console.log(error);

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
