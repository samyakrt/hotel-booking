import React from 'react';
import Layout from './Layout';
import type { UserSession } from '@/types';

const UserLayout: React.FC<React.PropsWithChildren<UserSession>> = ({children, isLoggedIn}) => (
        <Layout isLoggedIn={isLoggedIn}>
            <div className="h-full bg-gray-200">
            <div className="flex justify-center content-center pt-5  ">
                <div className="bg-white p-5 w-96 rounded">
                    {children}
                </div>
            </div>
        </div>
        </Layout>
    );

export default UserLayout;
