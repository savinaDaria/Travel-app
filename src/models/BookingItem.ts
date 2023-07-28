import { Booking } from "./Booking";

interface BookingProps {
    booking: Booking;
    onCancel:(bookingId:string) =>void;
    
}

export type {BookingProps};