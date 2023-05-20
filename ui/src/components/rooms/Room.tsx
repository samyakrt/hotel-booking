import React, { useState } from 'react';
import { Room} from '@/types';
import type { Pagination, RoomFilter } from '@/types';
import {  FormProvider, useForm } from 'react-hook-form';
import SearchBar from './SearchBar';
import Rooms from './Rooms';

const Room = () => {

    const methods = useForm<RoomFilter>({});
    const [rooms,setRooms] = useState<Pagination<Room>>();

    if(!rooms) {
        return null;
    }

    return (
        <div>
            <FormProvider {...methods}>
                <div className="flex justify-center content-center items-center flex-col">
                    <div className="m-4">
                    <SearchBar setRoom={setRooms} />
                    </div>
                <Rooms rooms={rooms.data} />
                </div>
            </FormProvider>
        </div>
    );
};

export default Room;
