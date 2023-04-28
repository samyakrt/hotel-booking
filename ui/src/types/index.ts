import type { FieldValues, SubmitHandler, UseFormSetError } from 'react-hook-form';

export * from './room';
export * from './pagination';
export * from './user';

export type HandleSubmit<T extends FieldValues> = (setError: UseFormSetError<T>) => SubmitHandler<T>
