import React from 'react';
import { Layout } from '@/layouts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Room, RoomDetail } from './components/rooms';
import type { UserSession } from './types';

const App: React.FC<UserSession> = ({ isLoggedIn }) => (
        <Layout isLoggedIn={isLoggedIn}>
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
