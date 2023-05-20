import z from 'zod';

export const numeric =() => z.number().or(z.string().regex(/\/d$/).transform(d => Number(d)));

export default z;
