export type AuthFormState = {
    status?: string;
    errors?: {
        email?: string[];
        password?: string[];
        name?: string[];
        role?: string[];
        avatar_url?: string[];
        _form?: string[];
    }
}

export type Profile = {
    id?: string;
    fullName?: string;
    avatar_url?: string;
    role?: string;
}

export type User = {
    id?: string;
    email?: string;
    fullName?: string;
    role?: string;
    nickname?: string;
    image?: string;
}