import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminHome() {
  return (
    <div>
        <div className="admin-home">
            <AdminHeader/>
            <div className='d-flex justify-content-start'>
                <AdminSidebar />
                <div className=''><Outlet/></div>
            </div>
        </div>
    </div>
  )
}

export default AdminHome
