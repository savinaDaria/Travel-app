import { Booking } from '../models';
const sortBookingsByDateDescending = (bookingsNotSorted: Booking[]): Booking[] => {
    return bookingsNotSorted.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
};
const getStandartDate = (date: string): string => {
    const d = new Date(date);
    const mGet = d.getMonth() + 1;
    const m=mGet<10?`0`+mGet:mGet
    return `${d.getFullYear()}-${m}-${d.getDate()}`;
};
export { sortBookingsByDateDescending, getStandartDate };