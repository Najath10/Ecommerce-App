import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Products from './components/Products/Products'
function App() {
  
  
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={ <Products/>} />
    </Routes>
  </Router>
  )
}

export default App
 