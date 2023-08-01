import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/api';
import { StoreState } from './store';
import { CurrentUser, Booking, Trip } from '../models';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            //const token = (getState() as StoreState).auth.token
            const userStorage=localStorage.getItem('currentUser');
            const token = '';
            if(userStorage){
            const token = JSON.parse(userStorage).token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }}

            return headers
        },
    }),
    endpoints: (builder) => ({
        signInUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: '/auth/sign-in',
                    method: 'post',
                    body,
                }
            },
        }),
        signUpUser: builder.mutation({
            query: (body: {
                fullName: string
                email: string
                password: string
            }) => {
                return {
                    url: '/auth/sign-up',
                    method: 'post',
                    body,
                }
            },
        }),
        getUser: builder.query<CurrentUser, void>({
            query: () => `/auth/authenticated-user`,
        }), 
        getAllBookings: builder.query<Booking[], void>({
            query: () => '/bookings',
        }),
        addBooking: builder.mutation<Booking, Partial<Booking>>({
            query: (body) => ({
                url: '/bookings',
                method: 'post',
                body,
            }),
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: 'delete',
            }),
        }),
        getAllTrips: builder.query<Trip[], void>({
            query: () => '/trips',
        }),
        getTripById: builder.query<Trip, string>({
            query: (id) => `/trips/${id}`,
        }),          
    }),
})

export const {
    useSignInUserMutation,
    useSignUpUserMutation, 
    useGetUserQuery,
    useGetAllBookingsQuery,
    useAddBookingMutation,
    useDeleteBookingMutation,
    useGetAllTripsQuery,
    useGetTripByIdQuery,
} = api