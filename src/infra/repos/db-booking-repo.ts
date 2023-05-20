import type { Booking } from '@/models/Booking';
import { paginateResponse } from '@/shared/pagination';
import type BookingRepo from '@/srv/repos/booking-repo';
import type { BookingFilter, BookingPayload } from '@/srv/repos/booking-repo';
import type { Pagination } from '@/types/pagination';
import type { Model} from 'mongoose';
import { Types } from 'mongoose';

class DbBookingRepo implements BookingRepo {

    constructor(private booking: Model<Booking>) {}

    async fetchBookings(filter: BookingFilter): Promise<Pagination<Booking>> {
        const limit = filter.limit ?? 10;
        const skip = filter.skip ?? 0;

        const bookings = await this.booking.find(filter).limit(limit).skip(skip);

        const totalBookings = await this.booking.where(filter).count();

        return paginateResponse(bookings.map(booking => ({
                _id: booking._id,
                from: booking.from,
                rentPerDay: booking.rentPerDay,
                roomId: booking.roomId,
                status: booking.status,
                to: booking.to,
                totalAmount: booking.totalAmount,
                totalDays: booking.totalDays,
                userId: booking.userId
            })), skip, limit,totalBookings);

    }

    async addNewBooking(payload: BookingPayload, roomId: string, userId: string): Promise<Booking> {
        const booking =  await this.booking.create({
            rentPerDay: payload.rentPerDay,
            from:payload.from,
            to: payload.to,
            roomId,
            userId,
            _id: new Types.ObjectId()
        });

        return {
            _id: booking._id,
            from: booking.from,
            rentPerDay: booking.rentPerDay,
            roomId: roomId,
            status: booking.status,
            to: booking.to,
            totalAmount: booking.totalAmount,
            totalDays: booking.totalDays,
            userId: booking.userId
        };
    }

}

export default DbBookingRepo;
