import { AppRoute } from '../../constants/enums/app-route.enum';
import { Link, useNavigate, useLocation } from "react-router-dom";
import briefcaseSVG from '../../assets/images/briefcase.svg';
import userSVG from '../../assets/images/user.svg';
import styles from './styles.module.scss';
import { toast } from 'react-toastify'
import { signOut } from '../../slices/auth.slice'
import { StoreState } from '../../slices/store';
import { setUser } from '../../slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery } from '../../slices/api.slice';

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const { data, isLoading, error } = useGetUserQuery();
    if (data) {
        const userStorage = localStorage.getItem('currentUser');
        if (userStorage) {
            const token = JSON.parse(userStorage).token;
            dispatch(setUser({
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                createdAt: data.createdAt,
                token: token
            }))
        }
    }
    const { name } = useSelector((state: StoreState) => ({
        name: state.auth.fullName
    }));
    const showNavigation = !(pathname === AppRoute.SIGNIN || pathname === AppRoute.SIGNUP);
    const handleSignOut = () => {
        dispatch(signOut())
        toast.success('User sign out successfully')
        navigate(AppRoute.SIGNIN)
    }
    return (
        <header className={styles.header}>
            <div className={styles['header__inner']}>
                <Link data-test-id="header-logo" to={AppRoute.ROOT} className={styles.header__logo}>
                    Travel App
                </Link>
                {showNavigation && (
                    <nav data-test-id="header-nav" className={styles.header__nav}>
                        <ul className={styles['nav-header__list']}>
                            <li className={styles['nav-header__item']} title="Bookings">
                                <Link
                                    data-test-id="header-bookings-link"
                                    to={AppRoute.BOOKINGS}
                                    className={styles['nav-header__inner']}
                                >
                                    <span className='visually-hidden'>Bookings</span>
                                    <img src={briefcaseSVG} alt="bookings" />
                                </Link>
                            </li>
                            <li className={styles['nav-header__item']} title="Profile">
                                <div
                                    data-test-id="header-profile-nav"
                                    className={`${styles['nav-header__inner']} ${styles['profile-nav']}`}
                                    tabIndex={0}>
                                    <span className='visually-hidden'>Profile</span>
                                    <img src={userSVG} alt="profile" />
                                    <ul
                                        data-test-id="header-profile-nav-list"
                                        className={styles['profile-nav__list']}
                                    >
                                        <li
                                            data-test-id="header-profile-nav-username"
                                            className={`${styles['profile-nav__item']} ${styles['profile-nav__username']}`}
                                        >
                                            {name}
                                        </li>
                                        <li className={styles['profile-nav__item']}>
                                            <button
                                                data-test-id="header-profile-nav-sign-out"
                                                className={`${styles['profile-nav__sign-out']} button`}
                                                onClick={handleSignOut}
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </nav>)}
            </div>
        </header>);
}

export { Header };
