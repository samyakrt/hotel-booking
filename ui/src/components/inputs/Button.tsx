import { classNames } from '@/utils';
import React from 'react';

type Colors = 'primary' | 'secondary' | 'alternate' | 'light' | 'clear'

interface ColorVariation {
    [key: string]: string
}

const colors: ColorVariation = {
    'primary': 'text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-600 font-medium shadow-sm border border-transparent',
    'secondary': 'bg-gray-200 text-gray-500 hover:bg-gray-300 focus:ring-gray-300 font-medium shadow-sm border border-transparent',
    'alternate': 'text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-600 font-medium shadow-sm border border-transparent',
    'light': 'text-blue-500 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500 font-medium shadow-sm border border-transparent',
    'clear': 'border-[1.5px] border-gray-200 hover:bg-gray-100 focus:ring-blue-600 text-gray-700',
  };

  const sizes = {
    'xs': 'px-2.5 py-1.5 text-xs',
    'sm': 'px-3 py-2 text-sm',
    'base': 'px-4 py-2 text-sm',
    'lg': 'px-4 py-2',
    'xl': 'px-6 py-3',
  };

type Sizes = 'xs' | 'sm'| 'base' | 'lg' | 'xl'
type Ref = HTMLButtonElement

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<Ref>, Ref> {
    className?: string
    type?: 'button'| 'submit',
    color?: Colors,
    size?: Sizes
    children?: React.ReactNode;
}

const Button = ({ children, type = 'button',color = 'clear', size = 'base' ,  className,...props }: Props, ref: React.LegacyRef<Ref> | undefined) => (
        <button ref={ref} type={type} className={classNames(className,colors[color],sizes[size],'rounded')} {...props} >
            {children}
        </button>
    );

export default React.forwardRef<Ref, Props>(Button);
