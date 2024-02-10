import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import axiosInstance from '../../api/axios';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
          const res = await axiosInstance.post("/api/login/",
           {
            email, 
            password
          }
           );
          console.log(res.data);
          dispatch(login(res.data))
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };
    

  return (
    <div>
      <div className="flex justify-center py-20 rounded-xl shadow-xl">
      <form className="rounded-xl shadow-md p-9 " onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="text-center font-bold">Sign In</h3>
          <div className="form-group mt-3">
            <input className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none" 
              placeholder="Enter email" 
              name='Email'  
              type='text' 
              value={email}
              required 
              onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="form-group mt-3">
            <input name='password' 
              type="password"     
              className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
              />
          </div>
          <div className="flex justify-center">
            <button type="submit" 
              className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-5 hover:bg-orange-600 transition ease-in-out duration-300">Submit</button>
          </div>
      </div>
    </form>
  </div>
 </div>
  )
}

export default Login
