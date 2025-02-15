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
                    ?<div></div>
                    :<button onClick={()=> Navigate('/Login')} className="btnCreate"></button>

                }
                
            </div>
        </div>
    )
};

export default Navbar;