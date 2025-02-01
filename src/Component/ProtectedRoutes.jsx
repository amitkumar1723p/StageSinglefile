import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import { GetMeDetailsAction } from "../Action/userAction";
export default function ProtectedRoutes({ Component }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, medata } = useSelector((state) => {
    return state.meDetails;
  });

  // useEffect(()=>{
  //   dispatch(GetMeDetailsAction());
  //  },[location.pathname])

  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  useEffect(() => {
    if (medata) {
      // if (medata.IsAuthenticated == false ||   medata.user?.Role !== "User") {
      if (
        medata.IsAuthenticated == false ||
        ![
          "Buyer",
          "Tenant",
          "PropertyOwner",
          "Channel Partner",
          "NRI",
        ].includes(medata.user?.Role)
      ) {
        navigate("/");
      }
    }

    // eslint-disable-next-line
  }, [medata, navigate]);

  return (
    <>
      {loading ? (
        <Loader className={"windowloader"} />
      ) : (
        <>
          {" "}
          {medata &&
            (medata.IsAuthenticated === false ||
            // (medata.user && medata.user.Role !== "User") ? (
            (medata.user &&
              ![
                "Buyer",
                "Tenant",
                "PropertyOwner",
                "Channel Partner",
                "NRI",
              ].includes(medata.user.Role)) ? (
              <Navigate to={"/"} />
            ) : (
              <Component />
            ))}
        </>
      )}
    </>
  );
}
