'use server';

import { createServerApi } from "@/lib/axios.server";
import { INITIAL_STATE_ROLE, INITIAL_STATE_ROLE_PERMISSION } from "@/constants/role-constant";
import { rolePermissionSchema, roleSchema } from "@/validations/role-validation";
import { RoleFormState, RolePermissionFormState } from "@/types/role";


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
            currentPage?: number,
            currentLimit?: number,
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


export async function deleteRole(prevState: RoleFormState, formData: FormData | null) {


    const api = await createServerApi();

    try {
        await api.delete(`/roles/${formData?.get('id')}`);

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

export async function getListPermissions() {

    try {

        const api = await createServerApi();

        const response = await api.get("/permissions");

        return response.data;

    } catch (error: any) {

        const errorData = error?.response?.data;

        return {
            status: "error",
            message: errorData?.message
        };
    }
}


export async function getListRolePermissions(id: string) {

    try {

        const api = await createServerApi();

        const response = await api.get(`/role-permissions/role/${id}`);

        return response.data;

    } catch (error: any) {

        const errorData = error?.response?.data;

        return {
            status: "error",
            message: errorData?.message
        };
    }
}


export async function assignRolePermission(prevState: RolePermissionFormState, formData: FormData | null) {

    if (!formData) {
        return INITIAL_STATE_ROLE_PERMISSION;
    }

    let validateFields = rolePermissionSchema.safeParse({
        permissionIds: formData.get('permissionIds'),
        roleId: formData.get('roleId'),
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
        await api.post(`/role-permissions/assign`, {
            permissionIds: JSON.parse(formData.get('permissionIds') as string),
            roleId: formData.get('roleId')
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