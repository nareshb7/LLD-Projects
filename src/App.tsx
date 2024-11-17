import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/navbar'

const App = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
    </div>
  )
}

export default App