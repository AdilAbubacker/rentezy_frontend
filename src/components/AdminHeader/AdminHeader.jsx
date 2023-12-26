import React from 'react'
import './AdminHeader.css'
import { RiMenu2Fill } from 'react-icons/ri'

function AdminHeader() {
  return (
    <div className="admin-header">
    <div className='d-flex align-items-center' style={{ gap: "10px" }}>

      <RiMenu2Fill 
    // {/* //   onClick={props.handleClick} */}
       className={"sideBtn"} /> 
      <div className="admin-header-item sec-1" style={{ marginTop: "10px" }}>
      <img
      //  src={logo}
        alt="" style={{ width: '180px', height: 'auto', overflow:'hidden' }} />
        
      </div>
        <h5>Admin Panel</h5>
    </div>
    <div className="admin-header-item">
    
      <div className="profile-dropdown">

        {/* <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <Avatar alt="Admin" src={avatar} sx={{ width: 32, height: 32 }} />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ background: 'black'}}>
            <Dropdown.Item href="#" 
            // onClick={handleLogout}
             style={{color:'white',background: 'black'}} >Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </div>

  </div>
  )
}

export default AdminHeader
