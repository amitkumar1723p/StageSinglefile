import React, { useEffect } from "react";
import { GetAllAdminAction, LogoutAction } from "../../Action/userAction";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css"
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
        <div className="all-admin-agent-data-card-contianer">
          {data &&
            data.success &&
            data.Admin.map((admin, index) => {
              return (
                <div className="all-admin-agent-data-card">
                  <div className="all-admin-agent-data-container">
                    <div className="all-admin-agent-name-logo-container">
                      <div className="all-admin-agent-name-logo">
                        <p>{((admin.Name)[0]).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="all-admin-agent-name-role-container">
                      <div className="all-admin-agent-name">
                        <p>{admin.Name}</p>
                        
                      </div>
                      <div className="all-admin-agent-role">
                        <p>{admin.Role}</p>
                        {admin.Role=="Admin" && <>
                       <p className={`${admin.AdminVerify == true ? "admin-agent-verified":'admin-agent-unverified'}`}>{admin.AdminVerify==true && "Verified"}  {admin.AdminVerify==false && "Un-Verified"}</p>
                       </> }
                       {admin.Role=="Agent" && <>
                       <p className={`${admin.AgentVerify == true ? "admin-agent-verified":'admin-agent-unverified'}`}>{admin.AgentVerify==true && "Verified"}  {admin.AgentVerify==false && "Un-Verified"}</p>
                       </> }

                      </div>
                    </div>
                  </div>
                  <div className="all-admin-agent-info-container">
                    <div className="all-admin-agent-phone-container">
                      <div className="all-admin-agent-phone-logo-container">
                      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
                      </div>
                      <div className="all-admin-agent-phone">
                        <h2>Phone Number</h2>
                        <p>{admin.ContactNumber}</p>
                      </div>

                    </div>
                    <div className="all-admin-agent-verification-status">
                      {admin.Role=="Admin" &&
                       <div className={`all-admin-agent-status-container ${admin.AdminVerify == true ? "all-admin-agent-verified":'all-admin-agent-unverified'} `}>
                        {admin.AdminVerify == true &&
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                        }
                        {admin.AdminVerify == false &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">

  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="12" cy="7" r="4" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="18.5" cy="4.5" r="3.5" fill="#FF6B6B" stroke="white" stroke-width="0.5" />
  <path d="M18.5 3v2" stroke="white" stroke-width="1.5" stroke-linecap="round" />
  <path d="M18.5 6.5v0.1" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                        }
                      </div>
                      }
                      {admin.Role=="Agent" &&
                          <div className={`all-admin-agent-status-container ${admin.AgentVerify == true ? "all-admin-agent-verified":'all-admin-agent-unverified'} `}>
                        {admin.AgentVerify == true &&
                              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                        }
                        {admin.AgentVerify == false &&
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="7" r="4" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <circle cx="18.5" cy="4.5" r="3.5" fill="#FF6B6B" stroke="white" stroke-width="0.5" />
                                                <path d="M18.5 3v2" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M18.5 6.5v0.1" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
                        }
                          </div>
                      }
                      <div className="all-admin-agent-status">
                        <h2>Status</h2>
                        <p> {admin.AdminVerify==true && `Verified ${admin.Role}`}  {admin.AdminVerify==false && "Need Verification"}</p>
                        <p> {admin.AgentVerify==true && `Verified ${admin.Role}`}  {admin.AgentVerify==false && "Need Verification"}</p>
                      </div>
                    </div>
                    <div className="add-admin-agent-button">
                      {admin.Role == "Admin" &&
                      <>
                      {admin.AdminVerify && 
                         <button
                             className="admin-agent-button"
                               onClick={() => {
                                 let userdata = { AdminVerify: false };
                                 let UserId = admin._id;
                                 let Confrimbox = window.confirm(
                                   `You are going to Un-Verify ${admin.Name}, Are You Sure ?`
                                 );
                                 if (Confrimbox === true) {
                                   dispatch(VerifyAdminAction({ userdata }, UserId));
                                 }
                               }}
                             >
                               Click to Un-verify User
                             </button>
                      }{!admin.AdminVerify && 
                        <button 
                    className="admin-agent-button"

                      onClick={() => {
                             let userdata = { AdminVerify: true };
                             let UserId = admin._id;
                             let Confrimbox = window.confirm(     
                               `You are going to Verify ${admin.Name}, Are You Sure ?`
                             );
                             if (Confrimbox === true) {
                               dispatch(VerifyAdminAction({ userdata }, UserId));
                             }
                                }}
                         >
                           Click to Verify User
                    </button>

                      }
                      </>
                      }

                      {admin.Role == "Agent" &&
                      <>
                      {admin.AgentVerify &&
                      <button
                          className="admin-agent-button"
                            onClick={() => {
                              let userdata = { AgentVerify: false };
                              let UserId = admin._id;
                              let Confrimbox = window.confirm(
                                `You are going to Un-Verify ${admin.Name}, Are You Sure ?`
                              );
                              if (Confrimbox === true) {
                                dispatch(VerifyAdminAction({ userdata }, UserId));
                              }
                            }}
                          >
                            Click to Un-verify User
                        </button>
                      }
                      {!admin.AgentVerify && 
                       <button

                           className="admin-agent-button"
       
                             onClick={() => {
                               let userdata = { AgentVerify: true };
                               let UserId = admin._id;
                               let Confrimbox = window.confirm(
                                 `You are going to Verify ${admin.Name}, Are You Sure ?`
                               );
                               if (Confrimbox === true) {
                                 dispatch(VerifyAdminAction({ userdata }, UserId));
                               }
                             }}
                           >
                             Click to Verify User
                           </button>

                      }
                      </>
                      }

                    </div>
                  </div>
                </div>



                // <div key={index} className="all-admin-agent-data-card">
                //   <p>Name - {admin.Name}</p>
                //   <p>Phone - {admin.ContactNumber}</p>

                //   <p>Role - {admin.Role}</p>
                //   {admin.Role=="Admin" && <>
                //   <p> Status - {admin.AdminVerify==true && "Verify"}  {admin.AdminVerify==false && "UnVerify"}</p>
 

                //   {admin.AdminVerify && (
                //     <button
                //     className="agent-verifed-btn"
                //       onClick={() => {
                //         let userdata = { AdminVerify: false };
                //         let UserId = admin._id;
                //         let Confrimbox = window.confirm(
                //           "Are you Unverify This user"
                //         );
                //         if (Confrimbox === true) {
                //           dispatch(VerifyAdminAction({ userdata }, UserId));
                //         }
                //       }}
                //     >
                //       Unverify
                //     </button>
                //   )}
                //   {!admin.AdminVerify && (
                //     <button 
                //     className="agent-verifed-btn"

                //       onClick={() => {
                //         let userdata = { AdminVerify: true };
                //         let UserId = admin._id;
                //         let Confrimbox = window.confirm(
                //           "Are you sure Verify This User"
                //         );
                //         if (Confrimbox === true) {
                //           dispatch(VerifyAdminAction({ userdata }, UserId));
                //         }
                //       }}
                //     >
                //       Verify
                //     </button>
                //   )}

                //   </>}
                //   {admin.Role=="Agent" && <>
                //     <p> Status - {admin.AgentVerify==true && "Verify"}  {admin.AgentVerify==false && "UnVerify"}</p>
                //     {admin.AgentVerify && (
                //     <button

                //     className="agent-verifed-btn"

                //       onClick={() => {
                //         let userdata = { AgentVerify: false };
                //         let UserId = admin._id;
                //         let Confrimbox = window.confirm(
                //           "Are you sure Unverify This Agent"
                //         );
                //         if (Confrimbox === true) {
                //           dispatch(VerifyAdminAction({ userdata }, UserId));
                //         }
                //       }}
                //     >
                //       Unverify
                //     </button>
                //   )}
                //   {!admin.AgentVerify && (
                //     <button

                //     className="agent-verifed-btn"

                //       onClick={() => {
                //         let userdata = { AgentVerify: true };
                //         let UserId = admin._id;
                //         let Confrimbox = window.confirm(
                //           "Are you sure Verify This Agent"
                //         );
                //         if (Confrimbox === true) {
                //           dispatch(VerifyAdminAction({ userdata }, UserId));
                //         }
                //       }}
                //     >
                //       Verify
                //     </button>
                //   )}
                //   </>}
                  
                // </div>
              );
            })}
        </div>
      )}
    </>
  );
}
