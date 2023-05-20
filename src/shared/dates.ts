import dayjs from 'dayjs';

export const getDaysDiff = (first?:string| Date, second?: string | Date) => dayjs(second).diff(dayjs(first),'day');
