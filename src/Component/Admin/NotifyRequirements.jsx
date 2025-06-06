import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NotifyRequirements.css"; // External CSS
import axios from "axios";
import { FormatDate } from "../../utils/CommonFunction";
const NotifyRequirements = () => {
  const [activeTab, setActiveTab] = useState("notifies");
  const [showUnacknowledged, setShowUnacknowledged] = useState("all"); // Toggle state
  const [enterdDate, setEnterdDate] = useState("");
  const { loading, data } = useSelector(
    (state) => state?.AllNotifiesAndReq || {}
  );
  const allData = useSelector((state) => state?.AllNotifiesAndReq);
  const [unacknowledgedNotifies, setUnacknowledgedNotifies] = useState([]);
  const [acknowledgedNotifies, setAcknowledgedNotifies] = useState([]);
  const [unacknowledgedRequirements, setUnacknowledgedRequirements] = useState(
    []
  );
  const [acknowledgedRequirements, setAcknowledgedRequirements] = useState([]);
  const [newNotifiesId, setNewNotifiesId] = useState([]);
  const [newReqId, setNewReqId] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [madeReqAck, setMadeReqAck] = useState(false);
  const [madeNotifyAck, setMadeNotifyAck] = useState(false);
  const [apiType, setApiType] = useState("");
  // console.log(data)
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  useEffect(() => {
    // console.log(enterdDate)
    const currentData =
      activeTab === "notifies"
        ? allData?.data?.notifies
        : allData?.data?.requirements;
    const filterdData = currentData?.filter((item) => {
      if (enterdDate) {
        return (
          enterdDate === new Date(item.createAt).toISOString().split("T")[0]
        );
      } else {
        return item;
      }
    });
    setDisplayData(filterdData);
  }, [enterdDate]);
  useEffect(() => {
    if (allData?.data) {
      const notifies = allData.data.notifies || [];
      const requirements = allData.data.requirements || [];
      setDisplayData(notifies);
      setAcknowledgedNotifies(notifies);
      setAcknowledgedRequirements(requirements);
      // Filtering Unacknowledged Notifies
      const filteredUnacknowledgedNotifies = notifies.filter(
        (item) => !item.Acknowledged
      );
      const unacknowledgedNotifiesId = notifies
        .filter((item) => !item.Acknowledged)
        .map((item) => item._id); // Extract only _id

      // Filtering Unacknowledged Requirements
      const filteredUnacknowledgedRequirements = requirements.filter(
        (item) => !item.Acknowledged
      );
      const unacknowledgedReqId = requirements
        .filter((item) => !item.Acknowledged)
        .map((item) => item._id); // Extract only _id

      // Update state
      // console.log(unacknowledgedNotifiesId);
      setUnacknowledgedNotifies(filteredUnacknowledgedNotifies);
      setUnacknowledgedRequirements(filteredUnacknowledgedRequirements);
      setNewReqId(unacknowledgedReqId);
      // console.log("this is ",unacknowledgedReqId)
      setNewNotifiesId(unacknowledgedNotifiesId); // Assuming setNewNotifyId is the correct function for notifies
    }
  }, [allData]); // Runs whenever `allData` updates
  //  async function handleSubmit(){
  //   console.log("called",newNotifiesId)

  //     try {
  //      var res;
  //      console.log("before")
  //       if(apiType === "Notify" && newNotifiesId.length > 0 && !madeNotifyAck){
  //         console.log("innnn")
  //         res = await axios.post(`${process.env.REACT_APP_API_URL}/notify/acknowledeg`,{ids:newNotifiesId}, {
  //           headers: { "Content-Type": "application/json" },

  //           withCredentials: true,
  //         })

  //         if(res.data.success){
  //           setMadeNotifyAck(true)
  //         }
  //       }
  //       if(apiType==="Requests" && newReqId.length > 0 && !madeReqAck){
  //         res = await axios.post(`${process.env.REACT_APP_API_URL}/property-requirement/acknowledge`,{ids:newReqId}, {
  //           headers: { "Content-Type": "application/json" },

  //           withCredentials: true,
  //         })
  //         console.log(res)
  //         if(res.data.success){
  //           setMadeReqAck(true)
  //         }
  //       }

  //       // console.log(res)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  async function handleSubmit() {
   

    try {
      let res;

      if (apiType === "Notify" && newNotifiesId.length > 0 && !madeNotifyAck) {
       
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/notify/acknowledeg`,
          { ids: newNotifiesId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setMadeNotifyAck(true);
        }
      }

      if (apiType === "Requests" && newReqId.length > 0 && !madeReqAck) {
        
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/property-requirement/acknowledge`,
          { ids: newReqId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setMadeReqAck(true);
        }
      }
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [apiType]);

  return (
    <div className="notify-requirements-container">
      {/* Tab Buttons */}
      <div className="notify-tab-buttons">
        <button
          className={`notify-requirements-tab ${activeTab === "notifies" ? "active" : ""
            }`}
          onClick={() => {
            setActiveTab("notifies");
            setDisplayData(acknowledgedNotifies);
            setShowUnacknowledged("all");
          }}
        >
          Notifies ({data?.notifies.length})
        </button>
        <button
          className={`notify-requirements-tab ${activeTab === "requirements" ? "active" : ""
            }`}
          onClick={() => {
            setActiveTab("requirements");
            setShowUnacknowledged("all");
            setDisplayData(acknowledgedRequirements);
          }}
        >
          Requirements ({data?.requirements.length})
        </button>
      </div>

      {/* Toggle Buttons for Unacknowledged */}
      <div className="toggle-buttons">
        {activeTab === "notifies" ? (
          <>
            {" "}
            <button
              className={` notify-button-toggale-one ${showUnacknowledged === "all" ? "button-toggle" : " "
                }`}
              onClick={() => {
                setShowUnacknowledged("all");

                setDisplayData(acknowledgedNotifies);
              }}
            >
              All
            </button>
            <></>{" "}
            {!enterdDate && (
              <button
                className={`notify-button-toggale-one ${showUnacknowledged === "new" ? "button-toggle" : " "
                  }`}
                onClick={() => {
                  setShowUnacknowledged("new");
                  setDisplayData(unacknowledgedNotifies);
                  setApiType("Notify");
                }}
              >
                ({unacknowledgedNotifies.length}) New Response
              </button>
            )}
          </>
        ) : (
          <>
            {" "}
            <button
              className={`notify-button-toggale-one ${showUnacknowledged === "all" ? "button-toggle" : " "
                }`}
              onClick={() => {
                setShowUnacknowledged("all");
                setDisplayData(acknowledgedRequirements);
              }}
            >
              {" "}
              All
            </button>
            {!enterdDate && (
              <button
                className={`notify-button-toggale-one ${showUnacknowledged === "new" ? "button-toggle" : " "
                  }`}
                onClick={() => {
                  setShowUnacknowledged("new");
                  setDisplayData(unacknowledgedRequirements);
                  setApiType("Requests");
                }}
              >
                ({unacknowledgedRequirements.length}) New Response
              </button>
            )}
          </>
        )}
        <input type="date" onChange={(e) => setEnterdDate(e.target.value)} />
      </div>

      {/* Table with Skeleton Loading */}
      <div className="notify-requirements-table-container">
        {loading ? (
          <SkeletonTable rows={5} columns={activeTab === "notifies" ? 5 : 4} />
        ) : (
          <>
            
            <table className="notify-requirements-table">
              <thead className="notify-requirements-table-thead">
                <tr>
                  {activeTab === "notifies" ? (
                    <>

                      <th className="notify-requirements-th text-nowrap">Project Name</th>
                      <th className="notify-requirements-th text-nowrap">Name</th>
                      <th className="notify-requirements-th text-nowrap">Phone</th>
                      <th className="notify-requirements-th text-nowrap">Date </th>
                      <th className="notify-requirements-th text-nowrap">BHK</th>
                      <th className="notify-requirements-th text-nowrap">Room</th>
                      <th className="notify-requirements-th text-nowrap">
                        Floor Preference
                      </th>
                      
                    </>
                  ) : (
                    <>

                      <th className="notify-requirements-th text-nowrap">Name</th>
                      <th className="notify-requirements-th text-nowrap">Phone</th>
                      <th className="notify-requirements-th text-nowrap">Date</th>
                      <th className="notify-requirements-th text-nowrap">Property type</th>

                      <th className="notify-requirements-th text-nowrap">BHK / Area</th>
                      <th className="notify-requirements-th text-nowrap">
                        Floor Preference
                      </th>
                      <th className="notify-requirements-th text-nowrap">Budget</th>
                      <th className="notify-requirements-th text-nowrap" >Project Name</th>
                      <th className="notify-requirements-th text-nowrap">Possession Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayData?.length > 0 ? (
                  displayData?.map((item, ind) => (
                    <tr key={item._id}>
                      {activeTab === "notifies" ? (
                        <>
                          <td className="notify-requirements-td text-nowrap">
                            {item.ProjectName}
                          </td>

                          <td className="notify-requirements-td text-nowrap">
                            {item?.User?.Name}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item?.User?.ContactNumber}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {

                               FormatDate(item.createAt)
                            }
                          </td>
                        
                          <td className="notify-requirements-td text-nowrap">
                            {item?.BHKType} 
                          </td>

                          <td className="notify-requirements-td text-nowrap ">
                            {item?.Room?.join(" , ")}
                          </td>

                          <td className="notify-requirements-td text-nowrap">
                            {item.FloorPreference}
                          </td>
                          
                        </>
                      ) : (
                        <>

                          <td className="notify-requirements-td text-nowrap">
                            {item?.RequirementUser?.Name}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item?.RequirementUser?.ContactNumber}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {
                          FormatDate(item?.createAt)  
                            }
                          </td>
                        
                          <td className="notify-requirements-td text-nowrap">
                            {item.PropertyType}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item.BHKType} {item?.plotSize} {item?.plotUnit} 
                          </td>

                          <td className="notify-requirements-td text-nowrap">
                            {item.FloorPreference}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item.Budget} {item.unit}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item.ProjectName}
                          </td>
                          <td className="notify-requirements-td text-nowrap">
                            {item.PossessionStatus}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === "notifies" ? 5 : 4}
                      className="notify-requirements-no-data"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonTable = ({ rows, columns }) => {
  return (
    <table className="notify-requirements-table skeleton-table">
      <thead>
        <tr>
          {[...Array(columns)].map((_, index) => (
            <th key={index} className="notify-requirements-th">
              <div className="skeleton skeleton-header"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <td key={colIndex} className="notify-requirements-td">
                <div className="skeleton skeleton-cell"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotifyRequirements;
