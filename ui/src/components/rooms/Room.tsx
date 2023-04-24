import { fetchRooms } from '@/infra';
import { Room} from '@/types';
import type { Pagination, RoomFilter } from '@/types';
import React, { useEffect, useState } from 'react';
import {  FormProvider, useForm } from 'react-hook-form';
import SearchBar from './SearchBar';
import Rooms from './Rooms';

const Room = () => {

    const methods = useForm<RoomFilter>({
        values: {
            startDate: undefined,
            endDate: undefined
        }
    });

    const [rooms,setRooms] = useState<Pagination<Room>>();

    const fields = methods.watch();

    useEffect(() => {
        fetchRooms(methods.getValues())
        .then(setRooms);
    },[fields]);

    if(!rooms) {
        return null;
    }

    return (
        <div>
            <FormProvider {...methods}>
                <div className="flex justify-center content-center items-center flex-col">
                    <div className="m-4 ">
                    <SearchBar />
                    </div>
                <Rooms rooms={rooms.data} />
                </div>
            </FormProvider>
        </div>
    );
};

export default Room;
