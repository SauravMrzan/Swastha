import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Signup.css';
const Signup = ({setToken}) =>{
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [signEmail, setSignEmail] = useState('');
    const [signPasswordVisible, setSignPasswordVisible] = useState(false);
    const [signPassword, setSignPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [logEmail, setLogEmail] = useState('');
    const [logPassword,setLogPassword] = useState('');

    const toggleForm = () => {
        setIsLogin(prevState => !prevState);
    };

    const togglePasswordVisibility = () => {
        setSignPasswordVisible(prevState => !prevState);
    };
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        const passwordLengthValid = signPassword.length >= 8;
        const containsUpperCase = /[A-Z]/.test(signPassword);
        const containsNumber = /\d/.test(signPassword);
        const containsSpecialChar = /[@$!%*?&#]/.test(signPassword);

        if(!passwordLengthValid){
            setPasswordError('Passwords must have atleast 8 characters.');
            hasError = true;
        }
        else if(!containsNumber || !containsSpecialChar || !containsUpperCase){
            setPasswordError('Password must cointain atleast one uppercase, number and special character.');
            hasError= true;
        }
        else if(signPassword !== confirmPassword){
            setPasswordError('Password doesnt match.');
            hasError = true;
        }
        else{
            setPasswordError('');
        }

        if (phoneNumber.length !== 10){
            setPhoneNumberError('Contact number must be exactly 10 digits');
            hasError = true;
        }
        else{
            setPhoneNumberError('');
        }
        if(hasError) return;
        setIsLoading(true);

        try{
            const response = await fetch('http://localhost:4000/api/auth/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: signEmail,
                    password: signPassword,
                    phone: phoneNumber,
                    address: address,
                }),
            });

            const data = await response.json();
            if (response.ok){
                console.log('Signup Successful:',data);
                navigate('/Land');
            }else{
                console.error('Signup failed:', data.error);
                setErrors({ general: data.error});
            }
        }
        catch(err){
            console.error('Error:',err);
            setErrors({general: 'Something went wrong. Please try again.'});
        }
        finally{
            setIsLoading(false);
        }


       
            

    };
    const handleLoginSubmit = async (e) => {
        
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:logEmail,password:logPassword}),
            });
            const data = await response.json();
            if(response.ok){
                setToken(data.token);
                console.log("Logging in, token recieved:", data.token);
                localStorage.setItem("token", data.token);
                navigate('/Dashboard');
            }
            else{
                console.error('Login failed:',data.error);
                setErrors({general:data.error});
            }
        }
        catch(err){
            console.error('Error:',err);
            setErrors({general: 'Something went wrong. Please try again.'});
        }
        finally{
            setIsLoading(false);
        }
    };


    
    return (
        <div className ="main">
            <input type="checkbox" id="chk" aria-hidden="true"/>
            <div className="signup">
                <form onSubmit={handleSignupSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Signup
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="User Name" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    <input 
                        type="email" 
                        name="signEmail" 
                        placeholder="Email" 
                        required
                        value={signEmail}
                        onChange={(e) => setSignEmail(e.target.value)}/>
                    <input 
                        type="password" 
                        name="signPassword" 
                        placeholder="Password" 
                        required
                        value={signPassword}
                        onChange={(e) => setSignPassword(e.target.value)}/>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        required
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        placeholder="Phone Number" 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <input 
                        type="address" 
                        name="address" 
                        placeholder="Address" 
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}/>
                    {passwordError && <p className="error">{passwordError}</p>}
                    {phoneNumberError && <p className="error">{phoneNumberError}</p>}
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Signing Up...':'Sign Up'}</button>
                </form>
            </div>

            <div className="login">
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="chk" aria-hidden="true">
                        Login
                    </label>
                    <input 
                        type="email" 
                        name="LogEmail" 
                        placeholder="Email" 
                        required
                        value={logEmail}
                        onChange={(e) => setLogEmail(e.target.value)}/>
                    <input 
                        type="password" 
                        name="LogPassword" 
                        placeholder="Password" 
                        required
                        value={logPassword}
                        onChange={(e) => setLogPassword(e.target.value)}/>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
};
export default Signup;