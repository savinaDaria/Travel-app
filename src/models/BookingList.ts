import { Booking } from "./Booking";

interface BookingListProps {
    bookingList: Booking[];
    onBookingListUpdate:(bookingList: Booking[]) => void;
}

export type {BookingListProps};