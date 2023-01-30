import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import CourseDetails from './components/CourseDetails'
import Footer from './components/Footer'
import History from './components/History'
import Home from './components/Home'
import Login from './components/Login'
import MyLearnings from './components/MyLearnings'
import Navbar from './components/Navbar'
import OrderPlaced from './components/OrderPlaced'
import ScrollToTop from './components/ScrollToTop'
import SearchResults from './components/SearchResults'
import Signup from './components/Signup'
import TopicResults from './components/TopicResults'
import { RootState } from './redux/reducers'
import { LoginStateAction } from './redux/reducers/auth.reducer'
import { HistoryState } from './redux/reducers/history.reducers'

export default function Router() {
  const user = useSelector<RootState>((state) => state.authReducer) as LoginStateAction
  const { paths: [previousPath, currentPath] } = useSelector<RootState>((state) => state.historyReducer) as HistoryState

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
          element={<Cart />}
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
          element={<MyLearnings />}
        />
        <Route 
          path='/order/success/:oid'
          element={<OrderPlaced />}
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
