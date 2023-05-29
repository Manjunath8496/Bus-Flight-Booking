import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    let username =  useRef();
    let email =  useRef();
    let password =  useRef();
    let confirmPassword =  useRef();
    let phone =  useRef();
    let dob =  useRef();
    let[verified , setverified] = useState(false);
    let navigate = useNavigate();
    
    useEffect(()=>{
        // verify user has authenticated already . if yes redirect to home
        if(localStorage.getItem("userdetails") !== null)
        {
            navigate("/home");
        }
    } , [])


    let verifyEmail = ()=>{
        setTimeout(()=>{
            setverified(true)
        } , 2000)
    }

    let handleSignup = (e)=>{
        // stop auto refresh
        e.preventDefault();

        // validate some values
        if(password.current.value !== confirmPassword.current.value)
        {
            alert("Password missmatch");
            return 
        }
        if( new Date() < new Date(dob.current.value)  )
        {
            alert("invalid dob");
            return
        }


        // create an obj of new user to send 
        let newUser = {
            username: username.current.value ,
            email: email.current.value,
            password: password.current.value,
            phone:phone.current.value,
            dob:dob.current.value
        }

        // post the obj to the db collection
        fetch("http://localhost:4000/users" , {
                                                method : "POST",
                                                headers : {"Content-Type" : "application/json"},
                                                body : JSON.stringify(newUser)
                                            } )
        .then(()=>{
            alert("Account has been created successfully");
            navigate("/login");
        })
    }


    return ( 
        <div className="signup-cont">
            <div className="signup-box">
                <h1>Signup</h1>
                <hr />
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="Username" ref={username} required />
                    <input type="email" placeholder="Email id" ref={email} required/>
                    <input type="password" placeholder="Password" ref={password} required />
                    <input type="text" placeholder="Confirm password" ref={confirmPassword} required />
                    <input type="tel" placeholder="Phone number" maxLength="10" minLength="10" ref={phone} required />
                    <input type="date" ref={dob} required/>
                    <input type="submit" value="Signup"  disabled={ verified===false ? true : false  }  />
                </form>
                <button onClick={verifyEmail}>Verify email</button>
                <span>verify email to submit the form</span>
                <p>Already have an account ? <Link to="/login">Sign in</Link></p>
            </div>
        </div>
     );
}
 
export default Signup;



