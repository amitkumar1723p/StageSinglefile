import { useDispatch, useSelector } from "react-redux";
import {
  getAllFreshProjectAction,
  projectStatusAction,
} from "../../../Action/freshProjectAction";
import { useEffect, useState } from "react";
import { FreshProjectFilter } from "./FreshProjectFilter";
import { Link, Outlet } from "react-router-dom";

export function FreshProjectViewAll() {
  const dispatch = useDispatch();
  const [projectId, setprojectId] = useState(null);
  const { data: allFreshProjectData } = useSelector((state) => {
    return state.allFreshProjectData;
  });
  const allFreshBooking = allFreshProjectData?.projectData || [];
  console.log(allFreshBooking)

  const HandleFreshbookingUrl = (projectName)=>{
    return projectName?.split(" ").join("-").toLowerCase();
  }

  const handleProjectStatus = (id) => {
    setprojectId(id);
  };

  useEffect(() => {
    if (projectId !== null) {
      dispatch(projectStatusAction(projectId));

      setprojectId(null);
    }
  }, [projectId]);


  //  acitve in active status ==true  update get all post data again
  const {
    data: adminAlertData,
    LodingType,
  } = useSelector((state) => {
    return state.Post;
  });
  useEffect(() => {
   
    if (adminAlertData && ["projectStatusRequest"].includes(LodingType)) {
      if (adminAlertData.success == true) {
        alert("Please confirm if you would like to proceed with changing the property status")
        dispatch(getAllFreshProjectAction({ RouteType: "AdminRoutes" }));
      }
    }
  }, [adminAlertData]);



  return (
    <>
      <div className="">
        <FreshProjectFilter />

        <div className="container">
          {allFreshBooking?.map((item, index) => (
            <div
              className="card mb-3"
              key={index}
              style={{ width: "80%", height: "200px" }}
            >
              <div className="d-flex g-0">
                {/* Image Column (col-4) */}
                <div className="col-4">
                  <img
                  loading="lazy"
                    src={item?.bannerImage?.url}
                    className="rounded-start"
                    alt="..."
                    style={{
                      height: "200px",
                      width: "100%",
                      backgroundPosition: "center",
                    }}
                  />
                </div>

                {/* Text Column (col-8) */}
                <div className="col-8">
                  <div className="card-body d-flex">
                    <div className="col-6 ">
                      <p className="card-text">
                        {item?.projectBasicDetail?.projectName}
                      </p>
                    </div>

                    <p
                      className="px-5"
                      onClick={() => handleProjectStatus(item?._id)}
                    >
                     
                     <div className="active-section-freshbook">{item?.status === false ? <>Active</> : <>InActive</>} </div> 
                    </p>

                    <div className="col-6 d-flex gap-4">
                      <Link to={`/admin/fresh-property/edit/${item?._id}`}>
                        <p className="d-flex justify-content-end">Edit</p>
                      </Link>
                      <Link to={`/fresh-bookings/project-name/${HandleFreshbookingUrl(item?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(item?.projectBasicDetail?.locality)}/${item?.projectBasicDetail?.projectCity}/${item._id}`}> <button className="active-section-freshbook border-0 ">View Property </button></Link>
                     
                    </div>
                    <div>
           
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
