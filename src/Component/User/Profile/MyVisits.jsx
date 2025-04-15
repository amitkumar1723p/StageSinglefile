import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyVisitsAction } from "../../../Action/userAction";
import "./MyVisits.css"; // Import the vanilla CSS file
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import { FormatDate } from "../../../utils/CommonFunction";
export default function MyVisits() {
  const { data: MyVisitsData } = useSelector((state) => {
    return state.MyVisits;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMyVisitsAction());
  }, []);
 const navigate =useNavigate()
  const formatTime = useCallback((time24) => {
    if (time24) {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    }
    return "N/A";
  }, []);

  return (
    <>{

    MyVisitsData &&
    MyVisitsData?.success === true && (
      <div className="myvisit-overflow-x-auto">
           <Helmet>
                
                <title>My Visits - PropertyDekho247.com</title>
                <meta name="description" content="View and manage the properties you've visited on PropertyDekho247.com. Keep track of your browsing history and revisit any listings you've shown interest in."></meta>
                <link rel="canonical" href="https://www.propertydekho247.com/user/my-visits/" />
            </Helmet>
        <p className="myvisit-schedule-visit">My Schedule Visit</p>
        <table className="myvisit-table">
          <thead>
            <tr className="myvisit-table-header">
              <th className="myvisit-table-cell">Date</th>
              <th className="myvisit-table-cell">Visit Time</th>
              <th className="myvisit-table-cell">Property Name</th>
              <th className="myvisit-table-cell">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {MyVisitsData.ScheduleVisits?.map((visit) => {
              const PostData = visit?.PostData?.PostId;
              const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`;

              return (
                <tr key={visit._id}>
                  <td className="myvisit-table-cell">
                    {FormatDate(visit.VisitDate)}
                     
                  </td>
                  <td className="myvisit-table-cell">
                    {formatTime(visit.VisitTime.From)}
                     {/* to{" "} */}
                    {/* {formatTime(visit.VisitTime.To)} */}
                  </td>
                  <td className="myvisit-table-cell">{PostName}</td>
                  <td className="myvisit-table-cell"  > <span className="myvisit-post-id-btn" onClick={(e) => {
                        let url = `/post-detail/${PostName.toLowerCase()
                          .replaceAll(" ", "-")
                          .replace(",", "")
                          .replaceAll("/", "-")}-${PostData?._id}`;

                        navigate(`${url}`);
                      }}>{PostData?._id} </span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {MyVisitsData.ScheduleVisits.length==0 &&
           <> <div class="user-all-noreponse-container">
           <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/User-all-response.png" alt="No Response Yet" class="user-all-noreponse-img" />
           <h2 class="user-all-noreponse-title">No Response Yet – Looks Like There’s Nothing to Review</h2>
           <p class="user-all-noreponse-text">
               No activity detected. As soon as responses come in, they’ll show up on this screen.
           </p>
       </div></>
        }
      </div>
    )
    
   }
   <> {
  
    MyVisitsData?.ScheduleVisits?.length === 0 && <div class="user-all-noreponse-container">
    <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/User-all-response.png" alt="No Response Yet" class="user-all-noreponse-img" />
    <h2 class="user-all-noreponse-title">No Scheduled Visits Yet – Looks Like There’s Nothing to Review</h2>
    <p class="user-all-noreponse-text">
        No activity detected. As soon as Scheduled Visits come in, they’ll show up on this screen.
    </p>
</div>
   }</>
    </>
  );
}
