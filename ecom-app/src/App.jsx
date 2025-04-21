
import './App.css'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Contact from './components/Contact'; // Corrected
import About from './components/About';     // Corrected
import Products from './components/Products/Products'
import Navbar from './components/shared/Navbar'
import { Toaster } from 'react-hot-toast';
import React, { useEffect }  from 'react';
import Cart from './components/cart/cart';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/auth/Register';
import api from "./api/api";
import Checkout from './components/checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from './store/actions';


function App() {
  
  
  
  return (
    <React.Fragment>
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={ <Products/>} />
      <Route path='/products' element={ <Products/>} />
      <Route path='/contact' element={ <Contact/>} />
      <Route path='/about' element={ <About/>} />
      <Route path='/cart' element={ <Cart/>} />

      <Route path='/' element={ <PrivateRoute />} >
      <Route path='/checkout' element={ <Checkout/>} />
      </Route>


      <Route path='/' element={ <PrivateRoute  publicPage />} >
            <Route path='/login' element={ <Login/>} />
            <Route path='/register' element={ <Register/>} />   
      </Route>
    </Routes>
  </Router>
  <Toaster position='bottom-center'/>
  </React.Fragment>
  )
}

export default App
 