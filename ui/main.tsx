import App from './src/App';
import { createRoot } from 'react-dom/client';
import React from 'react';

document.addEventListener('DOMContentLoaded',() => {
    const element = document.querySelector('#react-root');

if(element) {
    const root = createRoot(element);
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );
}
});
