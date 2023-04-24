import { classNames } from '@/utils';
import React from 'react';
import type { ErrorOption } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
    hasError?: ErrorOption
}

type Ref = HTMLInputElement

const Input = ({ className, hasError, ...props }: Props, ref: React.LegacyRef<Ref>) => (
    <div className="relative">
        <input ref={ref} className={classNames('appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm disabled:bg-gray-50',
            hasError?.message
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-400 focus:border-red-400'
                : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600 placeholder-gray-400',
            className)} {...props} />
        {hasError && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
            </div>
        )}
    </div>

);

export default React.forwardRef<Ref, Props>(Input);
