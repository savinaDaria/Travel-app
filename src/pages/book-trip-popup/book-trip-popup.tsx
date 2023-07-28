import styles from './styles.module.scss';
import { Booking, TripPopupProps } from '../../models';
import { useState} from 'react';
import { getStandartDate } from '../../helpers/date.helpers';
const BookTripPopup: React.FC<TripPopupProps> = ({ trip, onClose,onSubmit }) => {
    const todayDate =getStandartDate(new Date().toString());
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(guests*trip.price);
    const [tripStartDate, setTripStartDate] = useState(todayDate);

    const handleSetGuestNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const guestValue = parseInt(e.currentTarget.value);
        const totalPriceValue = guestValue * trip.price;
        setGuests(guestValue);
        setTotalPrice(totalPriceValue);
    }
    const handleBookTripSubmit=(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const createdAtTime=Date.now().toString();
        const booking={
            id:crypto.randomUUID.toString(),
            tripId:trip.id,
            trip:{
                title:trip.title,
                duration:trip.duration,
                price:trip.price
            },
            userId:'',
            guests,
            date: tripStartDate,
            totalPrice,
            createdAt: createdAtTime
        }
        onSubmit(booking as Booking);
        onClose();
    };
    const handleSetDate = (e: React.FormEvent<HTMLInputElement>) => {
        const dateValue = e.currentTarget.value;
        setTripStartDate(dateValue);
    }
    
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