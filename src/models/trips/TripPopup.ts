import { Trip } from "./Trip";
import { Booking } from "../booking/Booking";

interface TripPopupProps {
    trip: Trip;
    onClose: () => void;

}

export type {TripPopupProps};