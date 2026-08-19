import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../shared/ui/components/Navbar'

const MainLayout = () => {
  return (
    <div>
      <Navbar>Navbar</Navbar>
      <Outlet/>
    </div>
  )
}

export default MainLayout
