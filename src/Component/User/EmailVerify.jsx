import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SentTokenForEmailVerification } from "../../Action/userAction";
import { useLocation } from "react-router-dom";

export default function EmailVerifyComponent() {
  const location = useLocation();
  const { loading, medata } = useSelector((state) => {
    return state.meDetails;
  });
  const origin = window.location.origin; // domain
  const pathname = location.pathname; // current path
  const querry = location.search;

  const [email, setEmail] = useState(medata?.user?.email);
  const dispatch = useDispatch();

  const {
    data: UserAlertData,
    LodingType: UserAlertType,
    loading: UserLoading,
  } = useSelector((state) => {
    return state.userData;
  });
  return (
    <>
      <div>
        <h1> Email Verify</h1>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            disabled={
              UserLoading && UserAlertType == "SentTokenForEmailVerificationRequest"
                ? true
                : false
            }
            onClick={(e) => {
              const Url = `${origin}${pathname}`;
              dispatch(
                SentTokenForEmailVerification({
                  email,
                  Url: { pathname: Url, querry: querry  },
                })
              );
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
