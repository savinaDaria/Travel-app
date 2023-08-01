import styles from './styles.module.scss';
import { TripsFilter } from '../trips-filter/trips-filter';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../../models';
import { useGetAllTripsQuery } from '../../slices/api.slice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

const TripsList = () => {
  const { data, isLoading, error } = useGetAllTripsQuery()
  const [filteredTrips, setFilteredTrips] = useState<Trip[] | undefined>(
    data
  )

  useEffect(() => {
    if (data) {
      setFilteredTrips(data)
    }
  }, [data])

  const [searchValue, setSearchValue] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const handleChangeSearchValue = (value: string): void => setSearchValue(value);
  const handleChangeDuration = (value: string): void => setDuration(value);
  const handleChangeLevel = (value: string): void => setLevel(value);
  useEffect(() => {
    if (data) {
      const filteredTripsArray = data
        .filter(trip => {
          if (!searchValue) return true;
          if (trip.title.toLowerCase().search(searchValue.toLowerCase()) != -1) return trip;
        })
        .filter(trip => {
          if (!duration) return true;
          switch (duration) {
            case '0_x_5':
                return trip.duration <= 5
            case '5_x_10':
                return trip.duration > 5 && trip.duration <= 10
            case '10_x_':
                return trip.duration > 10
            default:
                return true
        }
        })
        .filter(trip => (level ? (trip.level === level) : true))
      setFilteredTrips(filteredTripsArray);
    }
  }, [searchValue, duration, level])
  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <TripsFilter
        searchValue={searchValue}
        level={level}
        duration={duration}
        onSearchValueChange={handleChangeSearchValue}
        onLevelChange={handleChangeLevel}
        onDurationChange={handleChangeDuration} />
      <section className={styles.trips}>
        <h2 className="visually-hidden">Trips List</h2>
        {isLoading ? <div data-test-id="loader" className="loader"></div> :
          <ul className={styles["trip-list"]}>
            {filteredTrips?.map((tripItem: Trip) => (<TripCard trip={tripItem} key={tripItem.id} />))}
          </ul>
        }

        {error && toast.error(`Some error occurred`)}

      </section>
    </main>
  );
}

export { TripsList };