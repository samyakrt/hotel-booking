import { ValidationFailedError } from '@/shared/errors';
import type { ExtractedErrorsType } from '@/types/validation';
import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

const validateSchema = (schema: ZodSchema) =>(req: Request,res : Response,next: NextFunction) =>  {

    const result = schema.safeParse(req.body);

    if(!result.success) {
        const errors  = result.error.errors
        .map(er => ([er.path.join('.'),er.message]))
        .reduce((acc,[key,msg]) => {

            if(key in acc) {
                acc[key].push(msg);
            }
            else {
                acc[key] = [msg] ;
            }
            return acc;
    }, {} as ExtractedErrorsType);

        throw new ValidationFailedError('failed',errors);
    }
    next();
};

export default validateSchema;
