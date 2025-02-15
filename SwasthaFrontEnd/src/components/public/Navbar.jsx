import React, { useState } from "react";
import {assets} from '../../assets/images'
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const [token,setToken] = useState(true);

    return(
        <div className ='main'>
            <img className='logo' src={assets.Bha} alt=""/>
            <ul className="navs">
                <NavLink to={'/'}>
                    <li className="py-1" >HOME</li>
                    <hr className="hr"/>
                </NavLink>                
            </ul>
            <div className="createBtn">
                {
                    token
                    ?<div>
                        <img className="profilepic" src = {assets.profilepic} alt=""/>
                        <img className="dropdown" src="assets.dropdownicon" alt=""/>
                        <div className="hover">
                            <div className="hoverOptions">
                                <p onClick={()=> navigate('MyProfile')}>My Profile</p>
                                <p onClick={()=> navigate('MyAppointment')}>My Appointments</p>
                                <p onClick={()=> setToken(false)}>Log Out</p>
                            </div>
                        </div>

                    </div>
                    :<button onClick={()=> navigate('/Login')} className="btnCreate">Create Account</button>

                }
                
            </div>
        </div>
    )
};

export default Navbar;