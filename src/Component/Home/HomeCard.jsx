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
  const [allData,setAllData] = useState([]);

  useEffect(()=>{

    function filter(){
       if (!data || !data.allPost){
        return
       }else{
        
        const soldout = data?.allPost?.filter((item)=>item.propertyStatus?.currentPropertyStatus==="sold out")
        const available = data?.allPost?.filter((item)=>item.propertyStatus?.currentPropertyStatus!=="sold out")
      console.log(available,soldout)
        setFilterdPost([...available,...soldout]);
        console.log(filterdPost)
       }
    }
    filter()
  },[data])

  useEffect(()=>{
    console.log("this i ffatttt")

    setAllData(()=>{
      return filterdPost;
    });
  },[filterdPost])


  return (
    <>
      <div className="home">
        {data &&
          data.success === true &&
          (data.allPost.length > 0 ? (
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
