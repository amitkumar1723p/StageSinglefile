import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Post/PostCard";
import "./HomeCard.css";

import Loader from "../Loader/Loader";

// import NotifyForm from "../";/
import Notifyme from "./PropertyCard/NotifyMe";
export default function HomeCard() {
  const dispatch = useDispatch();

  const { loading, data } = useSelector((state) => {
    return state.GetAllPost;
  });
  

  return (
    <>
      <div className="home">
        {data &&
          data.success === true &&
          (data.allPost.length > 0 ? (
            <div className="home-postContainer">
              <div className="home-showpost">
                {data.allPost.map((e, i) => {
                  return <PostCard key={i} PostData={e} index={i} />;
                })}
              </div>
            </div>
          ) : (
            <Notifyme />
          ))}
      </div>
    </>
  );
}
