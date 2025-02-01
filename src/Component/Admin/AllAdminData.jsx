import React, { useEffect } from "react";
import { GetAllAdminAction, LogoutAction } from "../../Action/userAction";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { VerifyAdminAction } from "../../Action/userAction";
import { useLocation } from "react-router-dom";
export default function AllAdminData() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, loading } = useSelector((state) => {
    return state.AdminData;
  });

  const navigate = useNavigate();
  // const params =useParams()
  const [querry, setquerry] = useSearchParams();

  const { data: AdminVerifyData, loading: AdminVerifyLoading } = useSelector(
    (state) => {
      return state.Post;
    }
  );

  useEffect(() => {
     
    if (querry.get("Role")) {
      dispatch(GetAllAdminAction({ Role: querry.get("Role") }));
    } else if (querry.get("AdminVerify")) {
      dispatch(GetAllAdminAction({ AdminVerify: querry.get("AdminVerify") }));
    } else if (querry.get("AgentVerify")) {
      dispatch(GetAllAdminAction({ AgentVerify: querry.get("AgentVerify") }));
    }
  
    // if (location.pathname == "/admin/data/verify") {
    //   dispatch(GetAllAdminAction({ Keyword: "VerifyAdmin" }));
    // } else if (location.pathname == "/admin/data/unverify") {
    //   dispatch(GetAllAdminAction({ Keyword: "UnVerifyAdmin" }));
    // } else if (location.pathname == "/admin/data/total") {
    //   dispatch(GetAllAdminAction({ Keyword: "TotalAdmin" }));
    // } else if (location.pathname == "/admin/agent/data/total") {
    //   dispatch(GetAllAdminAction({ Keyword: "VerifyAgent" }));
    // } else if (location.pathname == "/admin/data/unverify") {
    //   dispatch(GetAllAdminAction({ Keyword: "UnVerifyAgent" }));
    // } else if (location.pathname == "/admin/data/total") {
    //   dispatch(GetAllAdminAction({ Keyword: "TotalAgent" }));
    // }

    // else {
    //   dispatch(GetAllAdminAction());
    // }

    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    if (AdminVerifyData) {
      if (AdminVerifyData.success === true) {
        if (querry.get("Role")) {
          dispatch(GetAllAdminAction({ Role: querry.get("Role") }));
        } else if (querry.get("AdminVerify")) {
          dispatch(GetAllAdminAction({ AdminVerify: querry.get("AdminVerify") }));
        } else if (querry.get("AgentVerify")) {
          dispatch(GetAllAdminAction({ AgentVerify: querry.get("AgentVerify") }));
        }

        // else {
        //   dispatch(GetAllAdminAction());
        // }
      }
    }
    // eslint-disable-next-line
  }, [AdminVerifyData]);

  return (
    <>
     
      {loading || AdminVerifyLoading ? (
        <Loader className="windowloader" />
      ) : (
        <>
          {data &&
            data.success &&
            data.Admin.map((admin, index) => {
              return (
                <div key={index} className="admin-data-card">
                  <p>Name - {admin.Name}</p>
                  <p>Role - {admin.Role}</p>
                  {admin.Role=="Admin" && <>
                  <p> Status - {admin.AdminVerify==true && "Verify"}  {admin.AdminVerify==false && "UnVerify"}</p>
 

                  {admin.AdminVerify && (
                    <button
                      onClick={() => {
                        let userdata = { AdminVerify: false };
                        let UserId = admin._id;
                        let Confrimbox = window.confirm(
                          "Are you Unverify This user"
                        );
                        if (Confrimbox === true) {
                          dispatch(VerifyAdminAction({ userdata }, UserId));
                        }
                      }}
                    >
                      Unverify
                    </button>
                  )}
                  {!admin.AdminVerify && (
                    <button
                      onClick={() => {
                        let userdata = { AdminVerify: true };
                        let UserId = admin._id;
                        let Confrimbox = window.confirm(
                          "Are you sure Verify This User"
                        );
                        if (Confrimbox === true) {
                          dispatch(VerifyAdminAction({ userdata }, UserId));
                        }
                      }}
                    >
                      Verify
                    </button>
                  )}

                  </>}
                  {admin.Role=="Agent" && <>
                    <p> Status - {admin.AgentVerify==true && "Verify"}  {admin.AgentVerify==false && "UnVerify"}</p>
                    {admin.AgentVerify && (
                    <button
                      onClick={() => {
                        let userdata = { AgentVerify: false };
                        let UserId = admin._id;
                        let Confrimbox = window.confirm(
                          "Are you sure Unverify This Agent"
                        );
                        if (Confrimbox === true) {
                          dispatch(VerifyAdminAction({ userdata }, UserId));
                        }
                      }}
                    >
                      Unverify
                    </button>
                  )}
                  {!admin.AgentVerify && (
                    <button
                      onClick={() => {
                        let userdata = { AgentVerify: true };
                        let UserId = admin._id;
                        let Confrimbox = window.confirm(
                          "Are you sure Verify This Agent"
                        );
                        if (Confrimbox === true) {
                          dispatch(VerifyAdminAction({ userdata }, UserId));
                        }
                      }}
                    >
                      Verify
                    </button>
                  )}
                  </>}
                  
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
