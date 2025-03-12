import React, { useEffect, useState } from "react";
import "./LoginForm.css";
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

  const loginButton = document.querySelector(".login-continue-login");
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
      <div className="login-form-main">
        <div className="login-wrapper-unique">
          <div className="login-image-section-unique">
            <img
              // src="/img/LoginNri.svg"
              src={ISNRI ? "/img/LoginNri.svg" : "/img/Login.svg"}
              alt="City Buildings"
            />
          </div>
          <div className="login-form-content-unique">
            <h2 className="heading-h2">Login or Register </h2>
            <p className="login-h2-p">
              Welcome to PropertyDekho247 Log in to your account
            </p>
            <form onSubmit={handleSubmit}>
              <label className="lable-login" htmlFor="login-form">
                {/* {ISNRI? } */}

                {ISNRI ? "Email Address" : "Phone Number"}
              </label>
              <input
                className={`border  ${inputShake? 'inputShake' : ''} ${shake ? 'shake' : ''}`}
                id="login-form"
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
              <div className="login-form-alert">{loginError && <p style={{color: 'red', fontSize: '12px' }}>{loginError}</p>}</div>
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
                className="login-continue-login"
                type="submit"
                disabled={loading ? true : false}
              >
                Continue<span> &#8594; </span>
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
        </div>
      </div>
    </>
  );
};

export default LoginForm;
