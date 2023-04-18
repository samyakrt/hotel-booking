import React from 'react';
import { Layout } from '@/layouts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Room } from './pages';

const App: React.FC = () => (
        <Layout>
            <BrowserRouter basename="/app">
            <Routes>
                <Route path="" element={<Room />} />
            </Routes>
            </BrowserRouter>
        </Layout>
    );

export default App;
