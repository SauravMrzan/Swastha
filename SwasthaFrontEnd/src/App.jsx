import { useState } from 'react'
import React from 'react';
import{ Suspense } from 'react';
import './App.css'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}from "react-router-dom";
import Navbar from './components/public/Navbar';

const Signup = React.lazy(()=> import("./components/public/Signup"));
const LandingPage= React.lazy(()=> import("./components/public/LandingPage"));
const About= React.lazy(()=> import("./components/public/About"));
const AdminDashboard= React.lazy(()=> import("./components/private/AdminDashboard"));
const Doctors= React.lazy(()=> import("./components/private/Doctors"));
const MyAppointments= React.lazy(()=> import("./components/private/MyAppointments"));


function App(){
  return(
    <div className='mx-4 sm:mx-[10%]'>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Login' element={<Signup/>}/>
          <Route path="/Land" element={<LandingPage />} />
          <Route path="/Doctors/:speciality" element={<Doctors />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/About" element={<About />} />
          <Route path="/MyAppointments" element={<MyAppointments />} />
        </Routes>
      </Suspense>
    </Router>
    </div>
  );
}
export default App;