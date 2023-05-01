import React, { useEffect, useState } from 'react';
import { fetchRooms } from '@/infra';
import { Room} from '@/types';
import type { Pagination, RoomFilter } from '@/types';
import type { SubmitHandler} from 'react-hook-form';
import {  FormProvider, useForm } from 'react-hook-form';
import SearchBar from './SearchBar';
import Rooms from './Rooms';

const Room = () => {

    const methods = useForm<RoomFilter>({});

    const [rooms,setRooms] = useState<Pagination<Room>>();

    useEffect(() => {
        fetchRooms(methods.getValues())
        .then(setRooms);
    },[]);

    const onSubmit: SubmitHandler<RoomFilter> = payload => {
        fetchRooms(payload).then(setRooms);
    };

    if(!rooms) {
        return null;
    }

    return (
        <div>
            <FormProvider {...methods}>
                <div className="flex justify-center content-center items-center flex-col">
                    <div className="m-4">
                    <SearchBar onSubmit={onSubmit} />
                    </div>
                <Rooms rooms={rooms.data} />
                </div>
            </FormProvider>
        </div>
    );
};

export default Room;
