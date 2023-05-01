import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login, Register } from './src/components/users';
import UserLayout from '@/layouts/UserLayout';

document.addEventListener('DOMContentLoaded', () => {

    const element = document.querySelector<HTMLElement>('#react-root');

    if (element) {
        const root = createRoot(element);
        const {isLoggedIn} = element.dataset;

        root.render(
            <React.StrictMode>
                <UserLayout isLoggedIn={Boolean(isLoggedIn)}>
                    <BrowserRouter basename="/users">
                        <Routes>
                            <Route path="register" element={<Register />} />
                            <Route path="login" element={<Login />} />
                            </Routes>
                    </BrowserRouter>
                </UserLayout>
            </React.StrictMode>
        );
    }
});
