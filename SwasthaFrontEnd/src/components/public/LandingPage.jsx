import React from 'react';
import '../css/LandingPage.css'; // Make sure to create this CSS file

const LandingPage = () => {
  return (
    <div className="wrapper">
      <div className="navbar">
        <img src="./assets/BhatbhateyLogo.png" alt="Bhatbhatey Logo" className="logo" />
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">How it works</a></li>
          <li><a href="#">Terms and Conditions</a></li>
        </ul>
        <div>
          <a href="#" className="loginbtn">Log in</a>
        </div>
        <div> </div>
      </div>
      <div className="body">
        <div className="content">
          <h1 className="animation">Welcome!<br />Vroom Vroom</h1>
          <p className="animation">
            'Bhatbhatey' is more than just a bike rental platform; it is a community for travel and e-bike enthusiasts.
            It simplifies input of data and enhances effectiveness. Customers have the option to use fashionable electric
            bicycles with zero emissions for an unlimited number of hours within the realm of urban transportation.
            The user-friendly interface allows for quickly locating and renting a bike. 'Bhatbhatey' accommodates all types of riders,
            from everyday commuters to weekend adventurers, by offering adaptable rental choices and transparent pricing, guaranteeing
            a positive experience for all.
          </p>
          <a href="#" className="signupbtn animation">Book Now</a>
        </div>
        <img src="" alt="" className="img animation" />
      </div>
    </div>
  );
};

export default LandingPage;