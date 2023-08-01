import { api } from './api.slice';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import tripsReducer from './trips.slice';
import bookingsReducer from './booking.slice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
        bookings: bookingsReducer,
        api: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

//export type AppDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)