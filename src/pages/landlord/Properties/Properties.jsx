import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/axios';

function Properties() {
    const [properties, setProperties] = useState([])


    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                const response = await axiosInstance.get('/api/properties/');
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


    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/properties/${id}`);
            const propertiesList = properties.filter((property) => property.id !== id) 
            setProperties(propertiesList)
            console.log('Item deleted succefully')
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


  return (
    <div className='px-5 mb-5 pb-5 pt-3'>
    <div className='pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between'>
    <h2>My properties</h2>

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
              <th scope="col">Address</th>
              <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              {properties.map(p =>{
                  return(
                      <tr key={p.id}>
                          <td>{p.id}</td>
                          <td><img src={p.image} height="180"/></td>
                          <td>{p.name}</td>
                          <td>{p.address}, {p.city}, {p.state}</td>
                          <td>
                              <div className='btn-group mr-2'>
                                  <Link to={`${p.id}/edit`} className='btn btn-sm btn-outline-secondary'>Edit</Link>
                                  <a className='btn btn-sm btn-outline-secondary'
                                  onClick={() => handleDelete(p.id)}
                                  >Delete</a>
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

export default Properties
