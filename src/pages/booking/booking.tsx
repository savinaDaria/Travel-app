import styles from './styles.module.scss';
import { BookingProps } from '../../models';
const BookingItem  : React.FC<BookingProps> = ({ booking, onCancel}) =>{
    const handleCancel=()=>{
        onCancel(booking.id);
    }
    return (
        <li data-test-id="booking" className={styles.booking}>
                    <h3 data-test-id="booking-title" className={styles.booking__title}>{booking.trip.title}</h3>
                    <span data-test-id="booking-guests" className={styles.booking__guests}>
                        {booking.guests} guests
                    </span>
                    <span data-test-id="booking-date" className={styles.booking__date}>
                        {booking.date}
                    </span>
                    <span data-test-id="booking-total" className={styles.booking__total}>
                        {booking.totalPrice} $
                    </span>
                    <button
                        data-test-id="booking-cancel"
                        className={styles.booking__cancel}
                        title="Cancel booking"
                        onClick={handleCancel}
                    >
                        <span className="visually-hidden">Cancel booking</span>
                        ×
                    </button>
                </li>
    );
}

export {BookingItem};