import dayjs from 'dayjs';

export const getDaysDiff = (first?:string| Date, second?: string | Date) => dayjs(first).diff(dayjs(second),'day');
