import { classNames } from '@/utils';
import React from 'react';
import type { ErrorOption } from 'react-hook-form';

interface Props {
className?: string
name?: string
label?: string
error?: ErrorOption
hideLabel?: boolean
helpText?: string
showLabelOnMobile?: boolean
action?: React.ReactNode
inline?:boolean
}
const FieldGroup: React.FC<React.PropsWithChildren<Props>> = ({ className, children, name, label, error, hideLabel, helpText, showLabelOnMobile, action, inline }) =>
<div className={classNames(inline ? 'inline-flex' : 'space-y-1', className)}>
<div className={classNames('flex justify-between', inline ? 'items-center' : 'items-end')}>
  <label
    htmlFor={name}
    className={classNames(
      'block text-sm font-medium text-gray-500',
      hideLabel && 'sr-only',
      showLabelOnMobile && 'block sm:hidden',
    )}
  >
    {label}
  </label>
  {action}
</div>
<div className={classNames(inline ? 'mt-0' : 'mt-1')}>
  {children}
</div>
{!error && helpText && (
  <div className="mt-2 text-xs text-gray-400">{helpText}</div>
)}
{/* {error && <Error className="mt-2" error={error} />} */}
</div>;

export default FieldGroup;
