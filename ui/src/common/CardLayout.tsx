import React from 'react';

const CardLayout:React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="bg-gray-100 h-full">
        <div className="max-w-3xl bg-white p-5 rounded">
            {children}
        </div>
    </div>
);
export default CardLayout;
