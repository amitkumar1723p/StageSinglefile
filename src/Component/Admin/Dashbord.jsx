// src/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css"; // Import CSS for styling

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import {
  Admin_AgentGetAllPostAction,
  Admin_OwnerGetAllPostAction,
  fetchAllOwnerFiles,
  OwnerUploadExcelFile,
  GetDeletedPostsAction,
  fetchAllAdminFiles,
  fetchAllAgentFiles,
} from "../../Action/postAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetAllAdminAction, viewAllContactForm } from "../../Action/userAction";
import { UserContext } from "../CreateContext/CreateContext";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { setAllPropertyData } = useContext(UserContext);
  const { setPostVerify } = useContext(UserContext);
  const [UnVerifyPost, setUnVerifyPost] = useState([]);
  const [VerifyPost, setVerifyPost] = useState([]);
  const [TotalListing, setTotalListing] = useState(0);
  const [successPostlength, setSuccessPostLength] = useState(0);
  const [expiredPostlength, setExpiredPostLength] = useState(0);
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  const location = useLocation();
  const { loading, data: AllPost } = useSelector((state) => {
    return state.AdminGetAllPost;
  });
  const { data: DeletedPost } = useSelector((state) => {
    return state.deletePosts;
  });

  const allData = useSelector((state) => state.AllNotifiesAndReq);
  const [newNotifyAndReq, setNewNotifyAndReq] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allData?.data) {
      const notifies = allData.data.notifies || [];
      const requirements = allData.data.requirements || [];

      // Filter where Acknowledged is false
      const unacknowledgedNotifies = notifies.filter(
        (item) => !item.Acknowledged
      );
      const unacknowledgedRequirements = requirements.filter(
        (item) => !item.Acknowledged
      );

      // Combine both arrays
      const combinedUnacknowledged = [...notifies, ...requirements];

      // Update state
      setNewNotifyAndReq(combinedUnacknowledged);

      // console.log(combinedUnacknowledged)
      // setLoading(false); // Set loading to false when data is processed
    }
  }, [allData]); // Runs whenever `allData` updates

  const { data: AgentAdminAllPost } = useSelector((state) => {
    return state.AdminProperty;
  });
  const { data } = useSelector((state) => {
    return state.OwnerAllExcelFiles;
  }
  );
  const { data: AdminAllExcelFilesData } = useSelector((state) => {
    return state.AdminAllExcelFiles
  }
  );

  const { data: AgentAllExcelFilesData } = useSelector((state) => {
    return state.AgentAllExcelFiles
  }
  );

  // get all user excepation owner Admin agent
  const { data: AllUserResponseData } = useSelector((state) => {
    return state.AllUserResponse;
  })
  // paid user transaction detail 
  const { data: getTransactionDetail } = useSelector((state) => {
    return state.getTransactionDetail;
  });
  const { data: viewAllContactFormReducer } = useSelector((state) => {
    return state.viewAllContactFormReducer;
});
  // console.log(data2,"hello1");
  // console.log("assongg ",assignedExcles)

  // On dashboard we get all property
  useEffect(() => {
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(Admin_OwnerGetAllPostAction());
        dispatch(GetAllAdminAction());
        dispatch(fetchAllOwnerFiles())
            dispatch(viewAllContactForm())
            
        // if  data is  exit in redux store not call thsi api
        if (!DeletedPost) {
          dispatch(GetDeletedPostsAction());
        }
      }
      //  console.log(medata.user.Role)
      if (["Admin"].includes(medata.user.Role)) {
        dispatch(fetchAllAdminFiles())

        dispatch(Admin_AgentGetAllPostAction());
      }
      if (["Agent"].includes(medata.user.Role)) {
        dispatch(fetchAllAgentFiles())

        dispatch(Admin_AgentGetAllPostAction());
      }
    }
  }, []);

  //  by using this we show number of filtered or un-filtred property number on dashboard for owner
  useEffect(() => {
    if (AllPost && AllPost.success) {
      let PostVerify = AllPost.Post.filter((post) => {
        return post.PostVerify == true;
      });
      setVerifyPost(PostVerify);
      let unverify = AllPost.Post.filter((post) => {
        return post.PostVerify == false;
      });
      setAllPropertyData(AllPost);
      setUnVerifyPost(unverify);
      setTotalListing(PostVerify.length + unverify.length);

      const successPost = AllPost.Post.filter((item) => {
        // console.log("ittem  ",item)
        return item?.propertyStatus?.currentPropertyStatus === "sold out";
      });

      const expiredPost = AllPost.Post.filter((item) => {
        // console.log("ittem  ",item?.PostExpired)
        return item?.PostExpired?.ExpiredStatus ;
      });


      setSuccessPostLength(successPost?.length);
      setExpiredPostLength(expiredPost?.length)
    }
  }, [AllPost]);

  //  by using this we show number of filtered or un-filtred property number on dashboard for Admin or Agent
  useEffect(() => {
    if (AgentAdminAllPost && AgentAdminAllPost.success) {
      let PostVerify = AgentAdminAllPost.AssignProperty.filter((post) => {
        return post?.PostId?.PostVerify == true;
      });

      setVerifyPost(PostVerify);
      let unverify = AgentAdminAllPost.AssignProperty.filter((post) => {
        return post?.PostId?.PostVerify == false;
      });
      setAllPropertyData(AgentAdminAllPost);
      setUnVerifyPost(unverify);
      setTotalListing(PostVerify.length + unverify.length);
    }
  }, [AgentAdminAllPost]);
