import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'

function AdminLayout() {
  return (
    <div>
         <div className="admin-home">
            <AdminHeader/>
            <div className='d-flex justify-content-start'>
                <AdminSidebar />
                <div className='w-100'><Outlet/></div>
            </div>
        </div>
    </div>
  )
}

export default AdminLayout
