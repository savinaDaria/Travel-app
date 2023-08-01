import styles from './styles.module.scss';
import { Trip } from '../../models';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BookTripPopup } from '../book-trip-popup/book-trip-popup';
import { useGetTripByIdQuery } from '../../slices/api.slice';

const TripOverview = () => {
    const params = useParams();
    const tripId=params.tripId;

    const [trip, setTrip] = useState<Trip | null>(null);
    const [toggleBookTripModal,setToggleBookTripModal]=useState(false);
    const { data, isLoading, error } = useGetTripByIdQuery(tripId as string)
    useEffect(() => {
        if (data) {
            setTrip(data)
        }
    }, [data])
    const handleOpenBookTripModal=()=>{
        const toggleValue=true;
        setToggleBookTripModal(toggleValue);
    }
    const handleCloseBookTripModal=()=>{
        const toggleValue=false;
        setToggleBookTripModal(toggleValue);
    }

    return (
        <main className={styles['trip-page']}>
            <h1 className={'visually-hidden'}>Travel App</h1>
            {trip && (<div className={styles.trip}>
                <img
                    data-test-id="trip-details-image"
                    src={trip.image}
                    className={styles.trip__img}
                    alt="trip photo"
                />
                <div className={styles.trip__content}>
                    <div className={styles['trip-info']}>
                        <h3 data-test-id="trip-details-title" className={styles["trip-info__title"]}>
                            {trip.title}
                        </h3>
                        <div className={styles['trip-info__content']}>
                            <span
                                data-test-id="trip-details-duration"
                                className={styles['trip-info__duration']}
                            >
                                <strong>{trip.duration}</strong> days
                            </span>
                            <span data-test-id="trip-details-level" className={styles['trip-info__level']}>
                                {trip.level}
                            </span>
                        </div>
                    </div>
                    <div
                        data-test-id="trip-details-description"
                        className={styles.trip__description}
                    >
                        {trip.description}
                    </div>
                    <div className={styles['trip-price']}>
                        <span>Price</span>
                        <strong
                            data-test-id="trip-details-price-value"
                            className={styles['trip-price__value']}
                        >
                            {trip.price} $
                        </strong>
                    </div>
                    <button
                        data-test-id="trip-details-button"
                        className={`${styles.trip__button} button`}
                        onClick={handleOpenBookTripModal}
                    >
                        Book a trip
                    </button>
                    {toggleBookTripModal && <BookTripPopup 
                    trip={trip} 
                    onClose={handleCloseBookTripModal}
                     />}
                </div>
            </div>)}
        </main>);
}

export { TripOverview };