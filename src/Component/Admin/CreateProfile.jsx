import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

import { CreateOtp_Admin_Owner_Action } from "../../Action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { GetMeDetailsAction } from "../../Action/userAction";

export default function CreateProfile() {
  const { loading, data } = useSelector((state) => {
    return state.userData;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const [Create_Admin_Ownerprofile, setCreate_Admin_Ownerprofile] = useState({
    Name: "",
    Otp: "",
    ContactNumber: "",
   
  });
  const [showOtpField, setshowOtpField] = useState(false);

  const params = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
     
    if (!showOtpField) {
      const { Name, ContactNumber } = Create_Admin_Ownerprofile;
      const userData = { Name, ContactNumber,  };
      dispatch(CreateOtp_Admin_Owner_Action({ userData }));
    }
    if (showOtpField) {
      const { Otp, ContactNumber } = Create_Admin_Ownerprofile;
      const Role = params.Role.charAt(0).toUpperCase() + params.Role.slice(1).toLowerCase() 
      const userData = { Otp, ContactNumber , Role: Role};

      dispatch(CreateOtp_Admin_Owner_Action({ userData }));
    }
  };

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
      if (data.AdminProfileCreateOtp === true) {
        setshowOtpField(true);
      }
      if (data.ProfileCreateVerifyOtp === true) {
        setCreate_Admin_Ownerprofile({
          Name: "",
          Otp: "",
          ContactNumber: "",
        });

        if (data.admin_owner.Role === "Owner") {
          dispatch(GetMeDetailsAction());
        }
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
              src="/img/Krisumi-Waterfall-Residences.jpg"
              alt="Skyscrapers"
            />
          </div>
          <div className="signup-form-content-unique">
            <h2>
              {" "}
              {params.Role.charAt(0).toUpperCase() +
                params.Role.slice(1).toLowerCase()}{" "}
              Register
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Name"
                value={Create_Admin_Ownerprofile.Name.trimStart()}
                readOnly={showOtpField}
                onChange={(e) =>
                  setCreate_Admin_Ownerprofile({
                    ...Create_Admin_Ownerprofile,
                    Name: e.target.value,
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Enter your Contact Number"
                readOnly={showOtpField}
                value={Create_Admin_Ownerprofile.ContactNumber}
                onChange={(e) =>
                  setCreate_Admin_Ownerprofile({
                    ...Create_Admin_Ownerprofile,
                    ContactNumber: e.target.value,
                  })
                }
                required
              />

              {showOtpField && (
                <input
                  type="text"
                  placeholder="Enter Otp"
                  value={Create_Admin_Ownerprofile.Otp.trim()}
                  required
                  onChange={(e) =>
                    setCreate_Admin_Ownerprofile({
                      ...Create_Admin_Ownerprofile,
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
