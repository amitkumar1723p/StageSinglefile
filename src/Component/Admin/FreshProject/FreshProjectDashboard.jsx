import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getAllFreshProjectAction } from "../../../Action/freshProjectAction";

export default function FreshProjectDashboard() {
  const dispatch = useDispatch();
  const { data: allFreshProjectData } = useSelector((state) => {
    return state.allFreshProjectData;
  });
  const allFreshBooking = allFreshProjectData?.projectData || [];

  useEffect(() => {
     if(!allFreshProjectData){
      dispatch(getAllFreshProjectAction({RouteType:"AdminRoutes"}));
     }
   
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="container d-flex">
          <div
            className="card border-primary mb-3 m-4 text-center border-opacity-25"
            style={{ maxWidth: "25%" }}
          >
            <Link to="/admin/fresh-property/create">
              <div className="card-body  p-5 shadow-sm ">
                <p className="fw-medium"></p>
                <p className="fw-normal">Create Fresh Project!</p>
                <small className="fw-light text-primary border-bottom border-primary border-3 pb-1">
                  View All
                </small>
              </div>
            </Link>
          </div>

          <div
            className="card border-primary mb-3 m-4 text-center border-opacity-25"
            style={{ maxWidth: "25%" }}
          >
            <Link to="/admin/fresh-property/view-all">
              <div className="card-body  p-5 shadow-sm ">
                <p className="fw-medium">{allFreshBooking?.length}</p>
                <p className="fw-normal">All Fresh Project!</p>
                <small className="fw-light text-primary border-bottom border-primary border-3 pb-1">
                  View All
                </small>
              </div>
            </Link>
          </div>

          <div
            className="card border-primary mb-3 m-4 text-center border-opacity-25"
            style={{ maxWidth: "25%" }}
          >
            <Link to="/admin/fresh-property/view-all-Response">
              <div className="card-body  p-5 shadow-sm ">
                <p className="fw-medium">116</p>
                <p className="fw-normal">All Response!</p>
                <small className="fw-light text-primary border-bottom border-primary border-3 pb-1">
                  View All
                </small>
              </div>
            </Link>
          </div>

          <div
            className="card border-primary mb-3 m-4 text-center border-opacity-25"
            style={{ maxWidth: "25%" }}
          >
            <div className="card-body  p-5 shadow-sm ">
              <p className="fw-medium">116</p>
              <p className="fw-normal">All Fresh Project!</p>
              <small className="fw-light text-primary border-bottom border-primary border-3 pb-1">
                View All
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
