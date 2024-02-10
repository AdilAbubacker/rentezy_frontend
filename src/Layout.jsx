import React, { useEffect } from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './features/auth/authSlice.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import NewHeader from './components/NewHeader/NewHeader.jsx'
import NewFooter from './components/NewFooter/NewFooter.jsx'

function Layout() {
 const dispatch = useDispatch()
 const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 const user = useSelector((state) => state.auth.user);
 const location = useLocation()


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/user/', {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       })
  //       console.log(response.data)
  //       dispatch(login(response.data))

  //     } catch (error) {
  //       console.log(`Error: ${error.message}`)
  //     }
  //   }
  //   fetchUser();
  // }, [])

  return (
    <>
      <Outlet/>
    </>
  )
}

export default Layout


