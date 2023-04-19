import React from 'react';
import { Layout } from '@/layouts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Room } from './pages';
import RoomDetail from './pages/RoomDetail';

const App: React.FC = () => (
        <Layout>
            <BrowserRouter basename="/app">
            <Routes>
                <Route path="" element={<Room />} />
                <Route path="rooms">
                    <Route path=":roomId" element={<RoomDetail />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </Layout>
    );

export default App;
