import App from './src/App';
import { createRoot } from 'react-dom/client';
import React from 'react';

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector<HTMLElement>('#react-root');

    if (element) {
        const root = createRoot(element);
        const { isLoggedIn } = element.dataset;
        root.render(
            <React.StrictMode>
                <App isLoggedIn={Boolean(isLoggedIn)} />
            </React.StrictMode>
        );
    }
});
