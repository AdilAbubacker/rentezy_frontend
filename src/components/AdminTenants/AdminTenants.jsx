import React, { useEffect, useState } from 'react'

function AdminTenants() {
    const [tenants, setTenants] = useState([])

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await axiosInstance('/api/admin/tenants/');
                setTenants(response.data)
            } catch (error) {
                
            }
        }
        fetchTenants();
    }, [])

  return (
    <div className='px-5 mb-5 pb-5 pt-3'>
    <div className='pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between'>
    <h2>Tenants</h2>

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
              {tenants.map(t =>{
                  return(
                      <tr key={t.id}>
                          <td>{t.id}</td>
                          <td><img src={p.image} height="10" width="10"/></td>
                          <td>{t.name}</td>
                          <td>{t.email}</td>
                          <td>User</td>
                          <td>
                              <div className='btn-group mr-2'>
                                  {/* <Link to={`${p.id}/edit`} className='btn btn-sm btn-outline-secondary'>Edit</Link> */}
                                  <a className='btn btn-sm btn-outline-secondary'
                                //   onClick={() => handleApprove(p.id, p.owner_id)}
                                  >Block</a>
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

export default AdminTenants
