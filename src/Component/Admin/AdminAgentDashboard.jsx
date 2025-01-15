// import React from 'react'

// export default function AdminAgentDashboard() {
//   return (
//      <>

//      </>
//   )
// }

// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import CSS for styling
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

import { Link } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
const AdminAgentDashboard = () => {
  const dispatch = useDispatch();

  const [VerifiedAdmin, setVerifiedAdmin] = useState([]);
  const [UnVerifyAdmin, setUnVerifyAdmin] = useState([]);
  const [UnVerifyAgent, setUnVerifyAgent] = useState([]);
  const [VerifyAgent, setVerifyAgent] = useState([]);
  const [FakeUnverifyAdmin, setFakeUnverifyAdmin] = useState([]);

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  useEffect(() => {
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(GetAllAdminAction());
      }
    }
    // eslint-disable-next-line
  }, []);

  const { data: AllAdminData, loading: AdminLoading } = useSelector((state) => {
    return state.AdminData;
  });

  useEffect(() => {
    if (AllAdminData && AllAdminData.success) {
      let unverifyAdmin = AllAdminData.Admin.filter((admin) => {
        return admin.AdminVerify === false;
      });
      setUnVerifyAdmin(unverifyAdmin);

      let verifiedadmin = AllAdminData.Admin.filter((admin) => {
        return admin.AdminVerify === true;
      });
      setVerifiedAdmin(verifiedadmin);
      let fakeadmin = AllAdminData.Admin.filter((admin) => {
        return admin.CRTVerifyAdmin === false;
      });
      setFakeUnverifyAdmin(fakeadmin);

      let verifiedagent = AllAdminData.Admin.filter((agent) => {
        return agent.AgentVerify === true;
      });
      setVerifyAgent(verifiedagent);



      let unverifiedagent = AllAdminData.Admin.filter((agent) => {
        return agent.AgentVerify === false;
      });
      setUnVerifyAgent(unverifiedagent);

      
    }
  }, [AllAdminData]);
  // AdminData

  return (
    <>
      {AdminLoading ? (
        <Loader className="componentloader" />
      ) : (
        <>
          <h4 className="main-dash admin-agent-dash"> Admin Agent Dashboard</h4>
          <div className="cards">
            {medata &&
              medata.IsAuthenticated &&
              medata.user.Role === "Owner" && (
                <>
                  <Link to="/admin/data?Role=Admin">
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
                  <Link to={`/admin/data?AdminVerify=false`}>
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{UnVerifyAdmin.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Unverify Admin </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>

                  <Link to="/admin/data/?AdminVerify=true">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{VerifiedAdmin.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Verify Admin </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>

                  {/* Agent Data  */}

                  <Link to="/admin/data/?Role=Agent">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">
                          {UnVerifyAgent.length + VerifyAgent.length}
                        </p>
                        <img src="/img/TotalAdmin.png" alt="post" />
                      </div>
                      <h3> Total Agent Verified And Un-Verified </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>
                  <Link to="/admin/data?AgentVerify=false">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{UnVerifyAgent.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Unverify Agent </h3>
                      <p className="viewall">View All</p>
                    </div>
                  </Link>

                  <Link to="/admin/data?AgentVerify=true">
                    <div className="card">
                      <div className="Admin-box">
                        <p className="total-number">{VerifyAgent.length}</p>
                        <img src="/img/ActivePosts.png" alt="post" />
                      </div>
                      <h3> Verify Agent </h3>
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

export default AdminAgentDashboard;
