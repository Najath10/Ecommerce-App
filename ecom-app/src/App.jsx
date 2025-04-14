import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/Products/Products'
import Navbar from './components/shared/Navbar'
function App() {
  
  
  return (
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={ <Products/>} />
    </Routes>
  </Router>
  )
}

export default App
 