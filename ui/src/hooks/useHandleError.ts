import type { ExtractedErrorsType} from '@/infra/request';
import { ValidationFailedError } from '@/infra/request';
import type { UseFormSetError, Path } from 'react-hook-form';

const useHandleError = () => <T extends object>(err: Error, setError?:UseFormSetError<T> ) => {

    if(err instanceof ValidationFailedError && setError) {
        const errors = err.errors as ExtractedErrorsType;

        Object.entries(errors).forEach(([field,message]) => {
            setError(field as Path<T>, {
                type:'custom',
                message: message[0]
            });
        });
        return;
    }

};

export default useHandleError;
