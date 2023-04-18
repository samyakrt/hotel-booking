import type { PaginationFilter } from './pagination';

export interface RoomFilter extends PaginationFilter {
    startDate?: Date,
    endDate?:Date
}

export interface Room {
    _id: string
    name: string
    maxCount: number
    rentPerDay: number
    imageUrls: string[]
    currentBooking: unknown[]
    type: string
    description: string;
    phone: string
}