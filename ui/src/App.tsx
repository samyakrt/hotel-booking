import React from 'react';
import { Layout } from '@/layouts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Room, RoomDetail } from './components/rooms';

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
