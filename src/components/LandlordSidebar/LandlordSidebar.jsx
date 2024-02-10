import React from 'react'
import { RiFileWarningLine, RiHome2Line, RiHospitalLine, RiRefundLine, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import {BiSolidDashboard} from 'react-icons/bi'
import {BsHospital} from 'react-icons/bs'
import {HiUsers} from 'react-icons/hi2'
import '../AdminSidebar/AdminSidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function LandlordSidebar() {
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
           
            <Link to="bookings">

            <li className={`admin-sideitems`}>

              
              <div className="admin-sideItem">

                <RiHospitalLine className='icon' />
                <span>Bookings</span>
              </div>
            </li>
            </Link>
            <Link to="rent-details">

            <li className={`admin-sideitems `}>

              
              <div className="admin-sideItem">

                <HiUsers className='icon' />
                <span>Rent Details</span>
              </div>
            </li>
            </Link>
               
            <Link to="scheduled-visits">

            <li className={`admin-sideitems`}>

              
              <div className="admin-sideItem">

                <BsHospital className='icon' />
                <span>Scheduled Visits</span>
              </div>
            </li>
            </Link>
            <Link to="chat">
            <li     className='admin-sideitems'
            // className={`admin-sideitems ${page=="dashboard" && 'active'}`}
            >
              
              <div className="admin-sideItem" style={{marginTop:'8px'}}>

                <BiSolidDashboard className='icon' />
                <span>Chat</span>
              </div>
            </li>
              </Link>
              
          </ul>
        </div>
  )
}

export default LandlordSidebar
