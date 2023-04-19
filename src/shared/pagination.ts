import type {Pagination} from '@/types/pagination';

export const paginateResponse = <T>(rows: T[], skip: number, limit: number, total: number): Pagination<T> => ({
    data: rows,
    meta: {
        total,
        skip,
        limit
    }
});
