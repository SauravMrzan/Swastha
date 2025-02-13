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

const Signup = React.lazy(()=> import("./components/public/Signup"));
const LandingPage= React.lazy(()=> import("./components/public/LandingPage"));
const AdminDashboard= React.lazy(()=> import("./components/private/AdminDashboard"));


function App(){
  return(
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/Signup" />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path='/Login' element={<Signup/>}/>
          <Route path="/Land" element={<LandingPage />} />
          <Route path="/Admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;