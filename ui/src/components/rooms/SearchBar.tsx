import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { produce } from 'immer';
import { Button } from '@/components/inputs';
import type { SubmitHandler} from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { RoomFilter } from '@/types';

interface Props {
    onSubmit: SubmitHandler<RoomFilter>
}
const SearchBar: React.FC<Props> = ({ onSubmit }) => {
    const [ranges, setRange] =  useState<DateValueType>({
        startDate:null,
        endDate: null
    });

    const { setValue, handleSubmit } = useFormContext<RoomFilter>();

    const onChange = (value : DateValueType) => {
        const next = produce(ranges, draft => {
            if(draft) {
                if(value?.startDate) {
                    const startDate = value.startDate;
                     draft.startDate = new Date(startDate);
                     setValue('startDate',startDate as string);
                }

                if(value?.endDate) {
                    const endDate = value.endDate;
                    draft.endDate = new Date(value.endDate);
                    setValue('endDate',endDate as string);
                }
            }

        });

        setRange(next);

    };

    return (
        <form className="p-4 border" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-3 text-lg font-bold text-gray-600">Search your perfect hotel</h2>
            <div className="flex items-center justify-between gap-3">

                <Datepicker
                    value={ranges}
                    onChange={onChange}
                />
            <Button type="submit" color="primary">
                    Search
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
