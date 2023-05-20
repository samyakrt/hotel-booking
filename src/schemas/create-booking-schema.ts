import { isValidDate } from '@/shared/validators';
import z from './zod';

const CreateBookingSchema = z.object({
    from: z.string().refine(isValidDate),
    to: z.string().refine(isValidDate),
});

export type CreateBookingPayload = z.infer<typeof CreateBookingSchema>

export default CreateBookingSchema;
