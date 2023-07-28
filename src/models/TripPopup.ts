import { Trip } from "./Trip";
import { Booking } from "./Booking";

interface TripPopupProps {
    trip: Trip;
    onClose: () => void;
    onSubmit:(booking:Booking) =>void;

}

export type {TripPopupProps};