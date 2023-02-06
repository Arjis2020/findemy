import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import History from './components/History'
import Home from './components/Home'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import { useAppSelector } from './redux/store'

export default function Router() {
  const user = useAppSelector((state) => state.authReducer)
  const { paths: [previousPath] } = useAppSelector((state) => state.historyReducer)

  type LazyLoaderProps = {
    LazyComponent: ReturnType<typeof React.lazy>;
    fallback: React.ReactNode;
  }

  // lazy loads
  const Login = React.lazy(() => import('./components/Login'))
  const CourseDetails = React.lazy(() => import('./components/CourseDetails'))
  const Cart = React.lazy(() => import('./components/Cart'))
  const ForgotPassword = React.lazy(() => import('./components/ForgotPassword'))
  const MyLearnings = React.lazy(() => import('./components/MyLearnings'))
  const OrderPlaced = React.lazy(() => import('./components/OrderPlaced'))
  const ResetPassword = React.lazy(() => import('./components/ResetPassword'))
  const SearchResults = React.lazy(() => import('./components/SearchResults'))
  const Signup = React.lazy(() => import('./components/Signup'))
  const TopicResults = React.lazy(() => import('./components/TopicResults'))

  const LazyLoader = ({ LazyComponent, fallback }: LazyLoaderProps) => {
    return (
      <Suspense
        fallback={fallback}
      >
        <LazyComponent />
      </Suspense>
    )
  }

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
            <LazyLoader
              LazyComponent={Login}
              fallback={<Loader />}
            />
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
              <LazyLoader
                LazyComponent={Signup}
                fallback={<Loader />}
              />
          }
        />
        <Route
          path='/search'
          element={
            <LazyLoader
              LazyComponent={SearchResults}
              fallback={<Loader />}
            />
          }
        />
        <Route
          path='/topic/:category'
          element={
            <LazyLoader
              LazyComponent={TopicResults}
              fallback={<Loader />}
            />
          }
        />
        <Route
          path='/course/:slug'
          element={
            <LazyLoader
              LazyComponent={CourseDetails}
              fallback={<Loader />}
            />
          }
        />
        <Route
          path='/cart'
          element={
            !user.data?._id ?
              <Navigate
                to='/'
              />
              :
              <LazyLoader
                LazyComponent={Cart}
                fallback={<Loader />}
              />
          }
        />
        <Route
          path='/checkout'
          element={user.data?._id ?
            <Checkout
            />
            :
            <LazyLoader
              LazyComponent={Login}
              fallback={<Loader />}
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
              <LazyLoader
                LazyComponent={MyLearnings}
                fallback={<Loader />}
              />
          }
        />
        <Route
          path='/order/success/:oid'
          element={
            <LazyLoader
              LazyComponent={OrderPlaced}
              fallback={<Loader />}
            />
          }
        />
        <Route
          path='/forgotPassword'
          element={
            user.data?._id ?
              <Navigate
                to='/'
              />
              :
              <LazyLoader
                LazyComponent={ForgotPassword}
                fallback={<Loader />}
              />
          }
        />
        <Route
          path='/resetPassword'
          element={
            <LazyLoader
              LazyComponent={ResetPassword}
              fallback={<Loader />}
            />
          }
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/'
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
