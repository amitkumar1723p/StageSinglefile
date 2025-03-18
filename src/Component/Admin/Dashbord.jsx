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
import { GetAllAdminAction } from "../../Action/userAction";
import { UserContext } from "../CreateContext/CreateContext";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { setAllPropertyData } = useContext(UserContext);
  const { setPostVerify } = useContext(UserContext);
  const [UnVerifyPost, setUnVerifyPost] = useState([]);
  const [VerifyPost, setVerifyPost] = useState([]);
  const [TotalListing, setTotalListing] = useState(0);
  const [successPostlength, setSuccessPostLength] = useState(0);
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
  // const { data2} = useSelector((state) => {
  //   return state;
  // });
  // console.log(data2,"hello1");
  // console.log("assongg ",assignedExcles)

  // On dashboard we get all property
  useEffect(() => {
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(Admin_OwnerGetAllPostAction());
        dispatch(GetAllAdminAction());
        dispatch(fetchAllOwnerFiles())
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


      setSuccessPostLength(successPost?.length);
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

  // console.log(AllUserResponseData,"dash")
  return (
    <>
      {loading ? (
        <>
          <p className="dashboard-skeleton-heading skeleton"></p>

          <div className="dashboard-skeleton-container">
            {Array.from({ length: 8 }).map((_, index) => (
              <DashboardSkeletonCard key={index} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h4
            className={`main-dash ${location.pathname.includes("/admin/dashboard")
                ? "active-btn-admin"
                : ""
              }`}
          >
            {" "}
            Dashboard
          </h4>
          <div className="cards  grid grid-cols-4 gap-3  ">
            <Link to="/admin/allpost?type=all">
              <div className="card p-3">
                <div className="Admin-box">
                  <p className="total-number">{TotalListing}</p>
                  <img src="/img/TotalPosts.png" alt="totalPost" />
                </div>
                <h3>Total Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>
            <Link to="/admin/allpost?type=true">
              <div className="card p-3">
                <div className="Admin-box">
                  <p className="total-number">{VerifyPost.length}</p>
                  <img src="/img/ActivePosts.png" alt="post" />
                </div>
                <h3 onClick={() => setPostVerify(true)}>Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            <Link to="/admin/allpost?type=false">
              <div className="card p-3 cursor-pointer">
                <div className="Admin-box">
                  <p className="total-number">{UnVerifyPost.length}</p>
                  <img src="/img/In-ActivePosts.png" alt="post" />
                </div>
                <h3 onClick={() => setPostVerify(false)}>In-Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            {medata?.user?.Role != "Agent" && (
              <>
                <div className="card p-3 cursor-pointer">
                  <div className="Admin-box">
                    <p className="total-number">0</p>
                    <img src="/img/In-ActivePosts.png" alt="post" />
                  </div>
                  <h3> Expire Lisitng </h3>

                  <p className="viewall">View All</p>
                </div>
                <div
                  className="card p-3 cursor-pointer"
                  onClick={() => navigate("/admin/allpost?type=success")}
                >
                  <div className="Admin-box">
                    <p className="total-number">{successPostlength}</p>
                    <img src="/img/ActivePosts.png" alt="post" />
                  </div>
                  <h3> Success</h3>

                  <p className="viewall">View All</p>
                </div>{" "}


              </>
            )}


            {medata?.user?.Role === "Owner" && (
              <>
                <Link to="/admin/all-excel">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">{data?.length}</p>
                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3 >All Excel Data</h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )}
            {medata?.user?.Role === "Admin" && (
              <>
                <Link to="/admin/all-excel-both">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">{AdminAllExcelFilesData?.assignedExcels?.length}</p>
                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3 >All Excel Data</h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )}
            {medata?.user?.Role === "Agent" && (
              <>
                <Link to="/admin/all-excel-both">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">{AgentAllExcelFilesData?.assignedExcels?.length}</p>
                      {!AgentAllExcelFilesData && <p className="total-number">0</p>}

                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3 >All Excel Data</h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )}
            {medata?.user?.Role === "Owner" && (
              <>
                <div
                  className="card p-3 cursor-pointer"
                  onClick={() => {
                    window.open(
                      "/admin/deleted-post?Type=AllPost",
                      "DeletedPostTab"
                    );
                  }}
                >
                  <div className="Admin-box">
                    <p className="total-number">
                      {DeletedPost?.deletedPosts?.length || 0}
                    </p>
                    <img src="/img/In-ActivePosts.png" alt="post" />
                  </div>
                  <h3> Deleted Lisitng </h3>

                  <p className="viewall">View All</p>
                </div>

                <Link to="/admin/all-registration-response">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">
                        {AllUserResponseData?.data?.length}
                      </p>
                      <img src="/img/ActivePosts.png" alt="post" />
                    </div>
                    <h3 onClick={() => setPostVerify(false)}>
                      All Registration
                    </h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )}

            {medata?.user?.Role === "Owner" && (
              <>
                <Link to="/admin/notify">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">{newNotifyAndReq.length}</p>
                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3 onClick={() => setPostVerify(false)}>
                      Notify & Requirments
                    </h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )}

            {/* {medata?.user?.Role === "Owner" && (
              <>
                <Link to="/admin/Transaction">
                  <div className="card p-3 cursor-pointer">
                    <div className="Admin-box">
                      <p className="total-number">{getTransactionDetail?.data?.length}</p>
                      <img src="/img/ActivePosts.png" alt="post" />
                    </div>
                    <h3 onClick={() => setPostVerify(false)}>
                      Transaction Detail
                    </h3>
                    <p className="viewall">View All</p>
                  </div>
                </Link>
              </>
            )} */}
          </div>
        </>
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
