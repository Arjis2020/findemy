import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import CourseDetails from './components/CourseDetails'
import Footer from './components/Footer'
import ForgotPassword from './components/ForgotPassword'
import History from './components/History'
import Home from './components/Home'
import Login from './components/Login'
import MyLearnings from './components/MyLearnings'
import Navbar from './components/Navbar'
import OrderPlaced from './components/OrderPlaced'
import ResetPassword from './components/ResetPassword'
import ScrollToTop from './components/ScrollToTop'
import SearchResults from './components/SearchResults'
import Signup from './components/Signup'
import TopicResults from './components/TopicResults'
import { useAppSelector } from './redux/store'

export default function Router() {
  const user = useAppSelector((state) => state.authReducer)
  const { paths: [previousPath] } = useAppSelector((state) => state.historyReducer)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <History />
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
          path='/topic/:category'
          element={<TopicResults />}
        />
        <Route
          path='/course/:slug'
          element={<CourseDetails />}
        />
        <Route
          path='/cart'
          element={
            !user.data?._id ?
              <Navigate
                to='/'
              />
              :
              <Cart />
          }
        />
        <Route
          path='/checkout'
          element={user.data?._id ?
            <Checkout
            />
            :
            <Navigate
              to='/login'
            />
          }
        />
        <Route
          path='/my-learning'
          element={
            !user.data?._id ?
              <Navigate
                to='/'
              />
              :
              <MyLearnings />
          }
        />
        <Route
          path='/order/success/:oid'
          element={<OrderPlaced />}
        />
        <Route
          path='/forgotPassword'
          element={
            user.data?._id ?
              <Navigate
                to='/'
              />
              :
              <ForgotPassword />
          }
        />
        <Route
          path='/resetPassword'
          element={<ResetPassword />}
        />
        <Route
          path='*'
          element={<Navigate
            to='/'
          />}
        />
      </Routes>
      <Footer
      />
    </BrowserRouter>
  )
}
