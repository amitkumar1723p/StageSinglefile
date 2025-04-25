import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

import { Login_Admin_Owner_Action } from "../../Action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { GetMeDetailsAction } from "../../Action/userAction";

export default function Login() {
  const { loading, data } = useSelector((state) => {
    return state.userData;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [Login_Admin_Ownerprofile, setLogin_Admin_Ownerprofile] = useState({
    Otp: "",
    ContactNumber: "",
  });
  const [showOtpField, setshowOtpField] = useState(false);
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOtpField) {
      const { ContactNumber } = Login_Admin_Ownerprofile;
      const userData = { ContactNumber };
      dispatch(Login_Admin_Owner_Action({ userData }));
    }
    if (showOtpField) {
      const { ContactNumber, Otp } = Login_Admin_Ownerprofile;

      const userData = { ContactNumber, Otp };

      dispatch(Login_Admin_Owner_Action({ userData }));
    }
  };
  console.log(medata);
  useEffect(() => {
    if (medata) {
      if (medata.IsAuthenticated === true) {
        navigate("/admin/dashboard");
      }
    }
    // eslint-disable-next-line
  }, [medata]);

  useEffect(() => {
    if (data) {
      if (data.LoginAdminOwnerOtp === true) {
        setshowOtpField(true);
      }
      if (data.AdminOwnerLoginVerifyOtp === true) {
        setLogin_Admin_Ownerprofile({ Otp: "", ContactNumber: "" });
        dispatch(GetMeDetailsAction());
      }
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (!params.Role || !["admin", "agent"].includes(params.Role)) {
      navigate("/");
    }
  }, [params]);
  return (
    <>
      {loading ? (
        <Loader className="componentloader" />
      ) : (
        <div className="signup-form-wrapper-unique">
          <div className="signup-image-section-unique">
            <img
            loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Krisumi-Waterfall-Residences.jpg"
              alt="Skyscrapers"
            />
          </div>
          <div className="signup-form-content-unique">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your ContactNumber"
                readOnly={showOtpField}
                value={Login_Admin_Ownerprofile.ContactNumber}
                onChange={(e) =>
                  setLogin_Admin_Ownerprofile({
                    ...Login_Admin_Ownerprofile,
                    ContactNumber: e.target.value,
                  })
                }
                required
              />
              {showOtpField && (
                <input
                  type="text"
                  placeholder="Enter Otp"
                  value={Login_Admin_Ownerprofile.Otp.trim()}
                  onChange={(e) =>
                    setLogin_Admin_Ownerprofile({
                      ...Login_Admin_Ownerprofile,
                      Otp: e.target.value,
                    })
                  }
                />
              )}

              <p>
                You are agreeing to the <Link to="#">Terms of Services</Link>{" "}
                and <Link to="#">Privacy Policy</Link>
              </p>
              <button type="submit">Submit</button>
              {/* <p>
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
          </p> */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
