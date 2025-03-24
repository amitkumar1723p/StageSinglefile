import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserAction, ProfileUpdateAction, UserRoleUpdation } from "../../Action/userAction";
import { acknowledgeProfile } from "../../Action/postAction";
import { Pointer } from "lucide-react";
import { FormatDate,FormatDateAndTime } from "../../utils/CommonFunction";
// import "./AllRegistrationResponse.css"
// Define the functional component
export default function AllRegistrationResponse({ }) {
  const dispatch = useDispatch();
  const [verified, setVerified] = useState();
  const [unverified, setUnverified] = useState();
  const [newRegistration, setNewRegistration] = useState();
  const [viewfilterUser, setViewfilterUser] = useState({});
  const [tableData, setTableData] = useState([]);
  const [checkNotify, setCheckNotfiy] = useState([]);
  const [require, setRequire] = useState([]);
  const [roleIndex, setRoleIndex] = useState(null);
  const [userRole, setUserRole] = useState(null);
  // login user detail
  const { medata } = useSelector((state) => state.meDetails);

  // get all user excepation owner Admin agent
  const { data: AllUserResponseData } = useSelector((state) => {
    return state.AllUserResponse;
  });

  const { loading, data: AllPost } = useSelector((state) => {
    return state.AdminGetAllPost;
  });
  // All notify or requirement
  const allData = useSelector((state) => state.AllNotifiesAndReq);

  useEffect(() => {
    const notification = allData?.data?.notifies;
    const requirement = allData?.data?.requirements;
    setCheckNotfiy(notification);
    setRequire(requirement);
  }, [allData]);




  useEffect(() => {
    if (Array.isArray(AllUserResponseData?.data)) {
      const verifiedUsers = AllUserResponseData.data.filter(
        (item) => item?.CRTVerifyUser === true
      );
      const unverifiedUsers = AllUserResponseData.data.filter(
        (item) => item?.CRTVerifyUser === false
      );

      const newRegistration = AllUserResponseData.data.filter(
        (item) => item?.acknowledge === false
      );

      setVerified(verifiedUsers);
      setUnverified(unverifiedUsers);
      setNewRegistration(newRegistration);
    } else {
      console.error("AllUserResponseData is undefined");
    }
  }, [AllUserResponseData]);

  const handleNumber = async () => {
    if (newRegistration.length > 0) {
      dispatch(acknowledgeProfile());
    }
  };

  useEffect(() => {
    if (AllUserResponseData?.data) {
      let filteredData = [...AllUserResponseData.data];

      if (viewfilterUser === "verified") {

        filteredData = filteredData.filter(
          (item) => item?.CRTVerifyUser === true
        ); // Only verified
      } else if (viewfilterUser === "unverified") {
        filteredData = filteredData.filter(
          (item) => item?.CRTVerifyUser === false
        ); // Only unverified

      } else if (viewfilterUser === "newUser") {
        filteredData = filteredData.filter(
          (item) => item?.acknowledge === false
        ); // Only new users
        // console.log(viewfilterUser);
      }

      // Set the filtered or full data
      setTableData(filteredData);
    }
  }, [AllUserResponseData, viewfilterUser]);


  // show alert data 
  const { data: adminAlertData, LodingType: adminAlertType, } = useSelector((state) => {
    return state.Post;
  });
  // console.log(adminAlertData)

  useEffect(() => {

    if (adminAlertData?.success === true && adminAlertType == "UserRoleUpdationRequest") {

      dispatch(getAllUserAction());
    }
  }, [adminAlertData])



  return (
    <>
      <div className="container-fluid" >
        <div className="d-flex flex-row mb-2 gap-2">
          <div
            className={
              Object.keys(viewfilterUser).length === 0
                ? " p-2 border "
                : "p-2 border"
            }
            style={{
              cursor: "pointer",
              backgroundColor:
                Object.keys(viewfilterUser).length === 0 ? "#037edb" : "",
              color: Object.keys(viewfilterUser).length === 0 ? "white" : "",
            }}
          >
            <p>
              <small
                // Default to muted if not empty
                onClick={(e) => {
                  setViewfilterUser({}); // Reset to show all users
                }}
              >
                All User ({AllUserResponseData?.data?.length})
              </small>
            </p>
          </div>
          <div
            className={
              viewfilterUser === "verified" ? " p-2 border" : "p-2 border"
            }
            style={{
              cursor: "pointer",
              backgroundColor: viewfilterUser === "verified" ? "#037edb" : "",
              color: viewfilterUser === "verified" ? "white" : "",
            }}
          >
            <p>
              <small
                onClick={(e) => {
                  setViewfilterUser("verified"); // Corrected to 'verified'
                }}
              >
                Otp-Verified ({verified?.length})
              </small>
            </p>
          </div>
          <div
            className={
              viewfilterUser === "unverified" ? " p-2 border" : "p-2 border"
            }
            style={{
              cursor: "pointer",
              backgroundColor: viewfilterUser === "unverified" ? "#037edb" : "",
              color: viewfilterUser === "unverified" ? "white" : "",
            }}
          >
            <p>
              <small
                onClick={(e) => {
                  setViewfilterUser("unverified");
                }}
              >
                OTP Un-Verified User ({unverified?.length})
              </small>
            </p>
          </div>

          <div
            className={
              viewfilterUser === "newUser" ? " p-2 border " : "p-2 border"
            }
            style={{
              cursor: "pointer",
              backgroundColor: viewfilterUser === "newUser" ? "#037edb" : "",
              color: viewfilterUser === "newUser" ? "white" : "",
            }}
          >
            <p
              onClick={() => {
                setViewfilterUser("newUser");
                handleNumber();
              }}
            >
              <small>New User ({newRegistration?.length})</small>
            </p>
          </div>
        </div>

        <div className=" border-top border-end border-start " style={{ maxHeight: "600px", overflow: 'scroll' }}>
          <table className="table table-hover">
            <thead className="table-info sticky-top z-0">
              <tr className="">

                <th scope="col" className="text-primary col-2 border-end">
                  <small>Date</small>
                </th>
                <th scope="col" className="text-primary col-1 border-end">
                  <small>Name </small>
                </th>
                <th scope="col" className="text-primary col-2 border-end">
                  <small> Role</small>
                </th>
                <th scope="col" className="text-primary col-1 border-end">
                  <small>Phone</small>
                </th>
                <th scope="col" className="text-primary col-1 border-end ">
                  <small>Email</small>
                </th>
                <th scope="col" className="text-primary col-1 border-end">
                  <small>Lisitng</small>
                </th>
                <th scope="col" className="text-primary col-1 border-end">
                  <small>Notify</small>
                </th>


              </tr>
            </thead>
            <tbody>
              {tableData?.map((item, index) => {
                return (
                  <tr key={index}>


                    <td className="text-light-emphasis border-end">
                      <small>
                        {
                          item?.createAt
                            ? FormatDateAndTime(item?.createAt)
                            : "..."
                        }
                      </small>
                      

                    </td>

                    <td className="text-light-emphasis border-end text-capitalize">
                      {item.Name ? (
                        <small>
                          {item.Name}
                        </small>
                      ) : (
                        <></>
                      )}
                    </td>
                    

                    <td className="text-light-emphasis border-end" >
                      {
                        roleIndex === index ? <div className="owner-user-role-submit-button d-flex gap-1 ">
                          <select name="" onChange={(e) => setUserRole(e.target.value)}>
                            <option value={item.Role}><small>{item.Role}</small></option>
                            <option value="Tenant"><small>Tenant</small></option>
                            <option value="Buyer"><small>Buyer</small></option>
                            {/* <option value="Seller"><small>Seller</small></option> */}
                            <option value="Property Owner"><small>Property Owner</small></option>
                            <option value="NRI"><small>NRI</small></option>
                            <option value="Channel Partner"><small>Channel Partner</small></option>
                          </select> <button className="border" onClick={() => {
                            setRoleIndex(null)
                            dispatch(UserRoleUpdation({
                              userId: item._id,
                              role: userRole
                            }))
                            // window.location.reload();

                          }}>✅</button></div> : <div onClick={() => {

                            setRoleIndex(index)

                          }}>{item.Role}</div>
                      }
                    </td>
                    <td className="text-light-emphasis border-end">
                      <small>{item.ContactNumber}</small>
                    </td>
                    <td className="text-light-emphasis border-end">
                      <small>{item.email}</small>
                    </td>

                    <td className="text-light-emphasis border-end ">
                      {AllPost?.Post?.some(
                        (post) => post?.CreatePostUser?._id === item._id
                      ) ? (
                        <small> Yes </small>
                      ) : (
                        <small> No </small>
                      )}
                    </td>

                    <td className="text-light-emphasis border-end" key={index}>
                      {checkNotify?.some(
                        (user) => user?.User?._id === item._id
                      ) ||
                        require?.some((user) => user?.RequirementUser?._id === item._id) ? (
                        <small>Yes</small>
                      ) : (
                        <small>No</small>
                      )}
                    </td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
