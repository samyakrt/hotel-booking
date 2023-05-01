import React from 'react';
import { useHandleError } from '@/hooks';
import { loginUser } from '@/infra';
import type { HandleSubmit, LoginUser } from '@/types';
import LoginForm from './LoginForm';

const Login: React.FC = () =>{

    const handleError = useHandleError();

    const onSubmit: HandleSubmit<LoginUser> = setError => payload => {
        loginUser(payload).then(() => location.href = '/app').catch(err => handleError(err, setError));
    };

    return (
        <div>
            <h3>Login for booking</h3>
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;
