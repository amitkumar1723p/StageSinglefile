import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  acknowledgeProfile,
  ProfileUpdateAction,
} from "../../Action/userAction";
import "./AllRegistrationResponse.css";

// Define the functional component
export default function AllRegistrationResponse({}) {
  const dispatch = useDispatch();
  const [verified, setVerified] = useState();
  const [unverified, setUnverified] = useState();
  const [newRegistration, setNewRegistration] = useState();
  const [viewfilterUser, setViewfilterUser] = useState({});
  const [tableData, setTableData] = useState([]);

  // login user detail
  const { medata } = useSelector((state) => state.meDetails);

  // get all user excepation owner Admin agent
  const { data: AllUserResponseData } = useSelector((state) => {
    return state.AllUserResponse;
  });

  // CRTVerifyUser
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
        // console.log(viewfilterUser);
        filteredData = filteredData.filter(
          (item) => item?.CRTVerifyUser === true
        ); // Only verified
      } else if (viewfilterUser === "unverified") {
        filteredData = filteredData.filter(
          (item) => item?.CRTVerifyUser === false
        ); // Only unverified
        // console.log(viewfilterUser);
      } else if (viewfilterUser === "newUser") {
        filteredData = filteredData.filter(
          (item) => item?.acknowledge === false
        ); // Only new users
        // console.log(viewfilterUser);
      }

      // Set the filtered or full data
      setTableData(filteredData); // No need to spread here
    }
  }, [AllUserResponseData, viewfilterUser]);

  return (
    <>
      {/* Component content goes here */}
      <div className="container-fluid">
        <div className="filter-container">
          <div onClick={(e) => {
                  setViewfilterUser({}); // Reset to show all users
                }}
            className={
              Object.keys(viewfilterUser).length === 0
                ? "filter-item active"
                : "filter-item"
            }
          >
            <p className="filter-resposne">
              <small
                
              >
                All User ({AllUserResponseData?.data?.length})
              </small>
            </p>
          </div>
          <div 
          onClick={(e) => {
            setViewfilterUser("verified");
          }}
            className={
              viewfilterUser === "verified"
                ? "filter-item active"
                : "filter-item"
                
            }
          >
            <p className="filter-resposne">
              <small
                
              >
                Verified User ({verified?.length})
              </small>
            </p>
          </div>
          <div onClick={(e) => {
                  setViewfilterUser("unverified");
                }}
            className={
              viewfilterUser === "unverified"
                ? "filter-item active"
                : "filter-item"
            }
          >
            <p className="filter-resposne">
              <small
                
              >
                Un-Verified User ({unverified?.length})
              </small>
            </p>
          </div>

          <div  onClick={() => {
                setViewfilterUser("newUser");
                handleNumber();
              }}
            className={
              viewfilterUser === "newUser"
                ? "filter-item active"
                : "filter-item"
            }
          >
            <p
              className="filter-resposne"
             
            >
              <small>New User ({newRegistration?.length})</small>
            </p>
          </div>
        </div>

        <div className="table-container">
          <table className="main-response-section">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item, index) => {
                const date = new Date(item.updatedAt);
                const formattedDate = date
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")
                  .slice(2);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Name}</td>
                    <td>{item.email}</td>
                    <td>{item.Role}</td>
                    <td>{item.ContactNumber}</td>
                    <td>
                      {item.updatedAt && !isNaN(new Date(item.updatedAt))
                        ? new Date(item.updatedAt)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                            .slice(0, 8)
                        : "Invalid Date"}
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
