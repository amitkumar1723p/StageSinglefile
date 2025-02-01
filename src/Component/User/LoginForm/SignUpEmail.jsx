import React, { useState } from "react";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateUserOtpAction } from "../../../Action/userAction";
import ScrollToTop from "../../../ScrollToTop";

const SignUpForm = ({ setlogin, setsignup, SignUpData, setSignUpData  , viewState,
  setViewState }) => {
  const dispatch = useDispatch();

  
  // const [SignUpData ,setSignUpData] =useState({email:""})
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(CreateUserOtpAction(SignUpData));
    setViewState({ ...viewState, showLoginAndSignup: false, showOtpVerify: true  });
  };

  return (

     <> 
    <ScrollToTop />
     
     <div className="main-sign-box">
     <div className="signup-form-wrapper-unique">
       <div className="signup-image-section-unique">
         <img src="/img/login-form.png" alt="City Buildings" />
       </div>
       <div className="signup-form-content-unique">
         <div className="login-small-img">
           <img src="/img/login-small-form.png" alt="login img" />
         </div>
         <h2>Sign Up</h2>
         <p className="login-h2-p">
         Welcome to Propertdekho247.com Register Yourself
         </p>
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             placeholder="Enter your Contact Number"
             value={SignUpData?.ContactNumber?.trimStart()  || ""}
             onChange={(e) =>
               setSignUpData({ ...SignUpData, ContactNumber: e.target.value })
             }
             required
           />

           <p>
             You are agreeing to the <Link to="#">Terms of Services</Link> and{" "}
             <Link to="#">Privacy Policy</Link>
           </p>
           <button type="submit" onClick={(()=>{})}>Get Started</button>
           <p>
             Already a member?{" "}
             <span
               className="signup-link-unique"
               onClick={() => {
                 setTimeout(() => {
                   setlogin(true);
                   setsignup(false);
                 }, 0);
               }}
             >
               Login
             </span>
           </p>
         </form>
       </div>
     </div>
   </div> </>
    
  );
};

export default SignUpForm;
