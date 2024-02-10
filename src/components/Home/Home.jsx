import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import LandingPageHeader from '../LandingPageHeader/LandingPageHeader';
import LandingPageCard from '../LandingPageCard/LandingPageCard';
import LandingPageFooter from '../LandingPageFooter/LandingPageFooter';
import { Button } from '../Button/Button';
import { Slider } from '../Slider/Slider';
import { CheckBox } from '../CheckBox/CheckBox';
import { Img } from '../Img/Img';
import { List } from '../List/List';
import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    const landingPageCardPropList = [
        {},
        { image: "images/img_image_1.png" },
        { image: "images/img_image_2.png" },
        { image: "images/img_image_3.png" },
        { image: "images/img_image_4.png" },
        { image: "images/img_image_5.png" },
      ];
      const sliderRef = React.useRef(null);
    const [sliderState, setsliderState] = React.useState(0);

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
  
    
           
          
           
        
    );
}

