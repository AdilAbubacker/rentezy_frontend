import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

function User() {
  const { userid } = useParams() 
  return (
    <div className='flex'>
      User:{userid}
    </div>
  )
}

export default User
