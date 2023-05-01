import React from 'react';
import type { HandleSubmit, LoginUser } from '@/types';
import { useForm } from 'react-hook-form';
import { Button, FieldGroup, Input } from '../inputs';

interface Props {
    onSubmit: HandleSubmit<LoginUser>
}
const LoginForm: React.FC<Props> = ({ onSubmit }) => {

    const { handleSubmit, setError, register,formState: { errors } } = useForm<LoginUser>();

    return (
        <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(onSubmit(setError))}>
            <FieldGroup label="Email" error={errors?.email}>
                <Input type="email" placeholder="Enter email" hasError={errors?.email} {...register('email', {
                    required: 'Please provide email'
                })} />
            </FieldGroup>

            <FieldGroup label="Password" error={errors?.password}>
                <Input type="password" placeholder="Enter password" hasError={errors?.password} {...register('password', {
                    required: 'Please provide password'
                })} />
            </FieldGroup>

            <div>
                <Button type="submit" color="primary">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
