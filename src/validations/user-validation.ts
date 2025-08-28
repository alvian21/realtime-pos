import z from 'zod';

export const createUserSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
    fullName: z.string().min(1, 'fullName is required'),
    nickname: z.string().min(1, 'Name is required'),
    roleId: z.string().min(1, 'Role is required'),
    file: z.union([z.string().min(1, 'Image URL is required'), z.instanceof(File)]),
    isActive: z.boolean(),
});

export const updateUserSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    fullName: z.string().min(1, 'fullName is required'),
    nickname: z.string().min(1, 'Name is required'),
    password: z.string().min(1, 'Password is required'),
    roleId: z.string().min(1, 'Role is required'),
    file: z.union([z.string().min(1, 'Image URL is required'), z.instanceof(File)]),
    isActive: z.boolean(),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;