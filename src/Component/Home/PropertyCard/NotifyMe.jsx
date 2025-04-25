import React, { useEffect, useRef, useState } from "react";
import "./NotifyMe.css";
import NotifyForm from "./NotifyForm";
import WindowComponent from "../../WindowComponent";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../CreateContext/CreateContext";
const NotifyMe = () => {
  const [showNotifyForm, setshowNotifyFrom] = useState(false);
  const NotifyMeBtnRef = useRef(null);
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { setRedirectPath, RedirectPath } = useContext(UserContext);

  useEffect(() => {
    if (medata && medata.IsAuthenticated == true) {
      if (sessionStorage.getItem("RedirectPath") == "/home/card") {
        setshowNotifyFrom(true);
        sessionStorage.removeItem("RedirectPath");
        setRedirectPath("");
      }
    }
  }, [medata]);
  
  const location = useLocation();
  return (
    <div>
      <div className="notify-me-container">
        <h3 className="notifyh3"> Oops! No Properties Available Right Now</h3>
        <p>We couldn’t find any properties matching your search criteria.</p>
        <img
          loading="lazy"
          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/propnotfound.png"
          alt="No Properties Illustration"
          className="notify-me-image"
        />
        <div>
          {!["Owner", "Admin"].includes(medata?.user?.Role) && (
            <button
              ref={NotifyMeBtnRef}
              className="notify-me-button"
              onClick={() => {
                if (medata && medata.IsAuthenticated === true) {
                  setshowNotifyFrom(true);
                } else {
                  setRedirectPath(location.pathname);

                  navigate("/login");
                }
              }}
            >
              Notify Me
            </button>
          )}
        </div>

        {showNotifyForm && (
          <WindowComponent
            Component={NotifyForm}
            SetShow={setshowNotifyFrom}
            BtnRef={NotifyMeBtnRef}
          />
        )}
      </div>
    </div>
  );
};

export default NotifyMe;
