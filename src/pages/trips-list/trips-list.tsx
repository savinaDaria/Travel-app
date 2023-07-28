import styles from './styles.module.scss';
import { TripsFilter } from '../trips-filter/trips-filter';
import { TripCard } from '../trip-card/trip-card';
import { Trip, TripListProps } from '../../models';

const TripsList: React.FC<TripListProps> = ({ tripList,searchValue,duration,level,onSearchValueChange,onLevelChange,onDurationChange }) => {
  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <TripsFilter 
      searchValue={searchValue}
      level={level}
      duration={duration}
      onSearchValueChange={onSearchValueChange}
      onLevelChange={onLevelChange}
      onDurationChange={onDurationChange} />
      <section className={styles.trips}>
        <h2 className="visually-hidden">Trips List</h2>
        <ul className={styles["trip-list"]}>
          {tripList.map((tripItem: Trip) => (<TripCard trip={tripItem} key={tripItem.id} />))}
        </ul>
      </section>
    </main>
  );
}

export { TripsList };