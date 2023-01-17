import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart, { OrderMeta, Orders } from './components/Cart'
import Checkout from './components/Checkout'
import CourseDetails from './components/CourseDetails'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import Signup from './components/Signup'

export default function Router() {
  const orders: Array<Orders> = [
    {
      id: 1,
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      author: 'Academind by Maximillian Schwarzmüller',
      rating: 4.6,
      totalRatings: 173462,
      totalHours: 58.5,
      lectures: 598,
      levels: 'All',
      thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
      price: 449,
      realPrice: 3499
    },
    {
      id: 2,
      title: 'Modern React with Redux [2023 Update]',
      author: 'Stephen Grider',
      rating: 4.7,
      totalRatings: 79302,
      totalHours: 64,
      lectures: 722,
      levels: 'All',
      thumbnail: 'https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg',
      price: 449,
      realPrice: 3499
    },
  ]

  const totalPrice = orders.reduce((sum, i) => sum + i.price, 0)
  const totalRealPrice = orders.reduce((sum, i) => sum + i.realPrice, 0)
  const discountPercentage = Math.floor(((totalRealPrice - totalPrice) / totalRealPrice) * 100)
  const discount = totalRealPrice - totalPrice

  const orderMeta: OrderMeta = {
    totalPrice,
    totalRealPrice,
    discountPercentage,
    discount
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
        <Route
          path='/search'
          element={<SearchResults />}
        />
        <Route
          path='/course'
          element={<CourseDetails />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
        <Route
          path='/checkout'
          element={<Checkout
            orders={orders}
            orderMeta={orderMeta}
          />}
        />
      </Routes>
      <Footer
      />
    </BrowserRouter>
  )
}
