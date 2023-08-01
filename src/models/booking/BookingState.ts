import { Booking } from "./Booking"

interface BookingsState {
    bookings: Booking[]
    isLoading: boolean
    error: string | null
}
export type {BookingsState};