import React from 'react';
import Navbar from './Navbar';
import type { UserSession } from '@/types';
import { AuthProvider } from '@/context';

const Layout: React.FC<React.PropsWithChildren<UserSession>> = ({ children, isLoggedIn }) => (
    <AuthProvider isLoggedIn={isLoggedIn}>
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    </AuthProvider>
);

export default Layout;

