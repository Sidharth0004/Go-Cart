import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrder'
import SellerLoging from './components/seller/SellerLoging'
import SellerLayout from './pages/seller/SellerLayout'

const App = () => {
  const {showUserLogin , isSeller} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes('/seller');
  return (
    <div className='text--default text-gray-700 bg-white min-h-screen'>
      {/* Navbar is always visible except on seller paths */}
      {isSellerPath ? null : <Navbar />}
    {
      showUserLogin ? <Login /> : null
    }



      <Toaster />


      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'} `}>
      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/products' element={<AllProducts />} />
  <Route path='/products/:category' element={<ProductCategory />} />
  <Route path='/products/:category/:id' element={<ProductDetail />} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/add-address' element={<AddAddress />} />
  <Route path='/my-orders' element={<MyOrder />} />
  <Route path='/seller' element={isSeller? <SellerLayout/> :<SellerLoging />} />


</Routes>

      </div>
     {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
