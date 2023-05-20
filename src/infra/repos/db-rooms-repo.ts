import type { Room } from '@/models/Room';
import { paginateResponse } from '@/shared/pagination';
import type { RoomFilter } from '@/srv/repos/rooms-repo';
import type RoomsRepo from '@/srv/repos/rooms-repo';
import type { Pagination } from '@/types/pagination';
import type { FilterQuery, Model } from 'mongoose';
class DbRoomsRepo implements RoomsRepo {
    constructor(private room: Model<Room>) { }

    async fetchRooms(filter: RoomFilter): Promise<Pagination<Room>> {
        const skip = Number(filter.skip) ?? 0;
        const limit = Number(filter.limit) ?? 2;

        const conditions: Array<FilterQuery<Room>> = [];

        if (filter._id) {
            conditions.push({
                _id: filter._id
            });
        }
        const test = await this.room.aggregate([
            {
                $lookup: {
                    as: 'booking',
                    from: 'bookings',
                    foreignField: '_id',
                    localField: 'roomId',
                },
            },
            {
                $match: {
                    booking: {
                        $exists: true,
                        ...filter.startDate && {$gte: new Date(filter.startDate)},
                        ...filter.endDate && {$lte: new Date(filter.endDate)},
                        $ne: []
                    }
                }
            }
        ]);

        const rooms = await this.room.find({
            ...conditions.length && {$and: conditions},

        }).skip(skip).limit(limit);
        const totalRooms = await this.room.count(filter);

        return paginateResponse(rooms, skip, limit, totalRooms);
    }

}

export default DbRoomsRepo;
