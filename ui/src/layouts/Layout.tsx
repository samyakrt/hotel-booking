import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className='h-full'>
            <Navbar />
            {children}
        </div>
    )
}


export default Layout

