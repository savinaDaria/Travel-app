import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking, BookingsState } from '../models'


const initialState: BookingsState = {
    bookings: [],
    isLoading: false,
    error: null,
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setBookingsList: (state, action: PayloadAction<Booking[]>) => {
            state.bookings = action.payload
        },
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload)
        },
    },
})

export const { setBookingsList,addBooking } = bookingsSlice.actions
export default bookingsSlice.reducer
