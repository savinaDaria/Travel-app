import styles from './styles.module.scss';
import { Booking, TripPopupProps } from '../../models';
import { useEffect, useState } from 'react';
import { getStandartDate } from '../../helpers/date.helpers';
import { useAddBookingMutation } from '../../slices/api.slice';
import { toast } from 'react-toastify';
import { setBookingsList,addBooking } from '../../slices/booking.slice'
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../slices/store';

const BookTripPopup: React.FC<TripPopupProps> = ({ trip, onClose }) => {
    const todayDate = getStandartDate(new Date().toString());
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(guests * trip.price);
    const [tripStartDate, setTripStartDate] = useState(todayDate);
    const { id: userId } = useSelector((state: StoreState) => ({
        id: state.auth.id
    }))
    const [addBooking, { isSuccess, isError, error }] = useAddBookingMutation()
    const handleSetGuestNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const guestValue = parseInt(e.currentTarget.value);
        const totalPriceValue = guestValue * trip.price;
        setGuests(guestValue);
        setTotalPrice(totalPriceValue);
    }
    const dispatch = useDispatch();
    const handleBookTripSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const booking = {
            tripId: trip.id,
            userId,
            guests,
            date: tripStartDate
        }
        const result = await addBooking(booking as Booking);
        const added= await result.data;
        const {bookings}=useSelector(((state:StoreState) => ({
            bookings: state.bookings.bookings
          })));
          bookings.push(added);
          dispatch(setBookingsList(bookings));
        // dispatch(setBookingsList(addedBooking));
    };
    const handleSetDate = (e: React.FormEvent<HTMLInputElement>) => {
        const dateValue = e.currentTarget.value;
        setTripStartDate(dateValue);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Booking added successfully')
            onClose();
        }
        if (isError) {
            toast.error((error as any).data.message)
        }
    }, [isSuccess, isError])
    return (
        <div className="modal">
            <div data-test-id="book-trip-popup" className={styles["book-trip-popup"]}>
                <button
                    data-test-id="book-trip-popup-close"
                    className={styles["book-trip-popup__close"]}
                    onClick={onClose}
                >
                    ×
                </button>
                <form className={styles["book-trip-popup__form"]} autoComplete="off">
                    <div className={styles["trip-info"]}>
                        <h3 data-test-id="book-trip-popup-title" className={styles["trip-info__title"]}>
                            {trip.title}
                        </h3>
                        <div className={styles["trip-info__content"]}>
                            <span
                                data-test-id="book-trip-popup-duration"
                                className={styles["trip-info__duration"]}
                            >
                                <strong>{trip.duration}</strong> days
                            </span>
                            <span
                                data-test-id="book-trip-popup-level"
                                className={styles["trip-info__level"]}
                            >
                                {trip.level}
                            </span>
                        </div>
                    </div>
                    <label className="input">
                        <span className="input__heading">Date</span>
                        <input
                            data-test-id="book-trip-popup-date"
                            name="date"
                            type="date"
                            value={tripStartDate}
                            onChange={handleSetDate}
                            min={todayDate}
                            required
                        />
                    </label>
                    <label className="input">
                        <span className="input__heading">Number of guests</span>
                        <input
                            data-test-id="book-trip-popup-guests"
                            name="guests"
                            type="number"
                            min="1"
                            max="10"
                            value={guests}
                            onChange={handleSetGuestNumber}
                            required
                        />
                    </label>
                    <span className={styles["book-trip-popup__total"]}>
                        Total:
                        <output
                            data-test-id="book-trip-popup-total-value"
                            className={styles["book-trip-popup__total-value"]}
                        >
                            {totalPrice}$
                        </output>
                    </span>
                    <button
                        data-test-id="book-trip-popup-submit"
                        className="button"
                        type="submit"
                        onClick={handleBookTripSubmit}
                    >
                        Book a trip
                    </button>
                </form>
            </div>
        </div>
    );
}

export { BookTripPopup };