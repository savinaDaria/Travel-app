import styles from './styles.module.scss';
import { BookingItem } from '../booking/booking';
import { useEffect } from 'react';
import { useGetAllBookingsQuery, useDeleteBookingMutation } from '../../slices/api.slice';
import { toast } from 'react-toastify';
import { getStandartDate,sortBookingsByDateDescending } from '../../helpers/date.helpers';
import { setBookingsList } from '../../slices/booking.slice'
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../slices/store';

const BookingsList= () => {
  const { data, isLoading, error } = useGetAllBookingsQuery()
  const {bookings}=useSelector(((state:StoreState) => ({
    bookings: state.bookings.bookings
  })));
  const [deleteBooking, { isSuccess, isError, error:deleteError }] = useDeleteBookingMutation() 
  const dispatch=useDispatch();
  useEffect(() => {
    if (data) {
      const bookingsMapped=sortBookingsByDateDescending(data.map(b=>({...b,date:getStandartDate(b.date)})));
      dispatch(setBookingsList(bookingsMapped));
    }
  }, [data])

  const handleBookingCancel = (bookingId: string) => {
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    if(updatedBookings) dispatch(setBookingsList(updatedBookings));  
    deleteBooking(bookingId);
  };
  useEffect(() => {
    if (isSuccess) {
        toast.success('Booking deleted successfully')
    }
    if (isError) {
        toast.error((deleteError as any).data.message)
    }
}, [isSuccess, isError])


  return (
    <main className={styles["bookings-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      {isLoading ? <div data-test-id="loader" className="loader"></div>
       : <ul className={styles.bookings__list}>
        {bookings.map(booking => <BookingItem
          booking={booking}
          key={booking.id}
          onCancel={handleBookingCancel}

        />)}
      </ul>}
      {error && toast.error(`Some error occurred`)}
    </main>
  );
}

export { BookingsList };