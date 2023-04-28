import React from 'react';
import { useForm, } from 'react-hook-form';
import { Button, FieldGroup, Input } from '@/components/inputs';
import type { HandleUserRegistration, RegisterUser } from '@/types';

interface Props {
    onSubmit: HandleUserRegistration
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterUser>();

    return (
        <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(onSubmit(setError))}>
            <FieldGroup label="Name" error={errors?.name}>
                <Input placeholder="Enter name" hasError={errors?.name} {...register('name', {
                    required: 'Please provide name'
                })} />
            </FieldGroup>

            <FieldGroup label="Email" error={errors?.email}>
                <Input type="email" placeholder="Enter email" hasError={errors?.email} {...register('email', {
                    required: 'Please provide email'
                })}
                />
            </FieldGroup>

            <FieldGroup label="Password" error={errors?.password}>
                <Input type="password" hasError={errors?.password} placeholder="Enter password" {...register('password', {
                    required: 'Please provide password'
                })} />
            </FieldGroup>
            <div>
                <Button type="submit" color="primary" >
                    Register
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
