import type { LoginUser, Pagination, RegisterUser, Room, RoomFilter } from '@/types';
import request from './request';

const BASE_URL = '/api';

export const fetchRooms = (filter: RoomFilter) => request<Pagination<Room>>('GET',`${BASE_URL}/rooms`,filter);

export const fetchRoomDetail = (roomId: string) => request<Room>('GET',`${BASE_URL}/rooms/${roomId}`);

export const registerUser = (payload: RegisterUser) => request('POST',`${BASE_URL}/users/register`,payload);

export const loginUser = (payload: LoginUser) => request('POST',`${BASE_URL}/users/login`,payload);

