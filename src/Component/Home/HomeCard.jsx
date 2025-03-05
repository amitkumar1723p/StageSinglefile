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
   const { data: serachResponse } = useSelector((state) => {
      return state.serachResponse;
    });
  const [filterdPost, setFilterdPost] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    function filter() {
      if (!serachResponse || !serachResponse?.results) {
        return;
      } else {
        const soldout = serachResponse?.results?.filter(
          (item) => item.propertyStatus?.currentPropertyStatus === "sold out"
        );
        const available = serachResponse?.results?.filter(
          (item) => item.propertyStatus?.currentPropertyStatus !== "sold out"
        );
        // console.log(available, soldout);
        setFilterdPost([...available, ...soldout]);
        // console.log(filterdPost);
      }
    }
    filter();
  }, [serachResponse]);

  useEffect(() => {
    

    setAllData(() => {
      return filterdPost;
    });
  }, [filterdPost]);

   console.log(serachResponse?.results[0])
  return (
    <>
      <div className="home">
        {/* {serachResponse &&
          serachResponse.success === true &&
          (serachResponse?.results?.length > 0 ? (
            <div className="home-postContainer">
              <div className="allPostrender-showpost">
                {serachResponse?.results?.map((e, i) => {
                  console.log(e)
                  return <SingleCard key={i} PostData={e} index={i} />;
                })}
              </div>
            </div>
          ) : (
            <Notifyme />
          ))} */}

<div className="home-postContainer">
              <div className="allPostrender-showpost">
                {serachResponse?.results?.map((e, i) => {
                
                  return <SingleCard key={i} PostData={e} index={i} />;
                })}
              </div>
            </div>
      </div>
    </>
  );
}
