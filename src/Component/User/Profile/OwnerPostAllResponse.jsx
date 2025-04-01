import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyVisitsAction,
  OwnerAllPostsVisitAction,
} from "../../../Action/userAction";
import { useNavigate } from "react-router-dom";
import "./OwnerPostAllResponse.css";
import { FormatDate } from "../../../utils/CommonFunction";
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

  // let MaskContactnumber = (ContactNumber) => {
  //   const phoneStr = ContactNumber.toString();
  //   return phoneStr.slice(0, 2) + "XXXX" + phoneStr.slice(6);
  // };

  let MaskContactnumber = useCallback((ContactNumber) => {
    if (ContactNumber) {
      const phoneStr = ContactNumber.toString();
      return phoneStr.slice(0, 2) + "XXXX" + phoneStr.slice(6);
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
      OwnerPostsVisitsData?.userOfferAndVisit?.length > 0 ? (
        <div className="owner-post-response-overflow-x-auto">
          <p className="owner-post-response-heading"> All Response</p>
          <table className="owner-post-response-table">
            {" "}
            <thead>
              <tr className="owner-post-response-table">
                <th className="owner-post-response-table-cell heading-name-sehedule-visit">
                  Name
                </th>
                <th className="owner-post-response-table-cell  heading-name-sehedule-visit ">
                  Mobile
                </th>
                <th className="owner-post-response-table-cell heading-name-sehedule-visit  ">
                  Date/Time
                </th>

                <th className="owner-post-response-table-cell  heading-name-sehedule-visit">
                  Submit Offers
                </th>
                <th className="owner-post-response-table-cell  heading-name-sehedule-visit">
                  Schedule Visits
                </th>
                <th className="owner-post-response-table-cell  heading-name-sehedule-visit">
                  Offer Price
                </th>
                <th className="owner-post-response-table-cell  heading-name-sehedule-visit">
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
                    <td className="owner-post-response-table-cell">
                      {data?.UserData?.Name}
                    </td>

                    {/* Mobile  */}
                    <td className="owner-post-response-table-cell">
                      {MaskContactnumber(data?.UserData?.ContactNumber)}
                      {}
                    </td>

                    {/* Date/Time  */}
                    <td className="owner-post-response-table-cell">
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
      const dateTimeString = `${item.VisitDate.split("T")[0]}T${item.VisitTime.From}:00`; // Append seconds to time
      const dateObject = new Date(dateTimeString);

      // Check if the date is valid
      if (isNaN(dateObject)) {
       
        return new Date(0); // Return a fallback invalid date
      }

      return dateObject;
    })
      .reduce(
        (max, current) => (current.getTime() > max.getTime() ? current : max),
        new Date(0)
      ) // Find the maximum date/time
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(/(\w{3}) (\d{2}), (\d{2})/, "$1-$2-$3") // Convert "Apr 16, 25" to "Apr-16-25"
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
                    <td className="owner-post-response-table-cell">
                      {data?.receiveoffer?.length}
                    </td>

                    {/* ScheduleVisits  */}
                    <td className="owner-post-response-table-cell">
                      {data?.ScheduleVisit?.length}
                    </td>
                    {/* Offer PRice  */}
                    <td className="owner-post-response-table-cell">
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
                    <td className="owner-post-response-table-cell">
                      <span
                        className="owner-post-response-post-id-btn"
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
      ) : (
        <>
          {" "}
          <div class="user-all-noreponse-container">
            <img
              src="/img/User-all-response.png"
              alt="No Response Yet"
              class="user-all-noreponse-img"
            />
            <h2 class="user-all-noreponse-title">
              No Response Yet – Looks Like There’s Nothing to Review
            </h2>
            <p class="user-all-noreponse-text">
              No activity detected. As soon as responses come in, they’ll show
              up on this screen.
            </p>
          </div>
        </>
      )}
    </>
  );
}
