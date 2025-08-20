import z from "zod";

export const roleSchema = z.object({
    name: z.string(),
    alias: z.string(),
    isActive: z.boolean()
});

export const roleFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    alias: z.string().min(1, 'Alias is required'),
    isActive: z.boolean(),
});

export type Role = z.infer<typeof roleSchema> & { id: string };
export type RoleForm = z.infer<typeof roleFormSchema>;