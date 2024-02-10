import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function TenantProperties() {
    const [properties, setProperties] = useState([])
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchData = searchParams.get('search');

    useEffect(() => {
        
        (
            async () => {
                const response = await fetch(`http://127.0.0.1:8004/api/search/${searchData}`);

                const data = await response.json();

                setProperties(data);
            }
        )();
    }, [])
    
  return (
    <div>
       <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">               
               {properties.map(
                   p => {
                       return (
                           <div class="col" key={p.id}>
                               <div class="card shadow-sm">
                               <img src={p.image} height="180"/>
                               <div class="card-body">
                                   <p class="card-text">{p.name}</p>
                                       <div class="d-flex justify-content-between align-items-center">
                                           <div class="btn-group">
                                               <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                           </div>
                                           <small class="text-body-secondary">9 mins</small>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )
                   }
               )}
              
     
           </div>
    </div>
  )
}

export default TenantProperties
