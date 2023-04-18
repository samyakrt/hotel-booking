import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { produce } from 'immer';
import { Button } from '@/components/inputs';

const SearchBar = () => {
    const [ranges, setRange] =  useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const onChange = (value : DateValueType) => {
        value?.startDate;
        const next = produce(ranges, draft => {
            if(value?.startDate) {
                 draft.startDate = new Date(value.startDate);
            }

            if(value?.endDate) {
                draft.endDate = new Date(value.endDate);
            }

        });

        setRange(next);

    };

    return (
        <form className="p-4 border">
        <h2 className="text-center mb-3 text-lg font-bold text-gray-600">Search your perfect hotel</h2>
            <div className="flex items-center justify-between gap-3">
                <Datepicker
                    value={ranges}
                    onChange={onChange}
                />
            <Button color="primary">
                    Search
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
