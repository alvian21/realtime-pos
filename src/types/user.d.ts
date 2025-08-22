export type User = {
    id?: string;
    email?: string;
    fullName?: string;
    role?: {
        id?: string;
        alias: string;
        name: string;
    };
    nickname?: string;
    image?: string;
    createdAt: string;
    isActive?: string;
}


export type UserFormState = {
    status?: string;
    errors?: {
        id?: string[];
        email?: string[];
        fullName?: string[];
        role?: string[];
        nickname?: string[];
        image?: string[];
        createdAt: string[];
        isActive?: string[];
        _form?: string[];
    };
};

