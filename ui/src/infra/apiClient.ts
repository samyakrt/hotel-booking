import type { Pagination, Room, RoomFilter } from '@/types';
import request from './request';

const BASE_URL = '/api';

export const fetchRooms = (filter: RoomFilter) => request<Pagination<Room>>('GET',`${BASE_URL}/rooms`,filter);

export const fetchRoomDetail = (roomId: string) => request<Room>('GET',`${BASE_URL}/rooms/${roomId}`);
