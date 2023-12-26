import React from 'react'
import { RiFileWarningLine, RiHome2Line, RiHospitalLine, RiRefundLine, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {BiSolidDashboard} from 'react-icons/bi'
import {BsHospital} from 'react-icons/bs'
import {HiUsers} from 'react-icons/hi2'
import './AdminSidebar.css'

function AdminSidebar() {
  return (
    <div
    className='admin-sidebar'
    //  className={`admin-sidebar ${clicked && 'open'}`}
     >
          <ul>
              <Link to="/account/admin/">
            <li     className='admin-sideitems'
            // className={`admin-sideitems ${page=="dashboard" && 'active'}`}
            >
              
              <div className="admin-sideItem" style={{marginTop:'8px'}}>

                <BiSolidDashboard className='icon' />
                <span>Dashboard</span>
              </div>
            </li>
              </Link>
              
            
            <Link to="properties">

            <li className={`admin-sideitems`}>

              
              <div className="admin-sideItem">

                <BsHospital className='icon' />
                <span>Properties</span>
              </div>
            </li>
            </Link>
           
            <Link to="property-req">

            <li className={`admin-sideitems`}>

              
              <div className="admin-sideItem">

                <RiHospitalLine className='icon' />
                <span>Property Requests</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/users">

            <li className={`admin-sideitems `}>

              
              <div className="admin-sideItem">

                <HiUsers className='icon' />
                <span>Users</span>
              </div>
            </li>
            </Link>
            

          </ul>

        </div>
  )
}

export default AdminSidebar
