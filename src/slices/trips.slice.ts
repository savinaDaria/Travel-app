import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Trip, TripsState} from '../models'


const initialState: TripsState = {
    trips: [],
    isLoading: false,
    error: null,
}

export const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<Trip[]>) => {
            state.trips = action.payload
        },
    },
})

export const { setTrips } = tripsSlice.actions
export default tripsSlice.reducer
