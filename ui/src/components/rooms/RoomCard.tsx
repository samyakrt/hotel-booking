import type { Room, RoomFilter } from '@/types';
import React, { useEffect } from 'react';
import { Button } from '../inputs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

interface Props {
    room: Room,
}

const RoomCard: React.FC<Props> = ({ room }) => {

    const navigate = useNavigate();
    const { watch } = useFormContext<RoomFilter>();
    const fields  = watch();

    const navigateToRoomDetail = () => {
        const searchParams = new URLSearchParams({
            ...(fields.startDate && { 'startDate': fields.startDate}),
            ...(fields.endDate && { 'endDate': fields.endDate})
        });
        navigate(`/rooms/${room._id}?${searchParams.toString()}`);
    };

    return (
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
                    <Button color="primary" onClick={navigateToRoomDetail} disabled={!(fields.startDate && fields.endDate)} >
                        View details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
