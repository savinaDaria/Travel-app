import { Booking } from '../models';
const sortBookingsByDateDescending = (bookingsNotSorted: Booking[]): Booking[] => {
    return bookingsNotSorted.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
};
const getStandartDate = (date: string): string => {
    const fullDate = new Date(date);
    const month = fullDate.getMonth() + 1;
    const monthFormatted=month<10?`0`+month:month
    const day=fullDate.getDate();
    const dayFormatted=day<10?`0`+day:day;
    return `${fullDate.getFullYear()}-${monthFormatted}-${dayFormatted}`;
};
export { sortBookingsByDateDescending, getStandartDate };