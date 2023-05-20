import type { Booking } from '@/models/Booking';
import type { Room } from '@/models/Room';
import type { CreateBookingPayload } from '@/schemas/create-booking-schema';
import type { Pagination, PaginationFilter } from '@/types/pagination';
import type { FilterQuery } from 'mongoose';

interface BookingRepo {
    fetchBookings(filter: BookingFilter): Promise<Pagination<Booking>>
    addNewBooking(payload:BookingPayload,roomId: string, userId: string): Promise<Booking>
}

export default BookingRepo;

export interface BookingPayload extends CreateBookingPayload {
    rentPerDay: number;
    room: Room
}

export type BookingFilter =  FilterQuery<Booking> & PaginationFilter
