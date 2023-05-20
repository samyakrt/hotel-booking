import { addNewBooking, fetchRoomDetail } from '@/infra';
import type { BookingCard, Room } from '@/types';
import { getDaysDiff } from '@/utils';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../inputs';
import { AuthContext } from '@/context';

const Detail: React.FC<BookingCard> = ({ title, contents }) => (
    <div className="flex flex-col gap-y-5 divide-y-[1px]">
        <h3 className="font-semibold text-lg ">{title}</h3>
        <div className="flex flex-col text-right gap-y-3">
            {
                contents.map(content => (
                    <div key={content.label}>
                        <span className="font-semibold text-md pr-2">{content.label}:</span>
                        <span>{content.body}</span>
                    </div>
                ))
            }
        </div>
    </div>
);
const RoomDetail = () => {

    const { roomId } = useParams();
    const [room, setRoom] = useState<Room | undefined>();
    const [searchParams] = useSearchParams();

    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetchRoomDetail(roomId as string).then(setRoom);
    }, []);

    const range = useMemo(() => ({
        from: searchParams.get('startDate') ?? '',
        to: searchParams.get('endDate') ?? ''
    }), []);

    const totalDays = useMemo(() => getDaysDiff(range.to, range.from), []);

    const roomDetail = useMemo<BookingCard>(() => ({
        title: 'Booking Details',
        contents: [
            {
                label: 'Name',
                body: room?.name
            },
            {
                label: 'From date',
                body: range.from ?? ''
            },
            {
                label: 'To date',
                body: range.to ?? ''
            },
            {
                label: 'Max count',
                body: room?.maxCount
            }

        ]
    }), [room]);

    const amountDetail = useMemo<BookingCard>(() => ({
        title: 'Amount',
        contents: [
            {
                label: 'Total Days',
                body: totalDays
            },
            {
                label: 'Rent per day',
                body: room?.rentPerDay
            },
            {
                label: 'Total amount',
                body: totalDays * (room?.rentPerDay ?? 0)
            }
        ]
    }), [room, totalDays]);

    const bookRoom = () => {
        if (room) {
            addNewBooking(room?._id, range).then(() => location.href = '/app').catch();
        }
    };
    console.log(authContext);

    if (!room) {
        return null;
    }

    return (
        <div className="flex justify-center bg-gray-100 h-full ">
            <div className="bg-white border rounded shadow-md mt-5 p-5 w-4/5 h-fit">
                <div className="grid sm:grid-cols-1 md:grid-cols-2">
                    <div>
                        <h5 className="font-lighter text-sm mb-3">{room.description}</h5>
                        <img src={room.imageUrls[0]} className="w-72 h-fit" />
                    </div>
                    <div className="text-right flex flex-col gap-y-5">
                        <Detail {...roomDetail} />
                        <Detail {...amountDetail} />
                        {authContext.isLoggedIn ? (
                        <div >
                            <Button type="button" onClick={bookRoom} color="primary" >
                                Book room
                            </Button>
                        </div>
                        ) : (
                            <a href="/users/login">
                                <Button color="primary">
                                    Sign In to book room
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default RoomDetail;
