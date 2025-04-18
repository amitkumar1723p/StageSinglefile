import React, { useEffect } from "react";
import { GetDeletedPostsAction, GetSinglePostAction } from "../../Action/postAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();
  const navigate =useNavigate()
  useEffect(() => {
    // dispatch(GetSinglePostAction(Params.PostId));

    if (location.pathname.includes("/admin/schedule-visit/deleted-post")) {
      dispatch(GetSinglePostAction(Params.PostId, true));
    } else if(location.pathname.includes("/admin/recive-offer/deleted-post")){
      dispatch(GetSinglePostAction(Params.PostId, true));
    } else {
      dispatch(GetSinglePostAction(Params.PostId));
    }

    // if (location.pathname.includes("/admin/deleted-post")) {
    //
    //     } else {
    //       //  function not get single-post-details
    //

    //     }
  }, []);
  useEffect(() => {
    if (
      PostVerifyData &&
      [
        "VerifyPostActionRequest",
        "ReOpenPostActionRequest-AdminRoutes",
        "showVeirifyPostIconRequest",
      ].includes(LodingType)
    ) {
      if (PostVerifyData.success === true) {
        dispatch(GetSinglePostAction(Params.PostId));
      }
    }


    if (PostVerifyData && ["RestorePostRequest" ,"DeletePostRequest"].includes(LodingType)) {
    if(PostVerifyData.success==true){

        if(LodingType=="RestorePostRequest"){
          navigate("/admin/deleted-post")
          dispatch(GetDeletedPostsAction())
        }  
          
         if(LodingType=="DeletePostRequest"){
          navigate("/admin/allpost")
         }
     
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
