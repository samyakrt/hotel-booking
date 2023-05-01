import type { UserSession } from '@/types';
import React from 'react';

export const AuthContext = React.createContext<UserSession>({
    isLoggedIn: false,
});

export const AuthProvider: React.FC<React.PropsWithChildren<UserSession>> = ({ isLoggedIn, children }) => (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );

