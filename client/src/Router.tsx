import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import CourseDetails from './components/CourseDetails'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import SearchResults from './components/SearchResults'
import Signup from './components/Signup'
import { RootState } from './redux/reducers'
import { LoginStateAction } from './redux/reducers/auth.reducer'
import { HistoryState } from './redux/reducers/history.reducers'

export default function Router() {
  const user = useSelector<RootState>((state) => state.authReducer) as LoginStateAction
  const { paths: [previousPath, currentPath] } = useSelector<RootState>((state) => state.historyReducer) as HistoryState

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={user.data?._id ?
            <Navigate
              to={previousPath}
            />
            :
            <Login />
          }
        />
        <Route
          path='/signup'
          element={
            user.data?._id ?
              <Navigate
                to={previousPath}
              />
              :
              <Signup />
          }
        />
        <Route
          path='/search'
          element={<SearchResults />}
        />
        <Route
          path='/course/:slug'
          element={<CourseDetails />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='/checkout'
          element={<Checkout
          // orders={orders}
          // orderMeta={orderMeta}
          />}
        />
      </Routes>
      <Footer
      />
    </BrowserRouter>
  )
}
