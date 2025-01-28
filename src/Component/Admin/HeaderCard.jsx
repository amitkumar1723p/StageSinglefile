import React, { useEffect } from "react";
import { GetSinglePostAction } from "../../Action/postAction";
import { useParams } from "react-router-dom";
import AdminListingCard from "./AdminListingCard";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderCard() {
  const dispatch = useDispatch();
  const Params = useParams();
  const { loading, data: getSinglePostData } = useSelector((state) => {
    return state.GetSinglePost;
  });
  const { data: PostVerifyData, LodingType } = useSelector((state) => {
    return state.Post;
  });
  useEffect(() => {
    dispatch(GetSinglePostAction(Params.PostId));
  }, []);
  useEffect(() => {
    if (PostVerifyData && (LodingType === "VerifyPostActionRequest" || LodingType==="ReOpenPostActionRequest")) {
      if (PostVerifyData.success === true) {
        dispatch(GetSinglePostAction(Params.PostId));
      }
    }
    // eslint-disable-next-line
  }, [PostVerifyData]);
  return (
    <div>
      {getSinglePostData && getSinglePostData.success == true && (
        <>
      

          <AdminListingCard PostData={getSinglePostData.SinglePost} />
        </>
      )}
    </div>
  );
}
