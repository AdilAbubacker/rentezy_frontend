import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function LandlordRoute() {
    const isLandlord = useSelector(state => state.auth.isLandlord)
    const location = useLocation();

  return (
    isLandlord ? <Outlet/> : <Navigate to='/login' state={{ from: location }} replace/>
  )
}

export default LandlordRoute
