import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProtectedRoute from "./components/Routes/UserProtectedRoute";
import DoctorProtectedRoute from "./components/Routes/DoctorProtectedRoute";
import AdminProtectedRoute from "./components/Routes/AdminProtectedRoute";

const Signup = React.lazy(() => import("./components/public/Signup"));
const About = React.lazy(() => import("./components/public/About"));
const AdminDash = React.lazy(() =>
  import("./components/private/AdminDashboard")
);
const Admin = React.lazy(() => import("./components/private/AdminDashboard"));
const Doctors = React.lazy(() => import("./components/private/Doctors"));
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
const AdminSign = React.lazy(() => import("./components/public/AdminSignup"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Signup />} />
          <Route path="/Doctors/:id" element={<Doctors />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/About" element={<About />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AllDoctors" element={<AllDoctors />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/DocSignup" element={<DoctorSignup />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AdminSign" element={<AdminSign />} />
          {/* Protected Routes */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/PatientDash" element={<PatientDash />} />
          </Route>
          <Route element={<DoctorProtectedRoute />}>
            <Route path="/DoctorDash" element={<DoctorDash />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/AdminDash" element={<AdminDash />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
