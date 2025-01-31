import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./OfferRecived.css"; // Import the custom CSS for styling
import { useDispatch, useSelector } from "react-redux";
import { GetPost_BiddingDocumentAction } from "../../Action/userAction";
import { useNavigate, useParams } from "react-router-dom";
import HeaderCard from "./HeaderCard";
import { Admin_OwnerGetAllScheduleVisits } from "../../Action/postAction";
import SinglePostImageSlider from "../Post/SinglePostDetails/SinglePostImageSlider";
import WindowComponent from "../WindowComponent";
const OfferReceived = () => {
  const dispatch = useDispatch();
  const [showImageSlideBox, setshowImageSlideBox] = useState(false);
  const viewImageRefs = useRef([]);
  const Params = useParams();
  const navigate = useNavigate();
  const [CheckScheduleVisit, setCheckScheduleVisit] = useState([]);

  const { data: BidData } = useSelector((state) => {
    return state.OfferRecived;
  });
  const { data: ScheduleVisitsData } = useSelector((state) => {
    return state.ScheduleVisits;
  });
  // const [count, setcount] = useState(0);
  useEffect(() => {
    dispatch(GetPost_BiddingDocumentAction(Params.PostId));
    dispatch(Admin_OwnerGetAllScheduleVisits(Params.PostId));
  }, []);
  const [ImageData, setImageData] = useState([]);
  // Memoizing getScheduleVisitInfo to prevent unnecessary rerenders
  const getScheduleVisitInfo = useCallback(
    (userId) => {
      if (ScheduleVisitsData?.success) {
        const CheckUserVisit = ScheduleVisitsData.ScheduleVisits.filter(
          (VisitData) => {
            return VisitData.VisitUser?._id === userId;
          }
        );

        return CheckUserVisit;
      }
      return [];
    },
    [ScheduleVisitsData] // Dependency array ensures it re-runs only when ScheduleVisitsData changes
  );

  const formatReservePrice = useCallback((price) => {
    if (price >= 10000000) {
      return `₹ ${(Math.floor(price / 100000) / 100).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹ ${(Math.floor(price / 1000) / 100).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹ ${(Math.floor(price / 10) / 100).toFixed(2)} K`;
    }
    return `₹ ${price.toFixed(2)}`;
  }, []);
  useEffect(() => {
    if (BidData?.success == false) {
      navigate("/admin/allpost");
    }
  }, [BidData]);
  return (
    <>
      {/* <button
        onClick={() => {
          // setcount(count + 1);
        }}
      >
        {count}
      </button> */}
      <HeaderCard />

      {BidData &&
        BidData.success &&
        BidData.BidDocument.map((reciveOffer, index) => {
          const { Biddinguser } = reciveOffer;
         

          viewImageRefs.current[index] = React.createRef();
          return (
            <div key={index} className="offer-received-card">
              <div className="offer-received-header">
                <div className="offer-received-user-info">
                  <p className="offer-received-user-name">
                    {Biddinguser?.Name}
                  </p>

                  <span className="offer-received-phone-number">
                    {Biddinguser?.email}
                  </span>
                </div>
                <div className="offer-received-user-date">
                  <span className="offer-received-phone-number">
                    {Biddinguser?.ContactNumber}
                  </span>
                  <p className="offer-received-date ">
                    <span className="offer-received-date">
                      
                      {new Date(reciveOffer.createAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </p>
                </div>
                
                <div className="offer-received-property-info">
                  <p className="offer-received-property-details">
                    Schedule Visit: {}
                    {getScheduleVisitInfo(Biddinguser?._id)?.length > 0
                      ? `Yes (${
                          getScheduleVisitInfo(Biddinguser?._id)?.length
                        })`
                      : "No"}
                  </p>
                  

                  <p className="offer-received-pid">
                    Date and Time: :{" "}
                    <span className="offer-received-pid-number">
                      {getScheduleVisitInfo(Biddinguser?._id)?.length > 0 ? (
                        <>
                          {new Date(
                            getScheduleVisitInfo(Biddinguser?._id)[0].VisitDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </>
                      ) : null}
                      
                    </span>
                  </p>
                  {}
                </div>
                <div className="offer-received-footer">
                  <div className="offer-received-schedule-info">
                    <p>
                      Offer Made:
                      <span className="offer-received-status">
                        {" "}
                        {formatReservePrice(reciveOffer.BidPrice)}{" "}
                      </span>
                    </p>
                  </div>
                    <button
                    className="view-img-offer-admin"
                      ref={viewImageRefs.current[index]}
                      onClick={() => {
                        setImageData(reciveOffer.images);
                        setshowImageSlideBox(true);
                      }}
                    >
                      View Img
                    </button>
                </div>
              </div>
            </div>
          );
        })}

      {showImageSlideBox && (
        <WindowComponent
          ImageData={ImageData}
          Component={SinglePostImageSlider}
          BtnRef={viewImageRefs}
          SetShow={setshowImageSlideBox}
        />
      )}
    </>
  );
};

export default OfferReceived;
