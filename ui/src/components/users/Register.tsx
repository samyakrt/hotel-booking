import React from 'react';
import RegisterForm from './RegisterForm';
import type { HandleSubmit, RegisterUser } from '@/types';
import { registerUser } from '@/infra';
import { useHandleError } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {

    const handleError = useHandleError();
    const navigate = useNavigate();
    const onSubmit: HandleSubmit<RegisterUser> = setError => payload => {
        registerUser(payload).then(() => navigate('login')).catch(err => handleError(err, setError));
    };

    return (
        <div>
            <h3 className="font-bold text-center">Sign up</h3>
            <RegisterForm onSubmit={onSubmit} />
        </div>
    );
};

export default Register;
