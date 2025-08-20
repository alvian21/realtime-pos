export type Role = {
    id?: string;
    name?: string;
    alias?: string;
    createdAt: string;
    isActive?: string;
}


export type RoleFormState = {
    status?: string;
    errors?: {
        id?: string[];
        name?: string[];
        alias?: string[];
        isActive?: string[];
        _form?: string[];
    };
};
