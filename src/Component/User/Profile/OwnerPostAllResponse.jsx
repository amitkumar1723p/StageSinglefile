import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyVisitsAction,
  OwnerAllPostsVisitAction,
} from "../../../Action/userAction";
import { useNavigate } from "react-router-dom";
import "./OwnerPostAllVisit.css";
export default function OwnerPostAllResponse() {
  const navigate = useNavigate();
  const { data: OwnerPostsVisitsData } = useSelector((state) => {
    return state.OwnerPostsVisits;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OwnerAllPostsVisitAction());
  }, []);
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

  // const offerReciveInfo = useCallback(
  //   ({ scheduleVistUser, PostId }) => {
  //     if (OwnerPostsVisitsData?.success) {
  //       const checkoffers = OwnerPostsVisitsData.myAllPostOffers?.filter(
  //         (reciveoffer) => {
  //           return (
  //             reciveoffer.Biddinguser?._id === scheduleVistUser &&
  //             PostId === reciveoffer.PostData.PostId?._id
  //           );
  //         }
  //       );

  //       return checkoffers;
  //     }
  //     return [];
  //   },
  //   [OwnerPostsVisitsData] // Dependency array ensures it re-runs only when ScheduleVisitsData changes
  // );

  const formatReservePrice = (price) => {
    if (price >= 10000000) {
      return `₹ ${(Math.floor(price / 100000) / 100).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹ ${(Math.floor(price / 1000) / 100).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹ ${(Math.floor(price / 10) / 100).toFixed(2)} K`;
    } else {
      return `₹ ${price?.toFixed(2)}`;
    }
  };
  return (
    <>
      {OwnerPostsVisitsData?.success === true &&
        OwnerPostsVisitsData?.userOfferAndVisit?.length > 0 && (
          <div className="owner-post-vists-overflow-x-auto">
            <p className="owner-post-vists-schedule-visit">My Schedule Visit</p>
            <table className="owner-post-vists-table">
              <thead>
                <tr className="owner-post-vists-table">
                  <th className="owner-post-vists-table-cell heading-name-sehedule-visit">
                    Name
                  </th>
                  <th className="owner-post-vists-table-cell  heading-name-sehedule-visit ">
                    Mobile
                  </th>
                  <th className="owner-post-vists-table-cell heading-name-sehedule-visit  ">
                    Date/Time
                  </th>

                  <th className="owner-post-vists-table-cell  heading-name-sehedule-visit">
                    Submit Offers
                  </th>
                  <th className="owner-post-vists-table-cell  heading-name-sehedule-visit">
                    Schedule Visits
                  </th>
                  <th className="owner-post-vists-table-cell  heading-name-sehedule-visit">
                    Offer Price
                  </th>
                  <th className="owner-post-vists-table-cell  heading-name-sehedule-visit">
                    Property Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {OwnerPostsVisitsData.userOfferAndVisit?.map((data, i) => {
                  const PostData = data.PostData.PostId;
                  const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`;
                  return (
                    <tr key={i}>
                      {/* Name  */}
                      <td className="owner-post-vists-table-cell">
                        {data?.UserData?.Name}
                      </td>

                      {/* Mobile  */}
                      <td className="owner-post-vists-table-cell">
                        {data?.UserData?.ContactNumber}
                      </td>

                      {/* Date/Time  */}
                      <td className="owner-post-vists-table-cell">
                        <span>
                          {data?.ScheduleVisit?.length > 0 ? (
                            <>
                              {/* Print Maximum Date  */}
                              {/* <span>
                                {data?.ScheduleVisit.map(
                                  (item) => new Date(item.VisitDate)
                                ) // Convert to Date objects
                                  .reduce((max, current) =>
                                    current > max ? current : max
                                  ) // Get highest date
                                  .toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                              </span> */}

                              {/* Maximum Date And Time  */}
                              <span>
                                {
                                  data?.ScheduleVisit?.map((item) => {
                                    // Combine VisitDate and VisitTime.From into a valid ISO format string: "YYYY-MM-DDTHH:mm"
                                    const dateTimeString = `${
                                      item.VisitDate.split("T")[0]
                                    }T${item.VisitTime.From}:00`; // Append seconds to time
                                    const dateObject = new Date(dateTimeString);

                                    // Check if the date is valid
                                    if (isNaN(dateObject)) {
                                      console.log(
                                        "Invalid Date:",
                                        dateTimeString
                                      );
                                      return new Date(0); // Return a fallback invalid date
                                    }

                                    return dateObject;
                                  })
                                    .reduce(
                                      (max, current) =>
                                        current.getTime() > max.getTime()
                                          ? current
                                          : max,
                                      new Date(0)
                                    ) // Find the maximum date/time
                                    .toLocaleString("en-US", {
                                      // Format the date as "Feb 21, 2025, 3:16 PM"
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    }) // Format the max date and time
                                }
                              </span>
                            </>
                          ) : (
                            "NA"
                          )}
                        </span>
                        <span>
                          {/* {formatTime(data.VisitTime.From)} */}
                          {/* to */}
                          {/* {formatTime(data.VisitTime.To)} */}
                        </span>
                      </td>

                      {/* offer Submit  (Yes /NO) */}
                      <td className="owner-post-vists-table-cell">
                        {data?.receiveoffer?.length}
                      </td>

                      {/* ScheduleVisits  */}
                      <td className="owner-post-vists-table-cell">{data?.ScheduleVisit?.length}</td>
                      {/* Offer PRice  */}
                      <td className="owner-post-vists-table-cell">
                        <span className="white-space-nowrap">
                          {" "}
                          {data?.receiveoffer?.length > 0
                            ? formatReservePrice(
                                Math.max(
                                  ...data.receiveoffer.map(
                                    (item) => item.BidPrice
                                  )
                                )
                              )
                            : "NA"}{" "}
                        </span>
                      </td>
                      {/* Property Id  */}
                      <td className="owner-post-vists-table-cell">
                        <span
                          className="owner-post-vists-post-id-btn"
                          onClick={(e) => {
                            let url = `/post-detail/${PostName.toLowerCase()
                              .replaceAll(" ", "-")
                              .replace(",", "")
                              .replaceAll("/", "-")}-${PostData._id}`;

                            navigate(`${url}`);
                          }}
                        >
                          {PostData?._id}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
}
