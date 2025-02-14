import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  acknowledgeProfile,
  ProfileUpdateAction,
} from "../../Action/userAction";
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

  //   CRTVerifyUser
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
      let filteredData =[...AllUserResponseData.data];
  
      if (viewfilterUser === "verified") {
        console.log(viewfilterUser)
        filteredData = filteredData.filter(item => item?.CRTVerifyUser === true);  // Only verified
      } else if (viewfilterUser === "unverified") {
        filteredData = filteredData.filter(item => item?.CRTVerifyUser === false);  // Only unverified
        console.log(viewfilterUser)
      } else if (viewfilterUser === "newUser") {
        filteredData = filteredData.filter(item => item?.acknowledge === false);  // Only new users
        console.log(viewfilterUser)
      }
  
      // Set the filtered or full data
      setTableData(filteredData);  // No need to spread here
    }
  }, [AllUserResponseData, viewfilterUser]); 
  

 

  return (
    <>
      {/* Component content goes here */}
      {/* {AllUserResponseData?.data.map((item)=>{
return <h1>All Registration Responses{item.Name}</h1>
      })} */}
      <div className="container-fluid">
      <div className="d-flex flex-row mb-3">
  <div className={Object.keys(viewfilterUser).length === 0 ? " p-2 border bg-primary text-white" : "p-2 border"} >
  <p>
  <small
     // Default to muted if not empty
    onClick={(e) => {
      setViewfilterUser({});  // Reset to show all users
    }}
  >
    All User ({AllUserResponseData?.data?.length})
  </small>
</p>

  </div>
  <div className={viewfilterUser ===  "verified" ? " p-2 border bg-primary text-white" : "p-2 border"}>
    <p>
      <small
        onClick={(e) => {
          setViewfilterUser("verified");  // Corrected to 'verified'
        }}
      >
        Verified User ({verified?.length})
      </small>
    </p>
  </div>
  <div className={viewfilterUser=== "unverified" ? " p-2 border bg-primary text-white" : "p-2 border"}>
    <p>
      <small
        onClick={(e) => {
          setViewfilterUser("unverified");
        }}
      >
        Un-Verified User ({unverified?.length})
      </small>
    </p>
  </div>

  <div className={viewfilterUser==="newUser" ? " p-2 border bg-primary text-white" : "p-2 border"}>
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

        <div className="border-top">
          <table className="table table-hover">
            <thead className="table-info ">
              <tr className="">
                <th scope="col" className="text-primary col-1">
                  <small>S.no</small>
                </th>
                <th scope="col" className="text-primary col-2">
                  <small>Name</small>
                </th>
                <th scope="col" className="text-primary col-3">
                  <small>Email</small>
                </th>
                <th scope="col" className="text-primary col-2">
                  <small>Role</small>
                </th>
                <th scope="col" className="text-primary col-2">
                  <small>Contact</small>
                </th>

                <th scope="col" className="text-primary col-2">
                  <small>Date</small>
                </th>
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
                  // Format the date to "dd-mm-yy"

                  <tr key={index}>
                    <th scope="row" className="text-light-emphasis">
                      <small>{index + 1}</small>
                    </th>
                    <td className="text-light-emphasis">
                      <small>{item.Name}</small>
                    </td>
                    <td className="text-light-emphasis">
                      <small>{item.email}</small>
                    </td>
                    <td className="text-light-emphasis">
                      <small>{item.Role}</small>
                    </td>
                    <td className="text-light-emphasis">
                      <small>{item.ContactNumber}</small>
                    </td>
                    <td className="text-light-emphasis">
                      <small>
                        {" "}
                        {item.updatedAt && !isNaN(new Date(item.updatedAt))
                          ? new Date(item.updatedAt)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                              .slice(0, 8)
                          : "Invalid Date"}
                      </small>
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
