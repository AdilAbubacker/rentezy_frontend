import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function AdminRoute() {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const location = useLocation();

  return (      
    isAdmin ? <Outlet/> : <Navigate to='/login' state={{ from: location }} replace/>
  )
}

export default AdminRoute