import type { Room } from '@/models/Room';
import { paginateResponse } from '@/shared/pagination';
import type { RoomFilter } from '@/srv/repos/rooms-repo';
import type RoomsRepo from '@/srv/repos/rooms-repo';
import type { Pagination } from '@/types/pagination';
import type { Model } from 'mongoose';
class DbRoomsRepo implements RoomsRepo {
    constructor(private room: Model<Room>) { }

    async fetchRooms(filter: RoomFilter): Promise<Pagination<Room>> {
        const skip = Number(filter.skip) ?? 0;
        const limit = Number(filter.limit) ?? 2;

        const rooms = await this.room.find(filter).skip(skip).limit(limit);
        const totalRooms = await this.room.count(filter);

        return paginateResponse(rooms, skip, limit, totalRooms);
    }

}

export default DbRoomsRepo;
