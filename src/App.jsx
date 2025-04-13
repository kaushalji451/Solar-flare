import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Product from './pages/Product'
import Home from './pages/Home';
import Newproduct from './pages/Newproduct'
import Item from './pages/Item'
import Editproduct from './pages/Editproduct'
import Userdata from './pages/Userdata'
import Checkout from './pages/Checkout'
import Contactus from './pages/Contactus'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/newproduct' element={<Newproduct/>}></Route>
        <Route path='/item' element={<Item/>}></Route>
        <Route path='product/edit' element={<Editproduct/>}></Route>
        <Route path='/user' element={<Userdata/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/contact' element={<Contactus/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
