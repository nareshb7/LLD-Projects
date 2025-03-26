import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/navbar'
import "./App.css"

const App = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
    </div>
  )
}

export default App