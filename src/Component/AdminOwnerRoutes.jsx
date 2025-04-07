import React, { useEffect } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import { LogoutAction } from "../Action/userAction";
import { GetMeDetailsAction } from "../Action/userAction";
import { useDispatch, useSelector } from "react-redux";
export default function AdminOwnerRoutes({ Component, isOwner }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, medata } = useSelector((state) => {
    return state.meDetails;
  });

  //  useEffect(()=>{
  //   dispatch(GetMeDetailsAction());
  //  },[location.pathname])
  useEffect(() => {
    if (medata) {
      if (
        medata.IsAuthenticated == false ||
        !["Owner", "Admin", "Agent"].includes(medata.user?.Role)
      ) {
        navigate("/");
      }

      if (medata.user) {
        if (medata.user.Role === "Admin") {
          if (medata.user.AdminVerify == false) {
            navigate("/");
            dispatch(LogoutAction());
          }
        }
        if (medata.user.Role === "Owner") {
          if (medata.user.OwnerVerify == false) {
            navigate("/");
            dispatch(LogoutAction());
          }
        }
        if (medata.user.Role === "Agent") {
          if (medata.user.AgentVerify == false) {
            navigate("/");
            dispatch(LogoutAction());
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [medata, navigate, Component]);

  return (
    <>
      {loading ? (
        <Loader className={"windowloader"} />
      ) : (
        <>
          {medata &&
            (medata.IsAuthenticated == false || // User is not authenticated
            (!isOwner &&!["Admin", "Owner", "Agent"].includes(medata?.user?.Role)) ||
            (medata?.user?.Role === "Admin" &&
              medata?.user?.AdminVerify == false) || // admin is not verify
            (medata?.user?.Role === "Agent" &&
              medata?.user?.AgentVerify == false) ||
            (medata?.user?.Role === "Owner" &&
              medata?.user?.OwnerVerify === false) || // User is not Admin or Owner
            // Owner not verified
            (isOwner && medata?.user?.Role !== "Owner") ||
            (medata?.user?.Role == "Owner" &&
              medata?.user?.OwnerVerify === false) ? ( // isOwner is true but user is not an Owner
              <Navigate to={"/"} />
            ) : (
              <Component />
            ))}
        </>
      )}
    </>
  );
}
