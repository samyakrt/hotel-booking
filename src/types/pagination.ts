export interface PaginationFilter {
    skip?: number;
    limit?: number
}

export interface Pagination<T> {
    data: T[],
    meta: {
        total: number;
        skip: number;
        limit: number
    }
}
