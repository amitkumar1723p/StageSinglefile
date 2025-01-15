// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import CSS for styling
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Admin_OwnerGetAllPostAction } from "../../Action/postAction";
import { Link } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [UnVerifyPost, setUnVerifyPost] = useState([]);
  const [VerifyPost, setVerifyPost] = useState([]);
  const [VerifiedAdmin, setVerifiedAdmin] = useState([]);
  const [UnVerifyAdmin, setUnVerifyAdmin] = useState([]);
  const [FakeUnverifyAdmin, setFakeUnverifyAdmin] = useState([]);

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  useEffect(() => {
    dispatch(Admin_OwnerGetAllPostAction());
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(GetAllAdminAction());
      }
    }
    // eslint-disable-next-line
  }, []);
  const { loading, data: AllPost } = useSelector((state) => {
    return state.AdminGetAllPost;
  });
  const { data: AllAdminData, loading: AdminLoading } = useSelector((state) => {
    return state.AdminData;
  });

  useEffect(() => {
    if (AllPost && AllPost.success) {
      let PostVerify = AllPost.Post.filter((post) => {
        return post.PostVerify;
      });
      setVerifyPost(PostVerify);
      let unverify = AllPost.Post.filter((post) => {
        return !post.PostVerify;
      });
      setUnVerifyPost(unverify);
    }
  }, [AllPost]);

  useEffect(() => {
    if (AllAdminData && AllAdminData.success) {
      let unverifyAdmin = AllAdminData.Admin.filter((admin) => {
        return admin.Role === "Admin" && admin.AdminVerify === false;
      });
      setUnVerifyAdmin(unverifyAdmin);

      let verifiedadmin = AllAdminData.Admin.filter((admin) => {
        return admin.Role === "Admin" && admin.AdminVerify === true;
      });
      setVerifiedAdmin(verifiedadmin);
      let fakeadmin = AllAdminData.Admin.filter((admin) => {
        return admin.CRTVerifyAdmin === false;
      });
      setFakeUnverifyAdmin(fakeadmin);
    }
  }, [AllAdminData]);
  // AdminData

  return (
    <>
      {loading || AdminLoading ? (
        <Loader className="componentloader" />
      ) : (
        <>
          <h4 className="main-dash"> Dashboard</h4>
          <div className="cards">
            <Link to="/admin/allpost">
              <div className="card">
                <div className="Admin-box">
                  <p className="total-number">
                    {AllPost && AllPost.success && AllPost.Post.length}
                  </p>
                  <img src="/img/TotalPosts.png" alt="totalPost" />
                </div>
                <h3>Total Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>
            <Link to="/admin/allpost/verify">
              <div className="card">
                <div className="Admin-box">
                  <p className="total-number">{VerifyPost.length}</p>
                  <img src="/img/ActivePosts.png" alt="post" />
                </div>
                <h3>Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            <Link to="/admin/allpost/unverify">
              <div className="card">
                <div className="Admin-box">
                  <p className="total-number">{UnVerifyPost.length}</p>
                  <img src="/img/In-ActivePosts.png" alt="post" />
                </div>
                <h3> In-Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            {medata &&
              medata.IsAuthenticated &&
              medata.user.Role === "Owner" && (
                <>
                  <Link to="/admin/data/total">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">
                          {UnVerifyAdmin.length + VerifiedAdmin.length}
                        </p>
                        <img src="/img/TotalAdmin.png" alt="post" />
                      </div>
                      <h3> Total Admin Verified And Un-Verified </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>
                  <Link to="/admin/data/unverify">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{UnVerifyAdmin.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Unverify Admin </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>

                  <Link to="/admin/data/verify">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{VerifiedAdmin.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Verify Admin </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>

                  <div className="card">
                    <div className="Admin-box">
                      <p className="total-number">{FakeUnverifyAdmin.length}</p>
                      <img src="/img/ActivePosts.png" alt="post" />
                    </div>
                    <h3> Fake Admin request </h3>

                    <p className="viewall">View All</p>
                  </div>
                  <div className="card">
                    <div className="Admin-box">
                      <p className="total-number">{FakeUnverifyAdmin.length}</p>
                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3> Expire Lisitng </h3>

                    <p className="viewall">View All</p>
                  </div>

                  <div className="card">
                    <div className="Admin-box">
                      <p className="total-number">{FakeUnverifyAdmin.length}</p>
                      <img src="/img/In-ActivePosts.png" alt="post" />
                    </div>
                    <h3> Deleted Lisitng </h3>

                    <p className="viewall">View All</p>
                  </div>
                  <div className="card">
                    <div className="Admin-box">
                      <p className="total-number">{FakeUnverifyAdmin.length}</p>
                      <img src="/img/ActivePosts.png" alt="post" />
                    </div>
                    <h3> Success</h3>

                    <p className="viewall">View All</p>
                  </div>
                </>
              )}
            {}
          </div>
        </>
      )}

      {/* <div className="main-content"> */}

      {/* </div> */}
    </>
  );
};

export default Dashboard;
