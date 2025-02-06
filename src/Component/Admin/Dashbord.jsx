// src/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css"; // Import CSS for styling

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import {
  Admin_AgentGetAllPostAction,
  Admin_OwnerGetAllPostAction,
} from "../../Action/postAction";
import { Link , useLocation ,useNavigate } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
import { UserContext } from "../CreateContext/CreateContext";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { setAllPropertyData } = useContext(UserContext);
  const{setPostVerify}=useContext(UserContext)
  const [UnVerifyPost, setUnVerifyPost] = useState([]);
  const [VerifyPost, setVerifyPost] = useState([]);
  const [TotalListing, setTotalListing] = useState(0);
 
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  const location= useLocation();
  const { loading, data: AllPost } = useSelector((state) => {
    return state.AdminGetAllPost;
  });

  const { data: AgentAdminAllPost } = useSelector((state) => {
    return state.AdminProperty;
  });

  // On dashboard we get all property 
  useEffect(() => {

    
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(Admin_OwnerGetAllPostAction());
        dispatch(GetAllAdminAction());
      }

      if (["Admin", "Agent"].includes(medata.user.Role)) {
        dispatch(Admin_AgentGetAllPostAction());
      }
    }
    // eslint-disable-next-line
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
      setAllPropertyData(AllPost)
      setUnVerifyPost(unverify);
      setTotalListing(PostVerify.length + unverify.length);
    }
  }, [AllPost]);
//  by using this we show number of filtered or un-filtred property number on dashboard for Admin or Agent
  useEffect(() => {
    if (AgentAdminAllPost && AgentAdminAllPost.success) {
      let PostVerify = AgentAdminAllPost.AssignProperty.filter((post) => {
        return post.PostId?.PostVerify == true;
      });

      setVerifyPost(PostVerify);
      let unverify = AgentAdminAllPost.AssignProperty.filter((post) => {
        return post.PostId?.PostVerify == false;
      });
      setAllPropertyData(AgentAdminAllPost)
      setUnVerifyPost(unverify);
      setTotalListing(PostVerify.length + unverify.length);
    }
  }, [AgentAdminAllPost]);
  return (
    <>
      {loading ? (
        <Loader className="componentloader" />
      ) : (
        <>
          <h4 className={`main-dash ${location.pathname.includes("/admin/dashboard") ?"active-btn-admin":""}`} > Dashboard</h4>
          <div className="cards  grid grid-cols-4 gap-3  ">
            <Link to="/admin/allpost" >
              <div className="card p-3">
                <div className="Admin-box">
                  <p className="total-number">{TotalListing}</p>
                  <img src="/img/TotalPosts.png" alt="totalPost" />
                </div>
                <h3>Total Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>
            <Link to="/admin/allpost">

              <div className="card p-3">
                <div className="Admin-box">
                  <p className="total-number">{VerifyPost.length}</p>
                  <img src="/img/ActivePosts.png" alt="post" />
                </div>
                <h3 onClick={() => setPostVerify(true)}>Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            <Link to="/admin/allpost">
              <div className="card p-3 cursor-pointer">
                <div className="Admin-box">
                  <p className="total-number">{UnVerifyPost.length}</p>
                  <img src="/img/In-ActivePosts.png" alt="post" />
                </div>
                <h3 onClick={() => setPostVerify(false)}>In-Active Listing</h3>
                <p className="viewall">View All</p>
              </div>
            </Link>

            {medata?.user?.Role!= "Agent" && (
              <>
                {" "}
                <div className="card p-3 cursor-pointer">
                  <div className="Admin-box">
                    <p className="total-number">0</p>
                    <img src="/img/In-ActivePosts.png" alt="post" />
                  </div>
                  <h3> Expire Lisitng </h3>

                  <p className="viewall">View All</p>
                </div>
                <div className="card p-3 cursor-pointer">
                  <div className="Admin-box">
                    <p className="total-number">0</p>
                    <img src="/img/In-ActivePosts.png" alt="post" />
                  </div>
                  <h3> Deleted Lisitng </h3>

                  <p className="viewall">View All</p>
                </div>
                <div className="card p-3 cursor-pointer">
                  <div className="Admin-box">
                    <p className="total-number">0</p>
                    <img src="/img/ActivePosts.png" alt="post" />
                  </div>
                  <h3> Success</h3>

                  <p className="viewall">View All</p>
                </div>{" "}
              </>
            )}
          </div>
        </>
      )}

      {/* <div className="main-content"> */}

      {/* </div> */}
    </>
  );
};

export default Dashboard;
