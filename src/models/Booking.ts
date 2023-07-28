import { Trip } from './Trip';

interface Booking{
    id: string,
    userId: string,
    tripId: string,
    guests: number,
    date: string,
    trip: Pick<Trip,"title" | "duration" | "price">,
    totalPrice: number,
    createdAt: string
}

export type { Booking};
  