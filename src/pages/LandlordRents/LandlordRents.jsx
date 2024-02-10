import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function LandlordRents() {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8008/api/landlord/rented_properties');
                console.log(response.data)
                setProperties(response.data);
            } catch (error) {
                if (error.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }else{
                    console.log(`Error: ${error.message}`)
                }
            }
        }
        fetchMyProperties()
    }, [])
  return (
    <div className='px-5 mb-5 pb-5 pt-3'>
    <div className='pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between'>
    <h2>Rents</h2>

      <div className='btn-toolbar mb-2 ml-5 pe-5 me-5'>
          <Link to='create' className='btn btn-sm btn-outline-secondary'>Add</Link>
      </div>
    </div>
      <div class="table-responsive small">
          <table class="table table-striped table-sm">
          <thead>
              <tr>
              <th scope="col">id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Status</th> */}
              <th scope="col">Tenant</th>
              </tr>
          </thead>
          <tbody>
              {properties.map(p =>{
                  return(
                      <tr key={p.id}>
                          <td>{p.id}</td>
                          <td><img src={p.image} height="180" width="200"/></td>
                          <td>{p.property_name}</td>
                          <td>{p.user}</td>
                          <td>
                              <div className='btn-group mr-2'>
                                  {/* <Link to={`${p.id}/edit`} className='btn btn-sm btn-outline-secondary'>Edit</Link> */}
                                  <Link to={`${p.id}`} className='btn btn-sm btn-outline-secondary'>Payment Details</Link>
                                  </div>
                          </td>
                      </tr>
                  )
              })}
             
          </tbody>
          </table>
      </div>
  </div>
  )
}

export default LandlordRents
