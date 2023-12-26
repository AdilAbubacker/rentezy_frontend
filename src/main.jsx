import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, 
         createRoutesFromElements, 
         RouterProvider,
         Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import NewHome from './components/NewHome/NewHome.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Github from './components/Github/Github.jsx'
import store from './store/Store.jsx'
import Login from './components/Login/Login.jsx'
import LandlordRoute from './routes/LandlordRoute/LandlordRoute.jsx'
import RequireAuth from './routes/RequireAuth/RequireAuth.jsx'
import Properties from './pages/landlord/Properties/Properties.jsx'
import CreateProperty from './pages/landlord/CreateProperty.jsx/CreateProperty.jsx'
import LandlordLanding from './pages/landlord/LandlordLanding/LandlordLanding.jsx'
import EditProperty from './pages/landlord/EditProperty/EditProperty.jsx'
import TenantProperties from './components/TenanatProperties/TenantProperties.jsx'
import PropertyDetailsPage from './pages/tenant/PropertyDetailsPage.jsx'
import Register from './components/Register/Register.jsx'
import App from './App.jsx'
import PublicRoute from './routes/PublicRoute/PublicRoute.jsx'
import AdminDasboard from './components/AdminDashboard/AdminDasboard.jsx'
import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx'
import LandlordLayout from './layouts/LandlordLayout/LandlordLayout.jsx'
import MainLayout from './layouts/MainLayout/MainLayout.jsx'
import AdminPropertyReq from './components/AdminPropertyReq/AdminPropertyReq.jsx'
import AdminRoute from './routes/AdminRoute/AdminRoute.jsx'
import AdminHome from './components/AdminHome/AdminHome.jsx'
import AdminProperties from './components/AdminProperties/AdminProperties.jsx'
import AdminTenants from './components/AdminTenants/AdminTenants.jsx'
import Payment from './pages/tenant/Payment/Payment.jsx'
import Chat from './pages/tenant/Chat/Chat.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>

      <Route path='' element={<MainLayout/>}>
        <Route path='search' element={<App/>}/>
        <Route path='new' element={<NewHome/>}/>
        <Route path='' element={<Home/>}/>
        <Route path='payment' element={<Payment/>}/>

        <Route element={<PublicRoute/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>

        <Route path='properties' element={<TenantProperties/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='properties/:id/details' element={<PropertyDetailsPage/>}/>

        <Route element={<RequireAuth/>}>
          <Route path='github' element={<Github/>}/>
        </Route>
      </Route>
      <Route path='chat' element={<Chat/>}/>


      <Route path='landlord/' element={<LandlordLayout/>}>
        <Route element={<LandlordRoute/>}>
          <Route path='' element={<LandlordLanding/>}/>
          <Route path='properties/' element={<Properties/>}/>
          <Route path='properties/create' element={<CreateProperty/>}/>
          <Route path='properties/:id/edit' element={<EditProperty/>}/>
        </Route>
      </Route>

      <Route path='admin/' element={<AdminLayout/>}>
        <Route path='' element={<AdminDasboard/>}/>
        <Route path='property-req/' element={<AdminPropertyReq/>}/>       
        <Route path='properties/' element={<AdminProperties/>}/>       
        <Route path='tenants/' element={<AdminTenants/>}/>       
      </Route>

      <Route path='*' element={<div>Not Found</div>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)