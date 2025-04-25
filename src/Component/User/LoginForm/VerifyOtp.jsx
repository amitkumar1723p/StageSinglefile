import React, { useEffect, useState } from "react";
import "./VerifyOtp.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateUserOtpAction,
  VerifyUserOtpAction,
} from "../../../Action/userAction";
import ScrollToTop from "../../../ScrollToTop";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";

const VerifyOtp = ({
  SignUpData,
  OtpData,
  setOtpData,
  setViewState,
  ISNRI,
}) => {
  const dispatch = useDispatch();
  const [showEdit, setshowEdit] = useState(false);
  const [otpError, setOtpError] = useState(' ');
  const [shake, setShake] = useState(false);
  const [inputShake, setInputShake] = useState(false);
  const [inputOtp, setInutOtp] = useState('');
 
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const OtpDataObj = {
      Otp:inputOtp,
    };
    if(inputOtp.length != 6){
      // console.log(inputOtp)
      if(inputOtp.length == 0){
        setOtpError("Enter Your OTP")
        setInputShake(true);
        // setShake(true);
        setTimeout(()=>setInputShake(false),1000);
        // setTimeout(()=>setShake(false),1000)
        setTimeout(()=>setOtpError(' '),1000);
      }else{
        setOtpError("Otp should be 6 digit long")
        setInputShake(true);
        setShake(true);
        setTimeout(()=>setInputShake(false),1500);
        setTimeout(()=>setShake(false),1500)
        setTimeout(()=>setOtpError(' '),1500);
      }
    }else{
     
      if (ISNRI) {
        OtpDataObj.email = SignUpData.email;
      } else {
        OtpDataObj.ContactNumber = SignUpData.ContactNumber;
      }
      
      dispatch(VerifyUserOtpAction(OtpDataObj));
    }
  
  };
 
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 1000);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Decrease by 1 second (1000ms)
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Otp validation
  // const handleOtpError = ()=>{
  //   if(OtpData.Otp.length != 6){
  //     if(OtpData.Otp.length == 0){
  //       setOtpError("Enter Your OTP")
  //       setInputShake(true);
  //       // setShake(true);
  //       setTimeout(()=>setInputShake(false),1000);
  //       // setTimeout(()=>setShake(false),1000)
  //       setTimeout(()=>setOtpError(' '),1000);
  //     }else{
  //       setOtpError("Otp should be 6 digit long")
  //       setInputShake(true);
  //       setShake(true);
  //       setTimeout(()=>setInputShake(false),1500);
  //       setTimeout(()=>setShake(false),1500)
  //       setTimeout(()=>setOtpError(' '),1500);
  //     }
  //   }else{
      
  //   }
  //   return;
  // }

  const { data: AlertData, LodingType: AlertType } = useSelector((state) => {
    return state.userData;
  });

  useEffect(() => {
    
    if (AlertData?.success == false && AlertType == "VerifyUserOtpRequest") {
      setOtpError(AlertData?.message)
      setInputShake(true);
      setShake(true);
      setTimeout(()=>setInputShake(false),1500);
      setTimeout(()=>setShake(false),1500)
      setTimeout(()=>setOtpError(' '),1500);
    }
  }, [AlertData]);

  return (
    <div>
      <ScrollToTop />
      <div className='login-main-parent'>
      <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/logi-page-blue-svg.svg" alt="" className="blue-login-top-right" />

       <div className='login-form-container'>
       

       <div className='login-page-form'>
       <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/login-page.gif" alt="" className='login-page-gif'/>
       <p className='login-form-login'>Verify OTP to Continue</p>
            <p className="otp-login-h2-p">
              {/* We have sent you a message with a 6-digit verification code OTP on
              your registered Phone Number: */}
               Enter 6 Digit OTP Sent to{" "}
              <span className="ediit-phone-post-verify">
                <b>
                  {" "}
                  {ISNRI ? SignUpData?.email : SignUpData?.ContactNumber} .
                </b>
                <img
                      loading="lazy"
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/edit.png"
                  alt="edit"
                  onClick={() => {
                    setViewState({
                      ...setViewState,
                      showLoginAndSignup: true,
                    });
                  }}
                />{" "}
              </span>
              {/* Please enter it to verify your account */}
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              {/* <input
                className={`otp-section ${shake ? 'shake' : ''} ${inputShake? 'inputShake' : ''}`}
                type="text"
                placeholder="Enter your OTP"
                value={OtpData.Otp.trimStart()}
                onChange={(e) =>
                  setOtpData({ ...OtpData, Otp: e.target.value })
                }
              /> */}
                <div  className="phone-input-container">
                  <div>
                  <OTPInput
                  containerStyle={"otp-field-container"}
                  value={inputOtp}
                  onChange={setInutOtp}
                  numInputs={6}
                  inputType="number"
                  shouldAutoFocus={true}
                  renderInput={(props) => (
                    <input 
                      {...props} 
                      className={`otp-input-tag ${inputShake ? 'shake' : ''}`} 
                      placeholder="_" 
                    />
                  )}
                />
                  </div>
              
                {/* {otpError && <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{otpError}</p>} */}
              </div>
              <div className="">{otpError && <p style={{color: 'red', fontSize: '12px' }}>{otpError}</p>}</div>

              <button className="otp-form-button" type="submit" >
                  Verify OTP <FaArrowRightLong />
              </button>
              <div>
                <p className="login-form-t-c-p">Did not receive the code ?</p>
               <div className='resend-otp-parent'>
                            <button 
                              className={`${timeLeft > 0 ? "resend-otp-button-disable" : "resend-otp-button"}`}
                              onClick={() => {
                                setOtpData({ Otp: "" });
                                // setViewState({
                                //   ...setViewState,
                                //   showLoginAndSignup: true,
                                // });
        
                                dispatch(CreateUserOtpAction(SignUpData));
                                setTimeLeft(3 * 60 * 1000);
                              }}
                              disabled={timeLeft > 0}
                            >
                              Resend OTP <RxCountdownTimer />
                            </button>
                            <p className='otp-time-left'>{formatTime(timeLeft)}</p>
                          </div>
              </div>
            </form>
          </div>

       
          
      </div>

      <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/logi-page-blue-svg.svg" alt="" className='login-page-blue-svg'/>

    </div>
    </div>
  );
};

export default VerifyOtp;
