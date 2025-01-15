import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_OwnerGetAllPostAction } from "../../Action/postAction";
import Loader from "../Loader/Loader";
import AdminListingCard from "./AdminListingCard";
// import PostCard from "../Post/PostCard";
import { useLocation } from "react-router-dom";
import "./AdminListingCard.css";
import { GetAllAdminAction } from "../../Action/userAction";
import { adminAssigned } from "../../Action/postAction";
import { UserContext } from "../CreateContext/CreateContext";

export default function AllPost() {
  const dispatch = useDispatch();

  const location = useLocation();
   const { medata } = useSelector((state) => {
      return state.meDetails;
    });

  const { loading, data } = useSelector((state) => {
    return state.AdminGetAllPost;
  });

  const {
    data: PostVerifyData,
    LodingType,
    loading: PostVerifyLoding,
  } = useSelector((state) => {
    return state.Post;
  });

  useEffect(() => {
    if (location.pathname.endsWith("/allpost/verify")) {
      dispatch(Admin_OwnerGetAllPostAction(true));
    } else if (location.pathname.endsWith("/allpost/unverify")) {
      dispatch(Admin_OwnerGetAllPostAction(false));
    } else {
      dispatch(Admin_OwnerGetAllPostAction());
    }

    // eslint-disable-next-line
  }, [location.pathname]);
  useEffect(() => {
    if (
      PostVerifyData &&(LodingType === "VerifyPostActionRequest" ||LodingType === "ReOpenPostActionRequest")
    ) {
      if (PostVerifyData.success === true) {
        if (location.pathname.endsWith("/allpost/verify")) {
          dispatch(Admin_OwnerGetAllPostAction(true));
        } else if (location.pathname.endsWith("/allpost/unverify")) {
          dispatch(Admin_OwnerGetAllPostAction(false));
        } else {
          dispatch(Admin_OwnerGetAllPostAction());
        }
      }
    }
    // eslint-disable-next-line
  }, [PostVerifyData]);

  // filter data based on the active or in-active
  const [active, setActive] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // const [inactive, setInActive] = useState(null); // Use null to indicate no filter
  const newData = data?.Post || [];

  // const [filteredData, setFilteredData] = useState(newData);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSearch = () => {};

  const handleActive = () => {
    setActive(true); // Set active to true when the "Active" button is clicked
  };
  const handleInactive = () => {
    setActive(false); // Set inactive to false when the "Inactive" button is clicked
  };
  const handleAllPost = () => {
    setActive(null);
  };

  const filteredPosts = useMemo(() => {
    let posts = [...newData];

    // Filter based on 'active' (PostVerify)
    if (active === true) {
      posts = posts.filter((item) => item.PostVerify === true);
    }

    if (active === false) {
      posts = posts.filter((item) => item.PostVerify === false);
    }

    // Filter based on 'inputValue'
    if (inputValue !== "") {
      posts = posts.filter((item) => {
        const contactNumber = item.CreatePostUser?.ContactNumber;
        return (
          item._id.toLowerCase().includes(inputValue.toLowerCase()) ||
          (item.CreatePostUser?.Name &&
            item.CreatePostUser.Name.toLowerCase().includes(
              inputValue.toLowerCase()
            )) ||
          (item.LocationDetails?.ProjectName &&
            item.LocationDetails.ProjectName.toLowerCase().includes(
              inputValue.toLowerCase()
            )) ||
          (contactNumber && String(contactNumber).includes(inputValue)) // Convert to string before calling includes
        );
      });
    }

    return posts; // Return the filtered posts
  }, [newData, active, inputValue]);
  // +============================================================filter work end here

  // State to track the selected role+++++++++++++ Assign work start here
const{propertyId,setPropertyId}=useContext(UserContext)

  const { loading: loadingGet, data: dataAdmin } = useSelector((state) => {
    return state.AdminData;
  });

 useEffect(() => {
    if (medata && medata.IsAuthenticated) {
      if (medata?.user?.Role === "Owner") {
        dispatch(GetAllAdminAction());
      }
    }
    
  }, []);

  // console.log(dataGet, "Get All Admin");
  const [selectedRole, setSelectedRole] = useState("");
  const [adminId, setAdminId] = useState("");
 

  // Handle change in the select dropdown
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  const handleAssign = (e) => {
    setAdminId(e.target.value);
  };
  useEffect(() => {
   
    if (adminId) {
      
      dispatch(adminAssigned(propertyId,adminId));
      setSelectedRole("")
      setPropertyId([])
      setAdminId("")
    }
    // console.log("hit")
  }, [adminId]);
  // assign work end here+++++++++++++++++++

  return (
    <div className="showpost">
      {
        <>
          {PostVerifyLoding || loading ? (
            <Loader className="componentloader" />
          ) : (
            <div className="Admin-property-post-card-main-box">
              <p>All Listing</p>
              <div className="filter-section-property">
                <div>
                  {" "}
                  <img src="/img/FilteImg.png" alt="FilteImg" />
                </div>
                {active !== null ? (
                  <div onClick={handleAllPost} className="ActiveFill">
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
              </div>
              <div className="select-section-admin">
                <span>Select All</span>
                <p>Active Listing</p>
                {/* <p> Assign to User </p> */}
         {medata?.user?.Role === "Owner"?  <p>   <select
                  id="cars"
                  onChange={handleRoleChange}
                  value={selectedRole}
                  className="selectAssign"
                >
                  <option value="">Assign to </option>
                  <option value={`Admin`}>Admin</option>
                  <option value={`ChannelPartner`}>Channel Partner</option>
                  <option value={`Agent`}>Agent</option>
                  <option value={`Subadmin`}>Subadmin</option>
                </select>
                </p> 
:null} 
                {selectedRole=== "Admin" ? (
                  <p>
                    <select
                      id="adminOptions"
                      className="selectAssign"
                      onChange={handleAssign}
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
                ) :selectedRole === "Agent" ? (
                  <p>
                    <select id="adminOptions" className="selectAssign">
                      <option value="">Select Agent</option>
                      <option value="agent1">Agent-1</option>
                      <option value="agent2">Agent-2</option>
                    </select>
                  </p>
                ) : null}
                {/* end here conditionally render  */}
              </div>

              {filteredPosts.length > 0 ? (
                filteredPosts.length &&
                filteredPosts.map((e, i) => {
                  return <AdminListingCard key={i} index={i} PostData={e} />;
                })
              ) : (
                <>
                  {data && data.success && data.Post.length > 0 ? (
                    data.Post.map((e, i) => {
                      return (
                        <AdminListingCard key={i} index={i} PostData={e} />
                      );
                    })
                  ) : (
                    <p>No posts available</p>
                  )}
                </>
              )}

              {/* {data &&
                data.success &&
                data.Post.map((e, i) => {
                  return <AdminListingCard key={i} index={i} PostData={e} />;
                })}  */}
            </div>
          )}
        </>
      }
    </div>
  );
}
