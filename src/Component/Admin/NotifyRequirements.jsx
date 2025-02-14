import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NotifyRequirements.css"; // External CSS
import axios from "axios";

const NotifyRequirements = () => {
  const [activeTab, setActiveTab] = useState("notifies");
  const [showUnacknowledged, setShowUnacknowledged] = useState("all"); // Toggle state
  const[enterdDate,setEnterdDate]=useState("")

  const { loading, data } = useSelector((state) => state?.AllNotifiesAndReq || {});
  

  const allData = useSelector(state => state.AllNotifiesAndReq);

const [unacknowledgedNotifies, setUnacknowledgedNotifies] = useState([]);
const [acknowledgedNotifies, setAcknowledgedNotifies] = useState([]);
const [unacknowledgedRequirements, setUnacknowledgedRequirements] = useState([]);
const [acknowledgedRequirements, setAcknowledgedRequirements] = useState([]);
const [newNotifiesId,setNewNotifiesId]=useState([]);
const [newReqId,setNewReqId]= useState([]);
const [displayData, setDisplayData] = useState([]);

// console.log(data)

useEffect(()=>{
  console.log(enterdDate)
  const currentData = activeTab === "notifies" ? allData?.data?.notifies : allData?.data?.requirements
    const filterdData=currentData?.filter((item=> {
      if(enterdDate){
       return enterdDate === new Date(item.createAt).toISOString().split('T')[0]
      }else{
        return item
      }
    }
))
    
    setDisplayData(filterdData)
},[enterdDate])

useEffect(() => {
  if (allData?.data) {
    const notifies = allData.data.notifies || [];
    const requirements = allData.data.requirements || [];

    setDisplayData(notifies);
    setAcknowledgedNotifies(notifies);
    setAcknowledgedRequirements(requirements);

    // Filtering Unacknowledged Notifies
    const filteredUnacknowledgedNotifies = notifies.filter(item => !item.Acknowledged);
    const unacknowledgedNotifiesId = notifies
      .filter(item => !item.Acknowledged)
      .map(item => item._id); // Extract only _id

    // Filtering Unacknowledged Requirements
    const filteredUnacknowledgedRequirements = requirements.filter(item => !item.Acknowledged);
    const unacknowledgedReqId = requirements
      .filter(item => !item.Acknowledged)
      .map(item => item._id); // Extract only _id

    // Update state
    console.log(unacknowledgedNotifiesId);
    setUnacknowledgedNotifies(filteredUnacknowledgedNotifies);
    setUnacknowledgedRequirements(filteredUnacknowledgedRequirements);
    setNewReqId(unacknowledgedReqId);
    setNewNotifiesId(unacknowledgedNotifiesId); // Assuming setNewNotifyId is the correct function for notifies
  }
}, [allData]); // Runs whenever `allData` updates

 async function handleSubmit(){
  console.log(newNotifiesId)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/notify/acknowledeg`,{ids:newNotifiesId}, {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="notify-requirements-container">
      {/* Tab Buttons */}
      <div className="notify-tab-buttons">
        <button
          className={`notify-requirements-tab ${activeTab === "notifies" ? "active" : ""}`}
          onClick={() => { setActiveTab("notifies"); 
            setDisplayData(acknowledgedNotifies)

          }}
        >
          Notifies
        </button>
        <button
          className={ `notify-requirements-tab ${activeTab === "requirements" ? "active" : ""}`}
          onClick={() => { setActiveTab("requirements"); console.log(showUnacknowledged);  setDisplayData(acknowledgedRequirements) }}
        >
          Requirements
        </button>
      </div>

      {/* Toggle Buttons for Unacknowledged */}
      <div className="toggle-buttons">
        {activeTab === "notifies" ? (
        <>  <button   className={` notify-button-toggale-one ${showUnacknowledged==="all" ? "button-toggle" : " "}`} onClick={() =>{ setShowUnacknowledged("all");
          console.log(showUnacknowledged)
          setDisplayData(acknowledgedNotifies)
        }}>All</button> 
       <></> {
          !enterdDate &&    <button className={`notify-button-toggale-one ${showUnacknowledged ==="new" ? "button-toggle" : " "}`} onClick={() => {setShowUnacknowledged("new");
            setDisplayData(unacknowledgedNotifies);
            handleSubmit()
           }}>({unacknowledgedNotifies.length}) New Response</button>   
         
        }</>
        ) : (
          <>  <button   className={`notify-button-toggale-one ${showUnacknowledged==="all" ? "button-toggle" : " "}`} onClick={() => {setShowUnacknowledged("all");
                  setDisplayData(acknowledgedRequirements)
          }}> All</button> 
          
          {
          !enterdDate && <button className={`notify-button-toggale-one ${showUnacknowledged==="new" ? "button-toggle" : " "}`} onClick={() => {setShowUnacknowledged("new");
            setDisplayData(unacknowledgedRequirements)
          }}>({unacknowledgedRequirements.length}) New Response</button>    
         }
          
          </>
      

         
        )}
        <input type="date" onChange={(e)=>setEnterdDate(e.target.value)} />
      </div>

  {/* Table with Skeleton Loading */}
  <div className="notify-requirements-table-container">
        {loading ? (
          <SkeletonTable rows={5} columns={activeTab === "notifies" ? 5 : 4} />
        ) : (<>
        {/* <p className="notify-requirement-lable">{activeTab == "notifies" ? notifies.length  : requirements.length} {activeTab === "notifies" ? "Notifications" : " Requirements"}</p> */}
         <table className="notify-requirements-table">
            <thead>
              <tr>
                {activeTab === "notifies" ? (
                  <>
                    <th className="notify-requirements-th">serial no.</th>
                    <th className="notify-requirements-th">Name</th>
                    <th className="notify-requirements-th">Phone</th>
                    <th className="notify-requirements-th">Date </th>
                    <th className="notify-requirements-th">Room</th>
                    <th className="notify-requirements-th">BHK Type</th>
                    <th className="notify-requirements-th">Floor Preference</th>
                    <th className="notify-requirements-th">Project Name</th>
                    {/* <th className="notify-requirements-th">Email</th> */}
                  </>
                ) : (
                  <>
                    <th className="notify-requirements-th">serial no.</th>
                    <th className="notify-requirements-th">Name</th>
                    <th className="notify-requirements-th">Phone</th>
                    <th className="notify-requirements-th">Date</th>
                    {/* <th className="notify-requirements-th">Name</th> */}

                    <th className="notify-requirements-th">BHK Type</th>
                    <th className="notify-requirements-th">Floor Preference</th>
                    <th className="notify-requirements-th">Budget</th>
                    <th className="notify-requirements-th">Project Name</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData?.length > 0 ? (
                displayData?.map((item,ind) => (
                  <tr key={item._id}>
                    {activeTab === "notifies" ? (
                      <>
                        <td className="notify-requirements-td">{ind+1}</td>
                        <td className="notify-requirements-td">{item.Name || item?.User?.Name}</td>
                        <td className="notify-requirements-td">{item?.User?.ContactNumber}</td>
                        <td className="notify-requirements-td">
                        {new Date(item.createAt).toISOString().split('T')[0]}
                        </td>
                        <td className="notify-requirements-td ">{item?.Room?.join(" , ")}</td>

                        <td className="notify-requirements-td">{item.BHKType}</td>
                        <td className="notify-requirements-td">{item.FloorPreference}</td>
                        <td className="notify-requirements-td">{item.ProjectName}</td>
                        {/* <td className="notify-requirements-td">{item?.User?.Name}</td> */}
                      </>
                    ) : (
                      <>
                        <td className="notify-requirements-td">{ind+1}</td>
                        <td className="notify-requirements-td">{item?.RequirementUser?.Name}</td>
                        <td className="notify-requirements-td">{item?.RequirementUser?.ContactNumber}</td>
                        <td className="notify-requirements-td">
                        {new Date(item.createAt).toISOString().split('T')[0]}
                        </td>
                        {/* <td className="notify-requirements-td">{item?.Room?.map((room)=><span>{room}</span>)}</td> */}
                        <td className="notify-requirements-td">{item.BHKType}</td>

                        <td className="notify-requirements-td">{item.FloorPreference}</td>
                        <td className="notify-requirements-td">{item.Budget}</td>
                        <td className="notify-requirements-td">{item.ProjectName}</td>
                        </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeTab === "notifies" ? 5 : 4} className="notify-requirements-no-data">
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
