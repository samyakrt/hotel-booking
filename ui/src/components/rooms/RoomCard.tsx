import type { Room } from '@/types';
import React from 'react';
import { Button } from '../inputs';
import { Link } from 'react-router-dom';

interface Props {
    room: Room,
}

const RoomCard: React.FC<Props> = ({ room }) => (
    <div className="m-5 p-10 rounded border shadow-md flex justify-between max-w-3xl gap-5">
        <div>
            <img src={room.imageUrls[0]} />
        </div>
        <div>
            <h3 className="font-bold mb-3">{room.name}</h3>
            <p>Type : {room.type}</p>
            <p>Max count: {room.maxCount}</p>
            <p>phone: {room.phone}</p>
            <article className="font-light text-gray-400">{room.description}</article>
            <div className="text-right mt-3">
                <Link to={`/rooms/${room._id}`}>
                <Button color="primary" >
                    View details
                </Button>
                </Link>
            </div>
        </div>
    </div>
);

export default RoomCard;
