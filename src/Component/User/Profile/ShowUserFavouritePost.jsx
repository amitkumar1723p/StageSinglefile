import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../../Post/PostCard";

export default function ShowUserFavouritePost() {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  return (
    <>
      <h3 className="Shortlisted-prop">Shortlisted Property</h3>
     
      {/* {AllPost.length > 0 ? (
                <div className="showpost">
                  {AllPost.map((e, i) => {
                    return <PostCard key={i} PostData={e} />;
                  })}
                </div> */}

      <div className="showpost">
        {medata && medata.user&&medata.user.FavouritePost &&
          medata.user.FavouritePost.map((post, i) => {
            return <PostCard key={i} PostData={post.PostData.PostId} />;
          })}
      </div>
    </>
  );
}
