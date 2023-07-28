import { Trip } from "./Trip";
import { Booking } from "./Booking";
import { TripFilterProps } from ".";

interface TripListProps extends TripFilterProps {
    tripList: Trip[];
    
}

export type {TripListProps};