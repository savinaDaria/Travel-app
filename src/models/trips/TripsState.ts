import { Trip } from "./Trip"

interface TripsState {
    trips: Trip[]
    isLoading: boolean
    error: string | null
}

export type {TripsState};