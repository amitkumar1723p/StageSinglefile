import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpEmail";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GetMeDetailsAction } from "../../../Action/userAction";
import Loader from "../../Loader/Loader";

import VerifyOtp from "./VerifyOtp";

import CreateProfile from "./CreateProfile";
import { UserContext } from "../../CreateContext/CreateContext";
// import { LoginContext } from "./LoginForm";
export default function UserForm() {
  const [login, setlogin] = useState(true);
  const [signup, setsignup] = useState(false);

  const [SignUpData, setSignUpData] = useState({
    // ContactNumber: "",
  });
  const [OtpData, setOtpData] = useState({ Otp: "" });
  const [CreateProfileData, setCreateProfileData] = useState({});
  const [viewState, setViewState] = useState({
    showLoginAndSignup: true,
    showOtpVerify: false,
    showCreateProfileSection: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // get login and signup data from redux  store
  const { setRedirectPath, RedirectPath } = useContext(UserContext);
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata, loading } = useSelector((state) => {
    return state.meDetails;
  });

  const [URlVisit, setUrlVisit] = useState(true);
  const ISNRI = location.pathname == "/nri/login";
  useEffect(() => {
    if (medata) {
    }
  }, [medata]);

  useEffect(() => {
    if (data) {
      const {
        UserProfileCreateOtp,
        CreateUserProfileVerifyOtp,
        UserCompleteProfile,
        LoginVerifyOtp,
      } = data;

      if (UserProfileCreateOtp == true) {
        setViewState({
          ...viewState,
          showLoginAndSignup: false,
          showOtpVerify: true,
        });
        // setOtpData({ ...OtpData, OtpExpire: data.OtpExpire });
        setOtpData({ ...OtpData });
      }

      if (CreateUserProfileVerifyOtp == true) {
        setViewState({
          ...viewState,
          showLoginAndSignup: false,
          showOtpVerify: false,
          showCreateProfileSection: true,
        });
        setOtpData({ Otp: "" });
      }

      if (UserCompleteProfile == true || LoginVerifyOtp == true) {
        dispatch(GetMeDetailsAction());
        setSignUpData({
          ContactNumber: "",
        });
        setCreateProfileData({
          Name: "",
          Role: "",
          ContactNumber: "",
        });
        setUrlVisit(false);
      }

      if (data.success == false && LodingType === "CreateUserOtpRequest") {
        setViewState({
          ...viewState,
          showLoginAndSignup: true,
          showOtpVerify: false,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    setUrlVisit(true);
  }, []);
  if (medata.IsAuthenticated == true) {
    if (RedirectPath == "/user/post") {
      navigate("/user/post");
    } else if (RedirectPath == "/home/card") {
      navigate(-1);
    } else if (RedirectPath == "/show-offerForm") {
      navigate(-1);
    } else if (RedirectPath == "/show-scheduleVisit") {
      navigate(-1);
    } else if (RedirectPath == "/view-owner-details") {
      navigate(-1);
    } else if (RedirectPath == "/post-requirement") {
      navigate(-1);
    } else if (RedirectPath == "/show-Supspicious-Listing-Form") {
      navigate(-1);
    } else {
      if (medata?.user?.Role === "Property Owner") {
        navigate("/user/my-listing");
      } else {
        navigate("/");
      }
    }

    if (RedirectPath == "/user/post") {
      sessionStorage.removeItem("RedirectPath");
      setRedirectPath("");
    }
  }

  return (
    <>
      <Helmet>
        <title>Login or Sign Up to Your Account</title>
        <meta
          name="description"
          content="Access your account or create a new one to get started. Manage your property listings, save your favorites, and stay connected with the latest updates on PropertyDekho247.com"
        ></meta>
        <link rel="canonical" href="https://www.propertydekho247.com/login/" />
      </Helmet>
      {URlVisit === true && (
        <>
          {loading == true ? (
            <Loader className="windowloader" />
          ) : medata && medata.IsAuthenticated == true ? (
            <Navigate to="/user/my-listing" />
          ) : (
            <>
              {viewState.showLoginAndSignup && (
                <>
                  {login && (
                    <LoginForm
                      setlogin={setlogin}
                      setsignup={setsignup}
                      SignUpData={SignUpData}
                      setSignUpData={setSignUpData}
                      setViewState={setViewState}
                      viewState={viewState}
                      ISNRI={ISNRI}
                    />
                  )}

                  {signup && (
                    <SignUpForm
                      // Component={SignUpForm}
                      setsignup={setsignup}
                      // BtnRef={SignupBtnRef}
                      setlogin={setlogin}
                      SignUpData={SignUpData}
                      setSignUpData={setSignUpData}
                      setViewState={setViewState}
                      viewState={viewState}
                    />
                  )}
                </>
              )}
              {viewState.showOtpVerify && (
                <VerifyOtp
                  SignUpData={SignUpData}
                  OtpData={OtpData}
                  setOtpData={setOtpData}
                  setViewState={setViewState}
                  ISNRI={ISNRI}
                />
              )}
              {viewState.showCreateProfileSection && (
                <CreateProfile
                  SignUpData={SignUpData}
                  CreateProfileData={CreateProfileData}
                  setCreateProfileData={setCreateProfileData}
                  ISNRI={ISNRI}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
