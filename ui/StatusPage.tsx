import NotFoundPage from '@/components/statuspage/NotFoundPage';
import React from 'react';
import { useMemo } from 'react';
import { createRoot } from 'react-dom/client';

interface Props {
    statusType: 'notfound' | unknown
    isLoggedIn: boolean
}
const StatusPage: React.FC<Props> = ({ statusType }) => {
    const page = useMemo(() => {
        switch (statusType) {
            case 'notfound':
                return <NotFoundPage />;
            default:
                return <div>
                    unexpected error
                </div>;
        }
    },[]);

return (
    <div>
        {page}
    </div>
);
};

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector<HTMLElement>('#react-root');

    if(element) {
        const root = createRoot(element);
        const { statusType, isLoggedIn } = element.dataset;

        root.render(
            <React.StrictMode>
                <StatusPage
                statusType={statusType  as string}
                 isLoggedIn={Boolean(isLoggedIn) ?? false}
                  />
            </React.StrictMode>
        );
    }
});

