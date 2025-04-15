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

  useEffect(() => {
    dispatch(getAllFreshProjectAction({ RouteType: "AdminRoutes" }));
  }, []);

  console.log(projectId);

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
    console.log();
    if (adminAlertData && ["projectStatusRequest"].includes(LodingType)) {
      if (adminAlertData.
        success == true) {
        dispatch(getAllFreshProjectAction({ RouteType: "AdminRoutes" }));
      }
    }
  }, [adminAlertData]);

  // if (
  //     adminAlertData &&
  //     (LodingType === "RemoveAssignPropertyRequest" ||
  //       LodingType === "Admin_AssignedRequest")
  //   ) {
  //     if (adminAlertData.success === true) {
  //       setAssignProperty([]);
  //       setSelectAll(false);

  //       dispatch(GetAllAssignProperty());
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, [adminAlertData]);

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
                      {" "}
                      {item?.status === false ? <>Active</> : <>In-Active</>}
                    </p>

                    <div className="col-6 d-flex">
                      <Link to={`/admin/fresh-property/edit/${item?._id}`}>
                        <p className="d-flex justify-content-end">edit</p>
                      </Link>
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
