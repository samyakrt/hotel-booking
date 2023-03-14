import { Room } from '@/models/Room';
import { Pagination, PaginationFilter } from '@/types/pagination';

interface RoomsRepo {
    fetchRooms(filter: RoomFilter): Promise<Pagination<Room>>
}

export default RoomsRepo;

export interface RoomFilter extends PaginationFilter {
    _id?: string
}
