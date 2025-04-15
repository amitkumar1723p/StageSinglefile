import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Post/PostCard";
import "./HomeCard.css";

import Loader from "../Loader/Loader";

// import NotifyForm from "../";/
import Notifyme from "./PropertyCard/NotifyMe";
import SingleCard from "../Post/SingleCard";
export default function HomeCard({data}) {
  const dispatch = useDispatch();
  console.log("data",data)

  const { loading } = useSelector((state) => {
    return state.GetAllPost;
  });
  const [filterdPost, setFilterdPost] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    function filter() {
      if (!data) {
        return;
      } else {
        const soldout =data?.filter(
          (item) => item.propertyStatus?.currentPropertyStatus === "sold out"
        );
        const available = data?.filter(
          (item) => item.propertyStatus?.currentPropertyStatus !== "sold out"
        );
        
        setFilterdPost([...available, ...soldout]);
        
      }
    }
    filter();
  }, [data]);

  useEffect(() => {
    

    setAllData(() => {
      return filterdPost;
    });
  }, [filterdPost]);

  return (
    <>
      <div className="home">
       
        
      {
          loading ?   <div className="allPostrender-showpost">
          {
            Array.from({ length: 9 }).map((_, index) => (<AllPostSkeleton key={index} />))
          }
        </div>:
           
          (data?.length > 0 ? (

            <div className="home-postContainer">
              <div className="allPostrender-showpost">
                {allData?.map((e, i) => {
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
const AllPostSkeleton = () => {

  return (
    <div className="all-post-skeleton-card">
      <div className="all-post-skeleton-image"></div>

      <div className="all-post-skeleton-text all-post-skeleton-title"></div>
      <div className="all-post-skeleton-text all-post-skeleton-subtitle-1"></div>
      <div className="all-post-skeleton-text all-post-skeleton-subtitle"></div>

      <div className="all-post-skeleton-info-container">
        <div className="all-post-skeleton-info"></div>
        <div className="all-post-skeleton-info"></div>
      </div>

      <div className="all-post-skeleton-footer">
        <div className="all-post-skeleton-button"></div>
        <div className="all-post-skeleton-button"></div>
      </div>
    </div>
  );
}