import styles from './styles.module.scss';
import { TripFilterProps } from '../../models';
const TripsFilter : React.FC<TripFilterProps> = ({ searchValue,duration,level,onSearchValueChange,onLevelChange,onDurationChange }) => {
    
    const handleChangeSearchValue = (e: React.FormEvent<HTMLInputElement>): void => onSearchValueChange(e.currentTarget.value);    
    const handleChangeLevel = (e: React.FormEvent<HTMLSelectElement>): void => onLevelChange(e.currentTarget.value);
    const handleChangeDuration = (e: React.FormEvent<HTMLSelectElement>): void => onDurationChange(e.currentTarget.value);
  
    return (
        <section className={styles["trips-filter"]}>
            <h2 className="visually-hidden">Trips filter</h2>
            <form className={styles["trips-filter__form"]} autoComplete="off">
                <label className={`${styles["trips-filter__search"]} input`}>
                    <span className="visually-hidden">Search by name</span>
                    <input
                        data-test-id="filter-search"
                        name="search"
                        type="search"
                        placeholder="search by title"
                        value={searchValue}
                        onChange={handleChangeSearchValue}
                    />
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by duration</span>
                    <select data-test-id="filter-duration" name="duration" value={duration} onChange={handleChangeDuration}>
                        <option value="">duration</option>
                        <option value="0_x_5">&lt; 5 days</option>
                        <option value="5_x_10">&lt; 10 days</option>
                        <option value="10_x_">&ge; 10 days</option>
                    </select>
                </label>
                <label className="select">
                    <span className="visually-hidden">Search by level</span>
                    <select data-test-id="filter-level" name="level" value={level} onChange={handleChangeLevel}>
                        <option value="">level</option>
                        <option value="easy">easy</option>
                        <option value="moderate">moderate</option>
                        <option value="difficult">difficult</option>
                    </select>
                </label>
            </form>
        </section>
    );
}

export {TripsFilter};