import { classNames } from '@/utils';
import React from 'react';
import type { ErrorOption } from 'react-hook-form';

interface Props {
    error: ErrorOption
    className?: string
}
const Error: React.FC<Props> = ({ className, error }) => {
    const message = error?.message;

    return (
        <div className={classNames('text-sm text-red-500', className)}>
            {message}
        </div>);
};

export default Error;
