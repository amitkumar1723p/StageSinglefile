import React, { useEffect, useRef, useState } from "react";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPost_BiddingDocumentAction,
  LogoutAction,
  VerifyBidAction,
} from "../../../Action/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { GetSinglePostAction } from "../../../Action/postAction";
import WindowComponent from "../../WindowComponent";
import SinglePostImageSlide from "./SinglePostImageSlider";
// SinglePostDetails
export default function BiddingData({ SinglePostData }) {
  const dispatch = useDispatch();
  const Params = useParams();
  const navigate = useNavigate();
  const [showImageSlideBox, setshowImageSlideBox] = useState(false);
  const [ImageData, setImageData] = useState([]);

  const viewImageRefs = useRef([]);
  const {
    loading: BidVerifyLoading,
    LodingType,
    data,
  } = useSelector((state) => {
    return state.Post;
  });

  useEffect(() => {
    if (data) {
      if (data.success == true) {
        // dispatch(GetPost_BiddingDocumentAction(PostId));
        dispatch(GetSinglePostAction(SinglePostData.SinglePost._id));
      }

    
    }
  }, [data]);
  const processedUsers = new Set();
  return (
    <>
      <div className="all-bid-data-container">
        {/* {LodingType && LodingType == "VerifyBidRequest" && BidVerifyLoading ? (
        <Loader className="componentloader" />
      ) : (
          */}
        <>
          <div className="bid-box">
            <p>Name</p>
            <p>Price</p>
            <p>Property Id</p>
            <p> Status </p>
            <p>Document</p>
          </div>

          {SinglePostData.BiddingDocument.map((bid, index) => {
            viewImageRefs.current[index] = React.createRef();

            const isDuplicateUser = processedUsers.has(bid.Biddinguser);
            processedUsers.add(bid.Biddinguser);
            return (
              <div className="bid-box" key={index}>
               
                <p> {bid.Biddinguser?.Name} </p>
                <p>{bid.BidPrice}</p>
                <p>{bid.PostData.PostId}</p>
                <>
                  {bid.BidVerify && (
                    //  bid.Postid
                    <button
                      onClick={() => {
                        let Confrimbox = window.confirm(
                          "Are you Sure un-Verify This Bid"
                        );
                        if (Confrimbox == true) {
                          let biddata = { BidVerify: false };
                          let bidid = bid._id;
                          dispatch(VerifyBidAction({ biddata }, bidid));
                          //   dispatch(VerifyPostAction({ postdata }, postid));
                        }
                      }}
                    >
                      {" "}
                      UnVerify{" "}
                    </button>
                  )}

                  {bid.BidPrice >
                    SinglePostData.SinglePost.PricingDetails.ExpectedPrice &&
                  !isDuplicateUser ? (
                    <>
                      {!bid.BidVerify && (
                        <button
                          onClick={() => {
                            let Confrimbox = window.confirm(
                              "Are you Sure Verify This Bid"
                            );
                            if (Confrimbox == true) {
                              let biddata = { BidVerify: true };
                              let bidid = bid._id;
                              dispatch(VerifyBidAction({ biddata }, bidid));
                              //   dispatch(VerifyPostAction({ postdata }, postid));
                            }
                          }}
                        >
                          Verify{" "}
                        </button>
                      )}
                    </>
                  ) : (
                    "X"
                  )}
                </>
                <button
                  ref={viewImageRefs.current[index]}
                  onClick={() => {
                    setshowImageSlideBox(true);
                    setImageData(bid.images);
                  }}
                >
                  {" "}
                  View Img
                </button>
              </div>
            );
          })}
        </>
      </div>

      {showImageSlideBox && (
        <WindowComponent
          ImageData={ImageData}
          Component={SinglePostImageSlide}
          BtnRef={viewImageRefs}
          SetShow={setshowImageSlideBox}
        />
      )}
    </>
  );
}
