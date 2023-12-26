import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import axios from "axios";


export default function Home() {
    const [properties, setProperties] = useState([])
    const [searchQuery, useSearchQuery] = useState('')

    const navigate = useNavigate()

    // useEffect(() => {
    //     (
    //         async () => {
    //             const response = await fetch('http://127.0.0.1:8004/api/properties');

    //             const data = await response.json();

    //             setProperties(data);
    //         }
    //     )();
    // }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8004/api/properties');
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
        fetchProperties();
    }, []);

    const submitSearch = async (e) => {
        e.preventDefault();

        navigate(`/properties?search=${searchQuery}`);
    }

    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Download Now
                            <span className="hidden sm:block text-4xl">Lorem Ipsum</span>
                        </h2>

                        <div class="container mt-4">
                        <form onSubmit={submitSearch} class="input-group">
                            <input 
                                type="search"
                                value={searchQuery}
                                class="form-control rounded"
                                placeholder="Search" 
                                aria-label="Search" 
                                aria-describedby="search-addon"
                                onChange={(e) => useSearchQuery(e.target.value)}
                                />
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-outline-primary" data-mdb-ripple-init>Search</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>


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
                                                <Link to={`properties/${p.id}/details`} className='btn btn-sm btn-outline-secondary'>View</Link>
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


                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                    <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="image1" />
                </div>

            </div>

            <div className="grid  place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Lorem Ipsum Yojo</h1>
        </div>
        
           
          
            // <div className="hero">
            //   <div className="container">
            //     <div className="row align-items-center">
            //       <div className="col-lg-7">
            //         <div className="intro-wrap">
            //           <h1 className="mb-5"><span className="d-block">Let's Enjoy Your</span> Trip In <span className="typed-words"></span></h1>
          
            //           <div className="row">
            //             <div className="col-12">
            //               <form className="form">
            //                 <div className="row mb-2">
            //                   <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
            //                     <select name="" id="" className="form-control custom-select">
            //                       <option value="">Destination</option>
            //                       <option value="Peru">Peru</option>
            //                       <option value="Japan">Japan</option>
            //                       <option value="Thailand">Thailand</option>
            //                       <option value="Brazil">Brazil</option>
            //                       <option value="United States">United States</option>
            //                       <option value="Israel">Israel</option>
            //                       <option value="China">China</option>
            //                       <option value="Russia">Russia</option>
            //                     </select>
            //                   </div>
            //                   <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-5">
            //                     <input type="text" className="form-control" name="daterange" />
            //                   </div>
            //                   <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
            //                     <input type="text" className="form-control" placeholder="# of People" />
            //                   </div>
            //                 </div>
            //                 <div className="row align-items-center">
            //                   <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
            //                     <input type="submit" className="btn btn-primary btn-block" value="Search" />
            //                   </div>
            //                   <div className="col-lg-8">
            //                     <label className="control control--checkbox mt-3">
            //                       <span className="caption">Save this search</span>
            //                       <input type="checkbox" defaultChecked />
            //                       <div className="control__indicator"></div>
            //                     </label>
            //                   </div>
            //                 </div>
            //               </form>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="col-lg-5">
            //         <div className="slides">
            //           <img src="images/hero-slider-1.jpg" alt="Image" className="img-fluid active" />
            //           <img src="images/hero-slider-2.jpg" alt="Image" className="img-fluid" />
            //           <img src="images/hero-slider-3.jpg" alt="Image" className="img-fluid" />
            //           <img src="images/hero-slider-4.jpg" alt="Image" className="img-fluid" />
            //           <img src="images/hero-slider-5.jpg" alt="Image" className="img-fluid" />
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>          
        
    );
}

