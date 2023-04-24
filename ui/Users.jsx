import React from 'react';
import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', () => {

    const element = document.querySelector<HTMLElement>('#react-root');

    if(element) {
        const root = createRoot(element);

        root.render();
    }
});
