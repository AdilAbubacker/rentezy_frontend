import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import LandlordHeader from '../../components/LandlordHeader/LandlordHeader'
import LandlordSidebar from '../../components/LandlordSidebar/LandlordSidebar'

function LandlordLayout() {
  return (
    <div>
         <div className="admin-home">
            <LandlordHeader/>
            <div className='d-flex justify-content-start'>
                <LandlordSidebar />
                <div className='w-100'><Outlet/></div>
            </div>
        </div>
    </div>
  )
}

export default LandlordLayout
