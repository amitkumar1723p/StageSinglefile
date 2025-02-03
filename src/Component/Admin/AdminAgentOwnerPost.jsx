import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_AgentGetAllPostAction,
  Admin_OwnerGetAllPostAction,
  GetAllAssignProperty,
} from "../../Action/postAction";
import Loader from "../Loader/Loader";
import AdminListingCard from "./AdminListingCard";
// import PostCard from "../Post/PostCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./AdminListingCard.css";
import { GetAllAdminAction } from "../../Action/userAction";
import { adminAssigned } from "../../Action/postAction";
import { UserContext } from "../CreateContext/CreateContext";
import OwnerAllPost from "./AllPost";
import AdminAgentAssignPost from "./AdminAgentAssignPost";

export default function AdminAgentOwnerPost() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { loading: loadingGet, data: AdminData } = useSelector((state) => {
    return state.AdminData;
  });

  const [AssignProperty, setAssignProperty] = useState([]);
  const [AssignPropertyAdmin, setAssignPropertyAdmin] = useState(null);
  const [querry, setquerry] = useSearchParams();
  const [SearchPostId, setSearchPostId] = useState("");
  const {
    data: adminAlertData,
    LodingType,
    loading: PostVerifyLoding,
  } = useSelector((state) => {
    return state.Post;
  });

  useEffect(() => {
    if (
      adminAlertData &&
      (LodingType === "VerifyPostActionRequest" ||
        LodingType === "ReOpenPostActionRequest")
    ) {
      // alert("Admin_OwnerGetAllPostAction PostVerify")
      if (adminAlertData.success === true && medata?.user?.Role == "Owner") {
        if (querry.get("PostVerify")) {
          dispatch(
            Admin_OwnerGetAllPostAction({
              PostVerify: querry.get("PostVerify"),
            })
          );
        } else {
          dispatch(Admin_OwnerGetAllPostAction());
        }
      }
      if (adminAlertData.success === true && medata?.user?.Role == "Admin") {
        if (querry.get("PostVerify")) {
          dispatch(
            Admin_AgentGetAllPostAction({
              PostVerify: querry.get("PostVerify"),
            })
          );
        } else {
          dispatch(Admin_AgentGetAllPostAction());
        }
      }
    }

    if (
      adminAlertData &&
      (LodingType === "RemoveAssignPropertyRequest" ||
        LodingType === "Admin_AssignedRequest")
    ) {
      if (adminAlertData.success === true) {
        setAssignProperty([]);
        dispatch(GetAllAssignProperty());
        // if (medata?.user?.Role == "Admin") {
        //   // dispatch(Admin_AgentGetAllPostAction());
        //   if (querry.get("PostVerify")) {
        //     dispatch(
        //       Admin_AgentGetAllPostAction({
        //         PostVerify: querry.get("PostVerify"),
        //       })
        //     );
        //   } else {
        //     dispatch(Admin_AgentGetAllPostAction());
        //   }
        // }
      }
    }

    // eslint-disable-next-line
  }, [adminAlertData]);

  useEffect(() => {
    if (AssignProperty.length <= 0) {
      dispatch({ type: "GetAllAdminClear" });
    }

    if (!AdminData) {
      setAssignPropertyAdmin(null);
    }
  }, [AssignProperty, AdminData]);

  useEffect(() => {
    if (["Admin", "Owner"].includes(medata?.user?.Role)) {
      dispatch(GetAllAssignProperty());
    }
  }, []);
  return (
    <>
      <div className="filter-section-property">
        <div>
          <img src="/img/FilteImg.png" alt="FilteImg" />
        </div>

        <button
          className={` ${!querry.get("PostVerify") ? "select" : ""}`}
          onClick={(e) => {
            navigate("/admin/allpost");
          }}
        >
          <span>All Post</span>
        </button>

        <button
          onClick={(e) => {
            navigate("/admin/allpost?PostVerify=true");
          }}
          className={querry.get("PostVerify") == "true" ? "select" : ""}
          // onClick={handleActive}
          // className={active == true ? "select" : ""}
        >
          Active
        </button>
        <button
          onClick={(e) => {
            navigate("/admin/allpost?PostVerify=false");
          }}
          className={querry.get("PostVerify") == "false" ? "select" : ""}
          // o
          // onClick={handleInactive}
          // className={active == false ? "select" : ""}
        >
          Inactive
        </button>
        {/* <button>Exprired</button>
        <button>Reported</button>
        <button>Success</button> */}
        <div className="relative bg--200">
          <input
            className="controlled-input"
            type="text"
            value={SearchPostId.trimStart()}
            placeholder="Search Here"
            onChange={(e) => {
              let value = e.target.value;
              setSearchPostId(value);
            }}
          />
          <img
          className="absolute top-[5px] right-1 cursor-pointer"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <g clip-path="url(#clip0_3153_291)">
    <path d="M7.42252 0.388672C6.53035 0.388399 5.64687 0.563912 4.82256 0.905183C3.99824 1.24645 3.24924 1.7468 2.61835 2.37762C1.98746 3.00845 1.48704 3.7574 1.14568 4.58168C0.804328 5.40596 0.628725 6.28943 0.628907 7.1816C0.628634 8.07382 0.804169 8.95736 1.14548 9.78172C1.4868 10.6061 1.9872 11.3551 2.6181 11.986C3.249 12.6169 3.99803 13.1173 4.8224 13.4586C5.64676 13.7999 6.5303 13.9755 7.42252 13.9752C9.00791 13.9752 10.4638 13.4137 11.62 12.5041L12.2258 13.1098C12.1014 13.3515 12.0573 13.6266 12.1 13.895C12.1427 14.1635 12.27 14.4113 12.4632 14.6024L15.6437 17.8044C16.1373 18.2987 16.9452 18.2987 17.4395 17.8044L18.0453 17.1986C18.2825 16.9599 18.4156 16.6371 18.4156 16.3007C18.4156 15.9642 18.2825 15.6414 18.0453 15.4027L14.8434 12.2223C14.6511 12.03 14.4018 11.905 14.1326 11.8661C13.8635 11.8271 13.5889 11.8763 13.3501 12.0063L12.7443 11.4005C13.5372 10.3999 14.0321 9.19608 14.1722 7.92709C14.3123 6.6581 14.092 5.37531 13.5365 4.22581C12.9809 3.0763 12.1127 2.10662 11.0313 1.42795C9.94997 0.749275 8.69922 0.389083 7.42252 0.388672ZM7.42252 1.64313C8.89141 1.64313 10.3001 2.22665 11.3388 3.26531C12.3775 4.30397 12.961 5.7127 12.961 7.1816C12.961 8.65049 12.3775 10.0592 11.3388 11.0979C10.3001 12.1365 8.89141 12.7201 7.42252 12.7201C5.95363 12.7201 4.5449 12.1365 3.50624 11.0979C2.46758 10.0592 1.88406 8.65049 1.88406 7.1816C1.88406 5.7127 2.46758 4.30397 3.50624 3.26531C4.5449 2.22665 5.95363 1.64313 7.42252 1.64313ZM3.91737 5.42936C3.54825 6.02751 3.35355 6.71688 3.35521 7.41975C3.35439 7.91719 3.45177 8.40991 3.64175 8.86965C3.83174 9.32938 4.1106 9.7471 4.46235 10.0988C4.81409 10.4506 5.23181 10.7295 5.69155 10.9194C6.15128 11.1094 6.644 11.2068 7.14145 11.206C7.92357 11.2051 8.68645 10.9634 9.32637 10.5137C9.15379 10.5299 8.98046 10.5368 8.80714 10.5344C8.1646 10.5361 7.52807 10.4108 6.93412 10.1656C6.34017 9.92054 5.8005 9.56048 5.34613 9.10617C4.89175 8.65186 4.53162 8.11225 4.28643 7.51833C4.04124 6.92441 3.91582 6.2879 3.91737 5.64536C3.91737 5.57336 3.91391 5.50136 3.91737 5.42936Z" fill="#0078D4"/>
  </g>
  <defs>
    <clipPath id="clip0_3153_291">
      <rect width="18" height="18" fill="white" transform="translate(0.5 0.258789)"/>
    </clipPath>
  </defs>
</svg>
                  `)}`}
            alt=""
          />
        </div>
      </div>

      {/* <div className="filter-section-property">
              <div>
                {" "}
                <img src="/img/FilteImg.png" alt="FilteImg" />
              </div>
              {active !== null ? (
                <div
                 onClick={handleAllPost} 
                 className="ActiveFill">
                  <span>All Post</span>
                </div>
              ) : (
                <div className="ActiveEmpty">
                  <span>All Post</span>
                </div>
              )}
              <button
                onClick={handleActive}
                className={active == true ? "select" : ""}
              >
                Active
              </button>
              <button
                onClick={handleInactive}
                className={active == false ? "select" : ""}
              >
                Inactive
              </button>
              <button>Exprired</button>
              <button>Reported</button>
              <button>Success</button>
              <div>
                <input
                  className="controlled-input"
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                />
                <button onClick={handleSearch} className="searchAdmin">
                  Search
                </button>
              </div>
            </div> */}

      {AssignProperty.length > 0 && (
        <div className="select-section-admin">
          <div>
            {" "}
            <select
              id="cars"
              onChange={(e) => {
                if (e.target.value == "Admin") {
                  dispatch({ type: "GetAllAdminClear" });
                  dispatch(GetAllAdminAction({ AdminVerify: true }));
                } else if (e.target.value == "Agent") {
                  dispatch({ type: "GetAllAdminClear" });
                  dispatch(GetAllAdminAction({ AgentVerify: true }));
                } else {
                  dispatch({ type: "GetAllAdminClear" });
                  // setAssignPropertyAdmin(null);
                }
              }}
              // value={}
              className="selectAssign"
            >
              <option value="">Assign to </option>
              {medata?.user?.Role == "Owner" && (
                <option value={`Admin`}>Admin</option>
              )}

              <option value={`Agent`}>Agent</option>
            </select>
          </div>

          {AdminData && AdminData.success && (
            <select
              className="selectAssign"
              onChange={(e) => {
                let FindAdmin = AdminData.Admin[e.target.value];
                if (FindAdmin) {
                  setAssignPropertyAdmin(FindAdmin);
                } else {
                  setAssignPropertyAdmin(null);
                }
              }}
            >
              <option value="">Select One</option>
              {AdminData.Admin.map((e, i) => {
                return (
                  <option key={i} value={i}>
                    {e.Name}
                  </option>
                );
              })}
            </select>
          )}
          {AssignPropertyAdmin && (
            <button
              className="Assing-Property-btn"
              onClick={() => {
                let confirm = window.confirm(
                  `This Property Assign to ${AssignPropertyAdmin.Name}  Role is ${AssignPropertyAdmin.Role}`
                );
                if (confirm) {
                  const AssignedData = {
                    AdminId: AssignPropertyAdmin._id,
                    AssignedPropertys: AssignProperty,
                  };
                  dispatch(adminAssigned({ AssignedData }));
                }
              }}
            >
              Assing Property
            </button>
          )}

          {/* {} */}
          {/* {selectedRole === "Admin" ? (
                  <p>
                    <select
                      id="adminOptions"
                      className="selectAssign"
                      
                    >
                      <option value="">Select Admin</option>

                      {dataAdmin &&
                        dataAdmin.Admin.map(
                          (item) =>
                            item.AdminVerify === true ? (
                              <option key={item._id} value={`${item._id}`}>
                                {item.Name}
                              </option>
                            ) : null // Render nothing if AdminVerify is false
                        )}
                    </select>
                  </p>
                ) : selectedRole === "Agent" ? (
                  <p>
                    <select id="adminOptions" className="selectAssign">
                      <option value="">Select Agent</option>
                      <option value="agent1">Agent-1</option>
                      <option value="agent2">Agent-2</option>
                    </select>
                  </p>
                ) : null} */}
          {/* end here conditionally render  */}
        </div>
      )}
      <div className="showpost">
        {medata?.user?.Role == "Owner" ? (
          <OwnerAllPost
            setAssignProperty={setAssignProperty}
            AssignProperty={AssignProperty}
            AssignPropertyAdmin={AssignPropertyAdmin}
            setAssignPropertyAdmin={setAssignPropertyAdmin}
            SearchPostId={SearchPostId}
          />
        ) : (
          <AdminAgentAssignPost
            setAssignProperty={setAssignProperty}
            AssignProperty={AssignProperty}
            AssignPropertyAdmin={AssignPropertyAdmin}
            setAssignPropertyAdmin={setAssignPropertyAdmin}
            SearchPostId={SearchPostId}
          />
        )}
      </div>
    </>

    // <div className="showpost">
    //   {data && data.success && data.Post.length > 0 && (
    //     <>
    //       <div className="Admin-property-post-card-main-box">
    //         <p>All Listing</p>
    //         <div className="filter-section-property">
    //           <div>
    //             {" "}
    //             <img src="/img/FilteImg.png" alt="FilteImg" />
    //           </div>
    //           {active !== null ? (
    //             <div onClick={handleAllPost} className="ActiveFill">
    //               <span>All Post</span>
    //             </div>
    //           ) : (
    //             <div className="ActiveEmpty">
    //               <span>All Post</span>
    //             </div>
    //           )}
    //           <button
    //             onClick={handleActive}
    //             className={active == true ? "select" : ""}
    //           >
    //             Active
    //           </button>
    //           <button
    //             onClick={handleInactive}
    //             className={active == false ? "select" : ""}
    //           >
    //             Inactive
    //           </button>
    //           <button>Exprired</button>
    //           <button>Reported</button>
    //           <button>Success</button>
    //           <div>
    //             <input
    //               className="controlled-input"
    //               type="text"
    //               value={inputValue}
    //               onChange={handleChange}
    //             />
    //             <button onClick={handleSearch} className="searchAdmin">
    //               Search
    //             </button>
    //           </div>
    //         </div>
    //         {AssignProperty.length > 0 && (
    //           <div className="select-section-admin">
    //             {medata?.user?.Role === "Owner" && (
    //               <div>
    //                 {" "}
    //                 <select
    //                   id="cars"
    //                   onChange={(e) => {
    //                     if (e.target.value == "Admin") {
    //                       dispatch(GetAllAdminAction({ AdminVerify: true }));
    //                     } else if (e.target.value == "Agent") {
    //                       dispatch(GetAllAdminAction({ AgentVerify: true }));
    //                     } else {
    //                       dispatch({ type: "GetAllAdminClear" });
    //                       // setAssignPropertyAdmin(null);
    //                     }
    //                   }}
    //                   // value={}
    //                   className="selectAssign"
    //                 >
    //                   <option value="">Assign to </option>
    //                   <option value={`Admin`}>Admin</option>

    //                   <option value={`Agent`}>Agent</option>
    //                 </select>
    //               </div>
    //             )}
    //             {AdminData && AdminData.success && (
    //               <select
    //                 onChange={(e) => {
    //                   let FindAdmin = AdminData.Admin[e.target.value];
    //                   if (FindAdmin) {
    //                     setAssignPropertyAdmin(FindAdmin);
    //                   } else {
    //                     setAssignPropertyAdmin(null);
    //                   }
    //                 }}
    //               >
    //                 <option value="">Select One</option>
    //                 {AdminData.Admin.map((e, i) => {
    //                   return (
    //                     <option key={i} value={i}>
    //                       {e.Name}
    //                     </option>
    //                   );
    //                 })}
    //               </select>
    //             )}
    //             {AssignPropertyAdmin && (
    //               <button
    //                 onClick={() => {
    //                   let confirm = window.confirm(
    //                     `This Property Assign to ${AssignPropertyAdmin.Name}  Role is ${AssignPropertyAdmin.Role}`
    //                   );
    //                   if (confirm) {
    //                     const AssignedData = {
    //                       AdminId: AssignPropertyAdmin._id,
    //                       AssignedPropertyId: AssignProperty,
    //                     };
    //                     dispatch(adminAssigned({ AssignedData }));
    //                   }
    //                 }}
    //               >

    //                 Assing Property
    //               </button>
    //             )}

    //             {/* {} */}
    //             {/* {selectedRole === "Admin" ? (
    //               <p>
    //                 <select
    //                   id="adminOptions"
    //                   className="selectAssign"
    //
    //                 >
    //                   <option value="">Select Admin</option>

    //                   {dataAdmin &&
    //                     dataAdmin.Admin.map(
    //                       (item) =>
    //                         item.AdminVerify === true ? (
    //                           <option key={item._id} value={`${item._id}`}>
    //                             {item.Name}
    //                           </option>
    //                         ) : null // Render nothing if AdminVerify is false
    //                     )}
    //                 </select>
    //               </p>
    //             ) : selectedRole === "Agent" ? (
    //               <p>
    //                 <select id="adminOptions" className="selectAssign">
    //                   <option value="">Select Agent</option>
    //                   <option value="agent1">Agent-1</option>
    //                   <option value="agent2">Agent-2</option>
    //                 </select>
    //               </p>
    //             ) : null} */}
    //             {/* end here conditionally render  */}
    //           </div>
    //         )}

    //         {filteredPosts.length > 0 ? (
    //           filteredPosts.length &&
    //           filteredPosts.map((e, i) => {
    //             return (
    //               <AdminListingCard
    //                 key={i}
    //                 index={i}
    //                 PostData={e}
    //                 setAssignProperty={setAssignProperty}
    //                 AssignProperty={AssignProperty}
    //               />
    //             );
    //           })
    //         ) : (
    //           <>
    //             {data.Post.map((e, i) => {
    //               return (
    //                 <AdminListingCard
    //                   key={i}
    //                   index={i}
    //                   PostData={e}
    //                   setAssignProperty={setAssignProperty}
    //                   AssignProperty={AssignProperty}
    //                 />
    //               );
    //             })}
    //           </>
    //         )}
    //       </div>
    //     </>
    //   )}
    // </div>
  );
}
