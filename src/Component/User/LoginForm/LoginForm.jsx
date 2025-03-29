import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateUserOtpAction } from "../../../Action/userAction";
import ScrollToTop from "../../../ScrollToTop";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useFormState } from "react-dom";

// import { LoginUserAction } from "../../../Action/userAction";

const LoginForm = ({
  setlogin,
  setsignup,
  SignUpData,
  setSignUpData,
  viewState,
  setViewState,
  ISNRI,
}) => {
  //  const [SignUpData, setSignUpData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const location = useLocation();

  
  const [loginError, setloginError] = useState(' ');  // error message that displayed when value is null or wrong
  const [inputShake, setInputShake] = useState(false); // input field shake when value is empty or wrong
  const [shake, setShake] = useState(false);  // input text become red if wrong
  const { data, loading, LodingType } = useSelector((state) => {
    return state.userData;
  });

  const loginButton = document.querySelector(".login-form-button");
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ISNRI) {
      setSignUpData({ ...SignUpData, Role: "NRI" });
      if (!SignUpData.email) {
        setloginError("Email is required")
        setInputShake(true);
        setShake(true);
        setTimeout(() => {setShake(false); setInputShake(false);setloginError('')}, 1000);
        return;
        
      }
    } else {
      if (SignUpData?.ContactNumber?.length !== 10) {
        // console.log(SignUpData?.ContactNumber?.length)
        if(SignUpData?.ContactNumber?.length == 0 || SignUpData?.ContactNumber?.length === undefined){
          setloginError("Enter Phone Number")
          
          setInputShake(true);
          // loginButton.disabled = true;
          setTimeout(()=>setInputShake(false),1000);
          setTimeout(()=>setloginError(''),1000);
          
          return;
        }else{
          setloginError("Enter Correct Phone Number")
          setInputShake(true);
          setShake(true);
          loginButton.disabled = true;
          setTimeout(() => {setShake(false); setInputShake(false);setloginError(''); loginButton.disabled = false}, 1000);
          return;
        }

      }
    }
    dispatch(CreateUserOtpAction(SignUpData));
    setViewState({
      ...viewState,
      showLoginAndSignup: false,
      showOtpVerify: true,
    });
  };

  return (
    <>
      <ScrollToTop />
      <div className="login-main-parent">
        <div className="login-form-container">
         
          <div className="login-page-form">
          <img src="/img/login-page.gif" alt="" className='login-page-gif'/>

            <h2 className="login-form-login">Login or Register </h2>
         
            <form onSubmit={handleSubmit} className="login-form">
              <div className="phone-input-container">
                <div >
                <label className="login-form-lable" htmlFor="Login-phone-number">
                {/* {ISNRI? } */}

                {ISNRI ? "Email Address" : "Phone Number"}
              </label>
              <div className={`login-phone-icon-container  ${inputShake? 'inputShake' : ''} ${shake ? 'shake' : ''}`}>

              <img src={`${ISNRI ?"/img/email-icon.svg" :"/img/new-phone-iocn.svg"}`} alt="" className='login-form-phone'/>
              {/* <img src="" alt="" className="icon"/> */}
              <input
                
                id="Login-phone-number"
                type={ISNRI ? "email" : "text"}
                autoComplete="off"
                // placeholder="Enter your Phone Number"
                placeholder={
                  ISNRI
                    ? " Enter your Email Address"
                    : "Enter your Phone Number"
                }
                value={
                  ISNRI
                    ? SignUpData?.email?.trimStart() || ""
                    : SignUpData?.ContactNumber?.trimStart() || ""
                }
                // value={SignUpData?.ContactNumber?.trimStart() || ""}
                // onChange={(e) =>
                //   setSignUpData({ ...SignUpData, ContactNumber: e.target.value })
                // }
                onChange={(e) => {
                  if (ISNRI) {
                    setSignUpData({
                      ...SignUpData,
                      email: e.target.value,
                    });
                  } else {
                    const numericValue = String(e.target.value).replace(
                      /[^0-9]/g,
                      ""
                    );
                    if (numericValue.length <= 10) {
                      setSignUpData({
                        ...SignUpData,
                        ContactNumber: numericValue,
                      });
                    }
                  }
                }}
                />
              </div>
                </div>
              <div className="">{loginError && <p style={{color: 'red', fontSize: '12px' }}>{loginError}</p>}</div>
              </div>
       
           
              <small className="t-candp-v">
                By clicking you agree{" "}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-t-c-p-v"
                >
                  {" "}
                  Terms and Conditions
                </Link>{" "}
                And{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-t-c-p-v"
                >
                  Privacy Policy
                </Link>
              </small>
              <button
                className="login-form-button"
                type="submit"
                disabled={loading ? true : false}
              >
                Get OTP<span> &#8594; </span>
              </button>
            </form>
            <div className="d-flex gap-1 d-flex align-items-center  nri-main-section center">
              <p className="nri-login-section">
                {ISNRI ? "If you are an Indian User" : "If you are an  NRI, please log in or register."}
              </p>
              
              <NavLink to={ISNRI ? "/login" : "/nri/login"}>
                <span className="nri-click-here"> Click Here </span>
              </NavLink>
            </div>
            {/* <button      onClick={() => {
                 setTimeout(() => {
                   setlogin(false);
                   setsignup(true);
                 }, 0);
               }}>Click</button> */}
          </div>


          <div className='login-right-container-parent'>
           <div className='login-page-right-container'>
               <div className='login-page-logo'>
               <div
              className="logo"
     
            >
              <h2 className="logo-heading-navbar">
                Property <span> Dekho247</span>
              </h2>
            </div>
               </div>
               
                <p className='login-form-right-heading'>Smart Search, Perfect Homes, 
                Just for You.</p>
                <p className='login-page-right-text'>PropertyDekho247 simplifies property buying, selling, and renting with free listings, verified leads, and a fully digital transaction process. Whether you're a homeowner or a seeker, find trusted deals effortlessly with expert insights and a seamless experience.</p>
            </div>
           </div>
        </div>
        <img src="/img/logi-page-blue-svg.svg" alt="" className='login-page-blue-svg'/>
      </div>
    </>
  );
};

export default LoginForm;
