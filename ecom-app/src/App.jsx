
import './App.css'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Contact from './components/Contact'; // Corrected
import About from './components/About';     // Corrected
import Products from './components/Products/Products'
import Navbar from './components/shared/Navbar'
import { Toaster } from 'react-hot-toast';
import React from 'react';
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
    </Routes>
  </Router>
  <Toaster position='bottom-center'/>
  </React.Fragment>
  )
}

export default App
 