import React, { useEffect, useState } from "react";
import "./VerifyOtp.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyUserOtpAction } from "../../../Action/userAction";
import ScrollToTop from "../../../ScrollToTop";

const VerifyOtp = ({ SignUpData, OtpData, setOtpData, setViewState }) => {
  const dispatch = useDispatch();

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const OtpDataObj = { Otp: OtpData.Otp, ContactNumber: SignUpData.ContactNumber };
    dispatch(VerifyUserOtpAction(OtpDataObj));
  };
  const { loading, userdata } = useSelector((state) => {
    return state.meDetails;
  });
  const [timeLeft, setTimeLeft] = useState(3*60*1000);
      // Math.max(new Date(OtpData.OtpExpire) - Date.now(), 0)

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

  return (
    <>
      <ScrollToTop />
      <div className="login-form-main">
        <div className="login-wrapper-unique">
          <div className="login-image-section-unique">
            <img src="/img/login-form.png" alt="City Buildings" />
          </div>

          <div className="login-form-content-unique">
            <h2 className="heading-h2">Confirm OTP to Continue</h2>
            <p className="login-h2-p">
              We have sent you message with 6 digit verification code (OTP) on
              your registered Contact Number:
            </p>
            {/* <p className="mail-spam">(If you haven't received the OTP in your inbox, please check your spam folder as well.)</p> */}

            <form onSubmit={handleSubmit}>
              <input
                className="otp-section"
                type="text"
                placeholder="Enter your OTP"
                value={OtpData.Otp.trimStart()}
                onChange={(e) =>
                  setOtpData({ ...OtpData, Otp: e.target.value })
                }
                required
              />

              <button className="Continue-otp" type="submit">Continue</button>
              <p>Did not receive the code ?</p>
              <p>
              
                {timeLeft <= 0 && (
                  <button
                  className="resend-otp-btn"
                    onClick={() => {
                      setViewState({
                        ...setViewState,
                        showLoginAndSignup: true,
                      });
                    }}
                  >
                    Resend OTP
                  </button>
                )}
                Resend in {formatTime(timeLeft)}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