console.log(viewAllContactFormReducer,"ooo")
  // console.log(AllUserResponseData,"dash")
  return (
    <>
      {loading ? (
        <>
          <p className="dashboard-skeleton-heading skeleton"></p>

          <div className="dashboard-skeleton-container">
            {Array.from({ length: 9 }).map((_, index) => (
              <DashboardSkeletonCard key={index} />
            ))}
          </div>
        </>
      ) : (

      
        <div className="dashboard-container">

          <div className="dashboard-agentprofile-container">
            <div className="dashboard-agentprofile">
              <div className="dashboard-username-contianer">
                <div className="dashboard-username">{medata.user.Name} </div>
                <div className="dashboard-role">{medata.user.Role}</div>
              </div>
              <div className="dashboard-call-email-container">
                <div className="dashboard-callme">
                  <img src="/img/dashboard-callme.svg" alt="call" />
                  <p>9634755090</p>
                </div>
                <div className="dashboard-emailme">
                  <img src="/img/dashboard-emailme.svg" alt="email" />
                  <p>saurabhhh2613@gmail.notcom</p>
                </div>
              </div>
            </div>
            <div className="dashboard-track-card">
              <div className="dashboard-track-properydekho"><p>PROPERTYDEKHO247.COM</p></div>
              <div className="dashboard-track-container">
                <div><p>Track</p></div>
                <div><img src="/img/dashboard-arrow.svg" alt="arrow" /></div>
                <div><p>Connect</p></div>
                <div><img src="/img/dashboard-arrow.svg" alt="arrow" /></div>
                <div><p>Close</p></div>
              </div>
              <div className="dashboard-track-one-place"><p>From Listings to Closings — All in One Place.</p></div>
              <div className="dashboard-track-button"><button>Seal Your First Deal Now <img src="/img/dashboard-track-button.svg" alt="btn" /></button> </div>
              <div className="dashboard-track-star-0"><img src="/img/dashboard-track-Star_0.svg" alt="star" /></div>
              <div className="dashboard-track-star-1"><img src="/img/dashboard-track-star_1.svg" alt="star" /></div>
              <div className="dashboard-track-star-2"><img src="/img/dashboard-track-star_2.svg" alt="star" /></div>
              <div className="dashboard-track-star-3"><img src="/img/dashboard-track-star_1.svg" alt="star" /></div>
              <div className="dashboard-track-star-4"><img src="/img/dashboard-track-star_2.svg" alt="star" /></div>


            </div>
          </div>
          <div className="dashboard-routes-container">
            
            <div className="dashboard-routes-top">
              <div className="dashboard-listing-info">
                <div className="dashbord-listing-info-heading">Listing Info</div>
                <div className="dashboard-listing-cards-container">
                 {/* Dashboard-total-post start  */}
                <Link to="/admin/allpost?type=all">
                 <div className="dashboard-listing-card dashboard-total-post-card">
                      <div>
                        <div className="dashboard-listing-card-top-total-post-heading">
                          <div>
                              <img src="/img/new_total_listing.svg" alt="total_listing" />
                              <h2>Total Post</h2>
                          </div>
                          <div className="d-none">
                              <p>+5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-total-post-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{TotalListing}</p>
                        </div>
                        <div>
                          <img src="/img/graph_1.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
                  {/* Dashboard-total-post end  */}


                  {/* Active-listings start  */}
                <Link to="/admin/allpost?type=true">
                 <div className="dashboard-listing-card dashboard-active-listing-card">
                      <div>
                        <div className="dashboard-listing-card-top-active-listing-heading">
                          <div>
                              <img src="/img/active_listing.svg" alt="active_listing" />
                              <h2>Active Listings</h2>
                          </div>
                          <div className="d-none">
                              <p>-4.44</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-active-listing-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{VerifyPost.length}</p>
                        </div>
                        <div>
                          <img src="/img/graph_2.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
                   {/*Active-listings end  */}


                  {/* InActive-listings start  */}
                <Link to="/admin/allpost?type=false">
                 <div className="dashboard-listing-card dashboard-inactive-listing-card">
                      <div>
                        <div className="dashboard-listing-card-top-inactive-listing-heading">
                          <div>
                              <img src="/img/inactive_listing.svg" alt="total_listing" />
                              <h2>In-Active Listings</h2>
                          </div>
                          <div className="d-none">
                              <p>+17.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-inactive-listing-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{UnVerifyPost.length}</p>
                        </div>
                        <div>
                          <img src="/img/graph_3.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
                  {/* InActive-listings start  */}



        { ["Admin" ,"Owner"].includes(medata.user.Role)  && <>
              {/* Expire-Listing start  */}
                <Link to ="/admin/allpost?type=expired">
                  <div className="dashboard-listing-card dashboard-expired-listing-card">
                      <div>
                        <div className="dashboard-listing-card-top-expired-listing-heading">
                          <div>
                              <img src="/img/expire_listing.svg" alt="total_listing" />
                              <h2>Expired Listings</h2>
                          </div>
                          <div className="d-none">
                              <p>-23.43</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-expired-listing-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{expiredPostlength}</p>
                        </div>
                        <div>
                          <img src="/img/graph_3.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>  
                </Link>
              {/* Expire-Listing end  */}

              {/*Success-listing start  */}
                <Link to="/admin/allpost?type=success">
                 <div className="dashboard-listing-card dashboard-success-card">
                      <div>
                        <div className="dashboard-listing-card-top-success-heading">
                          <div>
                              <img src="/img/success_listing.svg" alt="total_listing" />
                              <h2>Success Listings</h2>
                          </div>
                          <div className="d-none">
                              <p>-8.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-success-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{successPostlength}</p>
                        </div>
                        <div>
                          <img src="/img/graph_2.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
              {/* Success-listings end  */}
              
              </>
          }


          {medata.user.Role === "Owner" && 
          <>
          
              {/* Deleted-listings start  */}
                  <Link to="/admin/deleted-post?Type=AllPost">
                 <div className="dashboard-listing-card dashboard-deleted-card">
                      <div>
                        <div className="dashboard-listing-card-top-deleted-heading">
                          <div>
                              <img src="/img/deleted_listing.svg" alt="deleted_listing" />
                              <h2>Deleted Listings</h2>
                          </div>
                          <div className="d-none">
                              <p>+5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-deleted-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{DeletedPost?.deletedPosts?.length || 0}</p>
                        </div>
                        <div>
                          <img src="/img/graph_1.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
              {/* Deleted-listingst end  */}
          </>
          }
            </div>
              </div>

                <div className="dashboard-data-user">
                <div className="dashboard-data-user-headings">Data & Users</div>
                <div className="dashboard-data-user-card-container">
 
                {["Agent","Admin"].includes(medata.user.Role) && <>
                
              {/* All-excel-data start  */}
                 <Link to="/admin/all-excel-both">
                 <div className="dashboard-listing-card dashboard-all-excel-data-card">
                      <div>
                        <div className="dashboard-listing-card-top-all-excel-data-heading">
                          <div>
                              <img src="/img/all_excel_data.svg" alt="all_excel_data" />
                              <h2>All Excel Data</h2>
                          </div>
                          <div className="d-none">
                              <p>+5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-all-excel-data-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{data?.length} Sheets</p>
                        </div>
                        <div>
                          <img src="/img/graph_1.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
              {/* All-excel-data end  */}
                
                </>
                }

                {medata.user.Role === "Owner"  && 
                <>
              {/* All-excel-data start  */}
                 <Link to="/admin/all-excel">
                 <div className="dashboard-listing-card dashboard-all-excel-data-card">
                      <div>
                        <div className="dashboard-listing-card-top-all-excel-data-heading">
                          <div>
                              <img src="/img/all_excel_data.svg" alt="all_excel_data" />
                              <h2>All Excel Data</h2>
                          </div>
                          <div className="d-none">
                              <p>+5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-all-excel-data-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{data?.length} Sheets</p>
                        </div>
                        <div>
                          <img src="/img/graph_1.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
              {/* All-excel-data end  */}


              {/*  All-registration start  */}
                <Link to="/admin/all-registration-response">
                 <div className="dashboard-listing-card dashboard-all-reg-card">
                      <div>
                        <div className="dashboard-listing-card-top-all-reg-heading">
                          <div>
                              <img src="/img/all_registration.svg" alt="all_registration" />
                              <h2>All Registration</h2>
                          </div>
                          <div className="d-none">
                              <p>+5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-all-reg-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{AllUserResponseData?.data?.length}</p>
                        </div>
                        <div>
                          <img src="/img/graph_2.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                 </Link>
              {/* All-registration end  */}
                </>
                }

                </div>
              </div>


              

            </div>

            {medata.user.Role === "Owner" && 
            <>
            
            <div className="dashboard-routes-bottom">
            <div className="dashboard-data-user-headings">Support & Notification</div>
            <div className="dashboard-support-notification-card-container">
              {/*Notify & Requirements start */}
                 <Link to="/admin/notify">
                 <div className="dashboard-listing-card dashboard-notify-card">
                      <div>
                        <div className="dashboard-listing-card-top-notify-heading">
                          <div>
                              <img src="/img/notify&requirement.svg" alt="total_listing" />
                              <h2>Notify & Requirements</h2>
                          </div>
                          <div className="d-none">
                              <p>-8.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-notify-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{newNotifyAndReq.length}</p>
                        </div>
                        <div>
                          <img src="/img/graph_1.svg" alt="graph" />
                        </div>
                      </div>
                  </div>    
                 </Link>
              {/* Notify & Requirements end  */}


              {/* Contact_User start  */}
                <Link to="/admin/Contact-us">
                 <div className="dashboard-listing-card dashboard-contact-card">
                      <div>
                        <div className="dashboard-listing-card-top-contact-heading">
                          <div>
                              <img src="/img/contact_user.svg" alt="contact_user" />
                              <h2>Contact Users</h2>
                          </div>
                          <div className="d-none">
                              <p>-5.63</p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="dashboard-listing-card-contact-bottom">
                        <div>
                          <h2>Current Value</h2>
                          <p>{viewAllContactFormReducer?.data?.length}</p>
                        </div>
                        <div>
                          <img src="/img/graph_2.svg" alt="graph" />
                        </div>
                       
                      </div>
                  </div>    
                </Link>
              {/* Contact_User end  */}
            </div>
            </div>
            
            </>}



          </div>
        
          
        </div>
        // <>
        //   <h4
        //     className={`main-dash ${location.pathname.includes("/admin/dashboard")
        //         ? "active-btn-admin"
        //         : ""
        //       }`}
        //   >
        //     {" "}
        //     Dashboard
        //   </h4>
        //   <div className="cards  grid grid-cols-4 gap-3  ">
        //     <Link to="/admin/allpost?type=all">
        //       <div className="Admin-dashboard-row p-3">
        //         <div className="Admin-box">
        //           <p className="total-number">{TotalListing}</p>
        //           <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TotalPosts.png" alt="totalPost" />
        //         </div>
        //         <h3>Total Listing</h3>
        //         <p className="viewall">View All</p>
        //       </div>
        //     </Link>
        //     <Link to="/admin/allpost?type=true">
        //       <div className="Admin-dashboard-row p-3">
        //         <div className="Admin-box">
        //           <p className="total-number">{VerifyPost.length}</p>
        //           <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
        //         </div>
        //         <h3 onClick={() => setPostVerify(true)}>Active Listing</h3>
        //         <p className="viewall">View All</p>
        //       </div>
        //     </Link>

        //     <Link to="/admin/allpost?type=false">
        //       <div className="Admin-dashboard-row p-3 cursor-pointer">
        //         <div className="Admin-box">
        //           <p className="total-number">{UnVerifyPost.length}</p>
        //           <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //         </div>
        //         <h3 onClick={() => setPostVerify(false)}>In-Active Listing</h3>
        //         <p className="viewall">View All</p>
        //       </div>
        //     </Link>

        //     {medata?.user?.Role != "Agent" && (
        //       <>
        //         <div className="card p-3 cursor-pointer"  onClick={() => navigate("/admin/allpost?type=expired")}>
        //           <div className="Admin-box">
        //             <p className="total-number">{expiredPostlength}</p>
        //             <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //           </div>
        //           <h3> Expire Lisitng </h3>

        //           <p className="viewall">View All</p>
        //         </div>
        //         <div
        //           className="Admin-dashboard-row p-3 cursor-pointer"
        //           onClick={() => navigate("/admin/allpost?type=success")}
        //         >
        //           <div className="Admin-box">
        //             <p className="total-number">{successPostlength}</p>
        //             <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
        //           </div>
        //           <h3> Success</h3>

        //           <p className="viewall">View All</p>
        //         </div>{" "}


        //       </>
        //     )}


        //     {medata?.user?.Role === "Owner" && (
        //       <>
        //         <Link to="/admin/all-excel">
        //           <div className="Admin-dashboard-row p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{data?.length}</p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 >All Excel Data</h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}
        //     {medata?.user?.Role === "Admin" && (
        //       <>
        //         <Link to="/admin/all-excel-both">
        //           <div className="Admin-dashboard-row p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{AdminAllExcelFilesData?.assignedExcels?.length}</p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 >All Excel Data</h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}
        //     {medata?.user?.Role === "Agent" && (
        //       <>
        //         <Link to="/admin/all-excel-both">
        //           <div className="Admin-dashboard-row p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{AgentAllExcelFilesData?.assignedExcels?.length}</p>
        //               {!AgentAllExcelFilesData && <p className="total-number">0</p>}

        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 >All Excel Data</h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}
        //     {medata?.user?.Role === "Owner" && (
        //       <>
        //         <div
        //           className="Admin-dashboard-row p-3 cursor-pointer"
        //           onClick={() => {
        //             window.open(
        //               "/admin/deleted-post?Type=AllPost",
        //               "DeletedPostTab"
        //             );
        //           }}
        //         >
        //           <div className="Admin-box">
        //             <p className="total-number">
        //               {DeletedPost?.deletedPosts?.length || 0}
        //             </p>
        //             <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //           </div>
        //           <h3> Deleted Lisitng </h3>

        //           <p className="viewall">View All</p>
        //         </div>

        //         <Link to="/admin/all-registration-response">
        //           <div className="Admin-dashboard-row p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">
        //                 {AllUserResponseData?.data?.length}
        //               </p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 onClick={() => setPostVerify(false)}>
        //               All Registration
        //             </h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}

        //     {medata?.user?.Role === "Owner" && (
        //       <>
        //         <Link to="/admin/notify">
        //           <div className="Admin-dashboard-row p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{newNotifyAndReq.length}</p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/In-ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 onClick={() => setPostVerify(false)}>
        //               Notify & Requirments
        //             </h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}

        //   {medata?.user?.Role === "Owner" && (
        //       <>
        //         <Link to="/admin/Contact-us">
        //           <div className="card p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{viewAllContactFormReducer?.data?.length}</p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 onClick={() => setPostVerify(false)}>
        //              Contact-Us
        //             </h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )}
        //     {/* {medata?.user?.Role === "Owner" && (
        //       <>
        //         <Link to="/admin/Transaction">
        //           <div className="card p-3 cursor-pointer">
        //             <div className="Admin-box">
        //               <p className="total-number">{getTransactionDetail?.data?.length}</p>
        //               <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
        //             </div>
        //             <h3 onClick={() => setPostVerify(false)}>
        //               Transaction Detail
        //             </h3>
        //             <p className="viewall">View All</p>
        //           </div>
        //         </Link>
        //       </>
        //     )} */}
        //   </div>
        // </>
      )}


    </>
  );
}

export default Dashboard;

const DashboardSkeletonCard = () => {
  return (
    <>
      <div className="dashboard-skeleton-card">
        <div className="dashboard-skeleton-number skeleton"></div>
        <div className="dashboard-skeleton-title skeleton"></div>
        <div className="dashboard-skeleton-link skeleton"></div>
        <div className="dashboard-skeleton-icon skeleton"></div>
      </div>
    </>
  );
};
