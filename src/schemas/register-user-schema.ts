import z from './zod';

const RegisterUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export type RegisterUserPayload = z.infer<typeof RegisterUserSchema>

export default RegisterUserSchema;
