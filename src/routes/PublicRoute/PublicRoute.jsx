import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoute() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated )

    return (
      isAuthenticated ? <Navigate to='/'/> : <Outlet/>
  )
}

export default PublicRoute
