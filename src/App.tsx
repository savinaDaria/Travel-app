import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import { AppRoute } from './enums/app-route.enum';
import { BookingsList, Sign, TripOverview, TripsList } from './pages';
import { Trip, Booking } from './models';
import tripsMockedList from './assets/data/trips.json';
import bookingsMockedList from './assets/data/bookings.json';
import { useState, useEffect } from 'react';

function App() {

  const mappedBookings=bookingsMockedList.map(b=>({...b,date:getStandartDate(b.date)}))
  const [trips, setTrips] = useState<Trip[]>(tripsMockedList);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(tripsMockedList);
  const [bookings, setBookings] = useState<Booking[]>(sortBookingsByDateDescending(mappedBookings));
  const [searchValue, setSearchValue] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const handleChangeSearchValue = (value: string): void => setSearchValue(value);
  const handleChangeDuration = (value: string): void => setDuration(value);
  const handleChangeLevel = (value: string): void => setLevel(value);
  useEffect(() => {
    const filteredTripsArray = trips
      .filter(trip => {
        if(!searchValue) return true;
        if(trip.title.toLowerCase().search(searchValue.toLowerCase()) != -1) return trip;
      })
      .filter(trip => {
        if (!duration) return true;
        const tripDuration = duration.split('_x_');
        if ((tripDuration.length === 1)) {
          return (trip.duration >= parseInt(tripDuration[0]));
        }
        return ((trip.duration >= parseInt(tripDuration[0])) && (trip.duration < parseInt(tripDuration[1])));
      })
      .filter(trip => (level ? (trip.level === level) : true))
    setFilteredTrips(filteredTripsArray);
  }, [searchValue, duration, level])


  const handleBookingListUpdate = (updatedBookings: Booking[]) => {
    setBookings(sortBookingsByDateDescending(updatedBookings));
  }

  const handleBookingCreate = (booking: Booking) => {
    bookings.push(booking);
    setBookings(sortBookingsByDateDescending(bookings));
  }
  return (
    <>
      < Header />
      <Routes>
        <Route path={AppRoute.ROOT} element={<TripsList
          tripList={filteredTrips}
          searchValue={searchValue}
          level={level}
          duration={duration}
          onSearchValueChange={handleChangeSearchValue}
          onLevelChange={handleChangeLevel}
          onDurationChange={handleChangeDuration}
        />} />
        <Route path={AppRoute.SIGNIN} element={<Sign />} />
        <Route path={AppRoute.SIGNUP} element={<Sign />} />
        <Route path={AppRoute.BOOKINGS} element={<BookingsList
          bookingList={bookings as Booking[]}
          onBookingListUpdate={handleBookingListUpdate} />} />
        <Route path={AppRoute.TRIPID} element={<TripOverview
          tripList={trips}
          onBookingCreate={handleBookingCreate} />} />
        <Route path={AppRoute.ANY} element={<Navigate to={AppRoute.ROOT} />} />
      </Routes>
      < Footer />
    </>
  )
}
import { getStandartDate, sortBookingsByDateDescending } from './helpers/date.helpers';

export default App
