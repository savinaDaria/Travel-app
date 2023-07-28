import { Trip } from "./Trip";
import { Booking } from "./Booking";

interface TripOverviewProps {
    tripList: Trip[];
    onBookingCreate:(booking:Booking)=>void;
}

export type {TripOverviewProps};