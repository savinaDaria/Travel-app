import styles from './styles.module.scss';
import { BookingItem } from '../booking/booking';
import { Booking, BookingListProps } from '../../models';
import { useState, useEffect } from 'react';
const BookingsList: React.FC<BookingListProps> = ({ bookingList,onBookingListUpdate }) => {
  
  const handleBookingCancel = (bookingId: string) => {
    const updatedBookings = bookingList.filter(b => b.id !== bookingId);
    onBookingListUpdate(updatedBookings);
  };


  return (
    <main className={styles["bookings-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      <ul className={styles.bookings__list}>
        {bookingList.map(booking => <BookingItem
          booking={booking}
          key={booking.id}
          onCancel={handleBookingCancel}
          
        />)}
      </ul>
    </main>
  );
}

export { BookingsList };