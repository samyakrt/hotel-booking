import type { Room } from '@/types';
import React from 'react';
import Card from './Card';

interface Props {
    rooms: Room[]
}

const RoomList: React.FC<Props> = ({ rooms }) => (
        <>

            <div className="flex flex-col gap-y-5">
                {rooms.map(room => <Card room={room} key={room._id}  />)}
            </div>
        </>
    );

export default RoomList;
