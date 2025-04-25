// src/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import CSS for styling
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

import { Link, useSearchParams } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
const AdminAgentDashboard = () => {
  const dispatch = useDispatch();

  const [VerifiedAdmin, setVerifiedAdmin] = useState([]);
  const [UnVerifyAdmin, setUnVerifyAdmin] = useState([]);
  const [UnVerifyAgent, setUnVerifyAgent] = useState([]);
  const [VerifyAgent, setVerifyAgent] = useState([]);
  const [FakeUnverifyAdmin, setFakeUnverifyAdmin] = useState([]);
  const [querry, setquerry] = useSearchParams();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const [ShowFiled, setShowField] = useState({
    showAgent: true,
    showAdmin: true,
  });

  const { data: AllAdminData, loading: AdminLoading } = useSelector((state) => {
    return state.AdminData;
  });

  useEffect(() => {}, []);
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
  useEffect(() => {
    if (querry.get("Role") === "Agent") {
      setShowField({ showAgent: true, showAdmin: false });
    } else if (querry.get("Role") === "Admin") {
      setShowField({ showAgent: false, showAdmin: true });
    } else {
      setShowField({ showAgent: true, showAdmin: true });
    }
  }, [querry]);
  useEffect(() => {
    if (medata && medata.IsAuthenticated) {
      if (medata.user.Role === "Owner") {
        dispatch(GetAllAdminAction());
      }
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {AdminLoading ? (
        <Loader className="componentloader" />
      ) : (
        <>
          <h4 className="text-[var(--main-light-clr)] font-inter text-[16px] font-medium leading-normal pb-2"> Admin Agent Dashboard</h4>
          <div className="cards grid grid-cols-4 gap-3 ">
            {medata &&
              medata.IsAuthenticated &&
              medata.user.Role === "Owner" && (
                <>
                  {ShowFiled.showAdmin && (
                    <>
                      {" "}
                      <Link to="/admin/data?Role=Admin">
                        <div className="card p-3">
                          <div className="Admin-box">
                            <p className="total-number">
                              {UnVerifyAdmin.length + VerifiedAdmin.length}
                            </p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TotalAdmin.png" alt="post" />
                          </div>
                          <h3> Total Admin Verified And Un-Verified </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                      <Link to={`/admin/data?AdminVerify=false`}>
                        <div className="card min-h-[8.5rem]  p-3">
                          <div className="Admin-box">
                            <p className="total-number">
                              {UnVerifyAdmin.length}
                            </p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
                          </div>
                          <h3> Unverified Admin </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                      <Link to="/admin/data/?AdminVerify=true">
                        <div className="card min-h-[8.5rem]  p-3">
                          <div className="Admin-box">
                            <p className="total-number">
                              {VerifiedAdmin.length}
                            </p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
                          </div>
                          <h3> Verified Admin </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                    </>
                  )}

                  {ShowFiled.showAgent && (
                    <>
                      {" "}
                      <Link to="/admin/data/?Role=Agent">
                        <div className="card min-h-[8.5rem]  p-3">
                          <div className="Admin-box">
                            <p className="total-number">
                              {UnVerifyAgent.length + VerifyAgent.length}
                            </p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TotalAdmin.png" alt="post" />
                          </div>
                          <h3> Total Agent Verified And Un-Verified </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                      <Link to="/admin/data?AgentVerify=false">
                        <div className="card min-h-[8.5rem]  p-3">
                          <div className="Admin-box">
                            <p className="total-number">
                              {UnVerifyAgent.length}
                            </p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
                          </div>
                          <h3> Unverified Agent </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                      <Link to="/admin/data?AgentVerify=true">
                        <div className="card min-h-[8.5rem]  p-3">
                          <div className="Admin-box">
                            <p className="total-number">{VerifyAgent.length}</p>
                            <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
                          </div>
                          <h3> Verified Agent </h3>
                          <p className="viewall">View All</p>
                        </div>
                      </Link>
                    </>
                  )}
                  {/* Agent Data  */}

                  {/* <div className="card">
                    <div className="Admin-box">
                      <p className="total-number">{FakeUnverifyAdmin.length}</p>
                      <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ActivePosts.png" alt="post" />
                    </div>
                    <h3> Fake Admin request (Profile is not Create) </h3>

                    <p className="viewall">View All</p>
                  </div> */}
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
