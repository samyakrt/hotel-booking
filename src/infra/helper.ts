import { UnexpectedError, ValidationFailedError } from '@/shared/errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDBError = (err: any) => {

    if ('errors' in err ) {
        const [key] = Object.keys(err?.errors);

        throw new ValidationFailedError(`${key} already used`, {
            [key]: [`${key} already used`]
        });
    }
    throw new UnexpectedError(err);
};

export default handleDBError;
