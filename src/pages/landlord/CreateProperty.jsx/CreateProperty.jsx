import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../../api/axios';


function CreateProperty() {
    const navigate = useNavigate()
  const [property, setProperty] = useState({
    name: '',
    bathroom: '',
    room:'',
    city:'',
    address:'',
    state:'',
    pincode:'',
    description:'',
    file:'',
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };


  const handleFileChange = (e) => {
    setProperty({ ...property, file: e.target.files[0] }); 
  };


  const submit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append('name', property.name);
      formdata.append('property_type', 'house');
      formdata.append('description', property.description);
      formdata.append('number_of_rooms', property.room);
      formdata.append('number_of_bathrooms', property.bathroom);
      formdata.append('address', property.address);
      formdata.append('city', property.city);
      formdata.append('state', property.state);
      formdata.append('pincode', property.pincode);
      formdata.append('image', property.file);


      const config =  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      await axiosInstance.post('/api/properties/', formdata , config);

      console.log('Item added successfully');
      navigate('/landlord/properties');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div class="container-fluid pt-4 px-4">
                <div class="row g-4 d-flex justify-content-center">
                    <div class="col-sm-12 col-xl-6 ">
                        <div class="bg-light rounded h-100 p-4">
                            <h6 class="mb-4">Add Product Variant</h6>
                            <form class="login-form"  onSubmit={submit}>


                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_name" 
                                        placeholder="Category Name"
                                        name="name"
                                        Value={property.name}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_name">Name</label>
                                </div>

                                <div class="form-floating mb-3  col-sm-11">
                                    <select class="form-select" id="categorySelect" name="categorySelect"
                                        aria-label="Floating label select example">
                                        <option selected>Open this select menu</option>
                                            <option value='dd'>house</option>
                                            <option value='dd'>room</option>
                                            <option value='dd'>bed</option>
                                    </select>
                                    <label for="categorySelect">Property_type</label>
                                </div>

                
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="id_pagenum" 
                                        placeholder="No of pages"
                                        name="room"
                                        Value={property.room}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_name">No of Rooms</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="id_pagenum"
                                        placeholder="No of pages"
                                        name="bathroom"
                                        Value={property.bathroom}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_name">No of Bathrooms</label>
                                </div>

                                <div class="mb-3">
                                    <label for="id_image" class="form-label">Cover Image</label>
                                    <input type="file" class="form-control" id="id_image" name="image"
                                    onChange={handleFileChange}/>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_title"
                                        placeholder="book title"
                                        name="address"
                                        Value={property.address}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_title">Adress</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_title"
                                        placeholder="book title"
                                        name="city"
                                        Value={property.city}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_title">City</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_title"
                                        placeholder="book title"
                                        name="state"
                                        Value={property.state}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_title">State</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_title"
                                        placeholder="book title"
                                        name="pincode"
                                        Value={property.pincode}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_title">Pincode</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="id_title"
                                        placeholder="book title"
                                        name="description"
                                        Value={property.description}
                                        onChange={handleInputChange}
                                        />
                                    <label for="id_title">Description</label>
                                </div>

                                <button type="submit" class="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default CreateProperty
