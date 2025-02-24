import { useState } from "react";
import React from "react";
import { Suspense } from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Footer from "./components/public/Footer";
// import Navbar from './components/public/Navbar';

const Signup = React.lazy(() => import("./components/public/Signup"));
const Auth = React.lazy(() => import("./components/public/authentication"));
const About = React.lazy(() => import("./components/public/About"));
const AdminDash = React.lazy(() =>
  import("./components/private/AdminDashboard")
);
const Admin = React.lazy(() => import("./components/private/AdminDashboard"));
const Doctors = React.lazy(() => import("./components/private/Doctors"));
const MyAppointments = React.lazy(() =>
  import("./components/private/MyAppointments")
);
const PatientDash = React.lazy(() =>
  import("./components/private/PatientDash")
);
const DoctorDash = React.lazy(() => import("./components/private/DoctorDash"));
const Home = React.lazy(() => import("./components/public/Home"));
const AllDoctors = React.lazy(() => import("./components/public/AllDoctors"));
const Doctor = React.lazy(() => import("./components/private/Doctors"));
const DoctorSignup = React.lazy(() =>
  import("./components/public/DoctorSignup")
);
const Contact = React.lazy(() => import("./components/public/Contact"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Signup />} />
          <Route path="/Doctors/:speciality" element={<Doctors />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/About" element={<About />} />
          <Route path="/MyAppointments" element={<MyAppointments />} />
          <Route path="/PatientDash" element={<PatientDash />} />
          <Route path="/DoctorDash" element={<DoctorDash />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AllDoctors" element={<AllDoctors />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/DocSignup" element={<DoctorSignup />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        {/* <Footer/> */}
      </Suspense>
    </Router>
  );
}
export default App;
