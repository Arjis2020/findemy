import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import CourseDetails from './components/CourseDetails'
import Footer from './components/Footer'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SearchResults from './components/SearchResults'
import Signup from './components/Signup'

export default function Router() {

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
      </Routes>
      <Footer
      />
    </BrowserRouter>
  )
}
