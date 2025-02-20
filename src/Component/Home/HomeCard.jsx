import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Post/PostCard";
import "./HomeCard.css";

import Loader from "../Loader/Loader";

// import NotifyForm from "../";/
import Notifyme from "./PropertyCard/NotifyMe";
import SingleCard from "../Post/SingleCard";
export default function HomeCard() {
  const dispatch = useDispatch();

  const { loading, data } = useSelector((state) => {
    return state.GetAllPost;
  });
  const [filterdPost,setFilterdPost] = useState(null);

  useEffect(()=>{

    function filter(){
        const soldout = data?.allPost?.filter((item)=>item.propertyStatus?.currentPropertyStatus==="sold out")
        const available = data?.allPost?.filter((item)=>item.propertyStatus?.currentPropertyStatus!=="sold out")

        setFilterdPost([...available,...soldout]);
        console.log(filterdPost)
    }
    filter()
  },[data])

  return (
    <>
      <div className="home">
        {data &&
          data.success === true &&
          (data.allPost.length > 0 ? (
            <div className="home-postContainer">
              <div className="allPostrender-showpost">
                {filterdPost?.map((e, i) => {
                  return <SingleCard key={i} PostData={e} index={i} />;
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
