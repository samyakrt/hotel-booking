import type { Room } from '@/types';
import React from 'react';
import RoomCard from './RoomCard';

interface Props {
    rooms: Room[]
}

const Rooms: React.FC<Props> = ({ rooms }) => (
        <>

            <div className="flex flex-col gap-y-5">
                {rooms.map(room => <RoomCard room={room} key={room._id}  />)}
            </div>
        </>
    );

export default Rooms;
