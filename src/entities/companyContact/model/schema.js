import { z } from 'zod';

export const companyContactSchema = z.object({
    id: z.uuid(),
    name: z.string().min(2).max(100),
    email: z.email().nullable(),
    phone: z.string().min(10).max(15).nullable(),
    role: z.string().min(2).max(50),
    is_main_contact: z.boolean().default(false),
    last_contact: z.string().nullable(),
    created_at: z.string(),
});

export const createContactSchema = companyContactSchema.omit({
    id: true,
    created_at: true,
});

export const updateContactSchema = createContactSchema.partial();