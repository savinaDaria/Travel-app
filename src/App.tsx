import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import { AppRoute } from './constants/enums/app-route.enum';
import { BookingsList, Sign, TripOverview, TripsList } from './pages';


function App() {
  
  return (
    <>
      < Header />

      <Routes>
        <Route path={AppRoute.ROOT} element={<TripsList />} />
        <Route path={AppRoute.SIGNIN} element={<Sign />} />
        <Route path={AppRoute.SIGNUP} element={<Sign />} />
        <Route path={AppRoute.BOOKINGS} element={<BookingsList />} />
        <Route path={AppRoute.TRIPID} element={<TripOverview />} />
        <Route path={AppRoute.ANY} element={<Navigate to={AppRoute.ROOT} />} />
      </Routes>
      < Footer />
    </>
  )
}
export default App
