import styles from './styles.module.scss';
import { TripProps } from '../../models';
import { Link} from "react-router-dom";
import { AppRoute } from '../../enums/app-route.enum';

const TripCard: React.FC<TripProps> = ({ trip }) => {
    const {
        id,
        title,
        level,
        duration,
        price,
        image,
    } = trip;
    return (
        <li data-test-id="trip-card" className={styles["trip-card"]}>
            <img
                data-test-id="trip-card-image"
                src={image}
                alt="trip photo"
            />
            <div className={styles["trip-card__content"]}>
                <div className={styles["trip-info"]}>
                    <h3 data-test-id="trip-card-title" className={styles["trip-info__title"]}>
                        {title}
                    </h3>
                    <div className={styles["trip-info__content"]}>
                        <span
                            data-test-id="trip-card-duration"
                            className={styles["trip-info__duration"]}
                        >
                            <strong>{duration}</strong> days
                        </span>
                        <span data-test-id="trip-card-level" className={styles["trip-info__level"]}>
                            {level}
                        </span>
                    </div>
                </div>
                <div className={styles["trip-price"]}>
                    <span>Price</span>
                    <strong
                        data-test-id="trip-card-price-value"
                        className={styles["trip-price__value"]}
                    >
                        {price} $
                    </strong>
                </div>
            </div>
            <Link data-test-id="trip-card-link" to={AppRoute.TRIP + '/' + id} className="button">
                Discover a trip
            </Link>
        </li>);
}

export { TripCard };