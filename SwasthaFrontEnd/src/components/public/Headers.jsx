import React from "react";

const Headers = () => {
    return(
        <div className="leftright">
            {/* Left side */}
            <div className="leftside">
                <p>
                    Book Appointment <br/> With Trusted Doctors
                </p>
                <div>
                    <img src = {assets.group_profiles} alt=""/>
                    <p> Simply browse throught your extensive list of trusted doctors</p>
                </div>
                <a href =''>
                    Book Appointment  <img src="arrowicon" alt=""/>
                </a>
            </div>
            {/* Right Side */}
            <div>
                <img src = {assets.Headersimg} alt=""/>
            </div>

        </div>
    )
};

export default Headers;