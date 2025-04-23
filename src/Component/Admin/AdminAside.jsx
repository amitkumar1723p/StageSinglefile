import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./AdminAside.css"; // Import the vanilla CSS file
import { getAllUserAction, getPaidPropertyAction, getTransactionDetailAction } from "../../Action/userAction";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import './AdminAside.css'; // Import the vanilla CSS file
import {
  GetAllNotificationsAndRequirements,
  Admin_OwnerGetAllPostAction,
  GetDeletedPostsAction,
} from "../../Action/postAction";

export default function AdminAside() {
  const dispatch = useDispatch();
  const { medata } = useSelector((state) => state.meDetails);
  const location = useLocation();
  // get all user excepation owner Admin agent
  // const{data:AllUserResponseData}=useSelector((state)=>{
  //   return state.AllUserResponse
  // })
  // this useEffect get All user reponse
  // useEffect(() => {
  //   dispatch(GetAllNotificationsAndRequirements());
  // const{data:AllUserResponseData}=useSelector((state)=>{
  //   return state.AllUserResponse
  // })
  // this useEffect get All user reponse
  useEffect(() => {
    // dispatch(getAllUserAction())
    //have to protect for agent


    if (["Owner"].includes(medata?.user?.Role)) {
      dispatch(GetAllNotificationsAndRequirements());
    }
    if (medata?.user?.Role === "Owner") {

      dispatch(getAllUserAction());
      dispatch(Admin_OwnerGetAllPostAction());
      dispatch(getTransactionDetailAction())
    }
  }, []);


  const { data: adminAlertData, LodingType: AlertType } = useSelector(
    (state) => {
      return state.Post;
    }
  );
  // useEffect(() => {
  //   if (adminAlertData && ["DeletePostRequest"].includes(AlertType)) {
  //     if (adminAlertData.success === true) {
  //       dispatch(GetDeletedPostsAction());
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, [adminAlertData]);

  return (
    <div className="">
      <div className="AdminAside-container">
        <div className="AdminAside-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
