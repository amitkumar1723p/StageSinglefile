import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyVisitsAction,
  OwnerAllPostsVisitAction,
} from "../../../Action/userAction";
import { useNavigate } from "react-router-dom";

export default function OwnerPostAllVisits() {
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
  return (
    <>
      {OwnerPostsVisitsData?.success === true && OwnerPostsVisitsData?.myAllPostVisits?.length >0 &&(

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Date/Time</th>
              <th className="px-4 py-2 text-left">Property Id</th>
            </tr>
          </thead>
          <tbody>
            {OwnerPostsVisitsData.myAllPostVisits?.map((visit, i) => {
              const PostData = visit.PostData.PostId;
              const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`;
              return (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{visit.VisitUser?.Name}</td>
                  <td className="px-4 py-2">
                    {visit.VisitUser?.ContactNumber}
                  </td>
                  <td className="px-4 py-2">
                    <span>
                      {" "}
                      {new Date(visit.VisitDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span>
                      {formatTime(visit.VisitTime.From)} to
                      {formatTime(visit.VisitTime.To)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
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
      )}
    </>
  );
}
