import React, { useEffect, useState } from "react";
import { LoginUserPostAction } from "../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NoListThere from "./NoListThere";
import { Helmet } from "react-helmet";
import SingleCard from "./SingleCard";

export default function ShowLoginUserPost() {
  const dispatch = useDispatch();
  const location = useLocation();
  const update = location.pathname.includes("update");

  const [AllPost, setAllPost] = useState([]);
  const [PropertyAdType, setPropertyAddType] = useState("All");
  const [filterdPost, setFilterdPost] = useState([]);
  const [MarkRentOutPropertyId, setMarkRentOutPropertyId] = useState([]);
  const ButtonText = ["All", "Sale", "Rent"];

  // Get All Post by Login User
  const { loading, data } = useSelector((state) => state.GetPost);

  const { data: Alertdata } = useSelector((state) => {
    return state.userData;
  });
  console.log(Alertdata);
  // Fetch user posts on component mount
  useEffect(() => {
    if (!data) {
      dispatch(LoginUserPostAction());
      sessionStorage.removeItem("removeLoding-ReOpenAndRentOut");
    }

    //
  }, []);
  useEffect(() => {
    if (Alertdata?.RentOutPostId || Alertdata?.ReOpenPostId) {
      dispatch(LoginUserPostAction());
      sessionStorage.setItem("removeLoding-ReOpenAndRentOut", "true");
    }

    // When marking a post as Rent Out
    // if (Alertdata?.RentOutPostId) {
    //   let rentOutData = [];
    //   try {
    //     const sessionData = sessionStorage.getItem("RentOutPropertyId");
    //     if (Array.isArray(JSON.parse(sessionData))) {
    //       rentOutData = JSON.parse(sessionData);
    //     }
    //   } catch (e) {
    //     console.error("Error parsing RentOutPropertyId", e);
    //   }

    //   // Add new RentOutPostId to RentOut list (avoid duplicates)
    //   const updatedRentOutData = [Alertdata.RentOutPostId, ...rentOutData.filter(id => id !== Alertdata.RentOutPostId)];
    //   sessionStorage.setItem("RentOutPropertyId", JSON.stringify(updatedRentOutData));

    //   // Remove this ID from ReOpen list
    //   let reOpenData = [];
    //   try {
    //     const sessionData = sessionStorage.getItem("ReOpenPropertyId");
    //     if (Array.isArray(JSON.parse(sessionData))) {
    //       reOpenData = JSON.parse(sessionData);
    //     }
    //   } catch (e) {
    //     console.error("Error parsing ReOpenPropertyId", e);
    //   }

    //   const filteredReOpenData = reOpenData.filter(id => id !== Alertdata.RentOutPostId);
    //   sessionStorage.setItem("ReOpenPropertyId", JSON.stringify(filteredReOpenData));
    // }

    // // When marking a post as Re-Open
    // if (Alertdata?.ReOpenPostId) {
    //   let rentOutData = [];
    //   try {
    //     const sessionData = sessionStorage.getItem("RentOutPropertyId");
    //     if (Array.isArray(JSON.parse(sessionData))) {
    //       rentOutData = JSON.parse(sessionData);
    //     }
    //   } catch (e) {
    //     console.error("Error parsing RentOutPropertyId", e);
    //   }

    //   // Remove ReOpenPostId from RentOut list
    //   const filteredRentOutData = rentOutData.filter(id => id !== Alertdata.ReOpenPostId);
    //   sessionStorage.setItem("RentOutPropertyId", JSON.stringify(filteredRentOutData));

    //   // Add to ReOpen list
    //   let reOpenData = [];
    //   try {
    //     const sessionData = sessionStorage.getItem("ReOpenPropertyId");
    //     if (Array.isArray(JSON.parse(sessionData))) {
    //       reOpenData = JSON.parse(sessionData);
    //     }
    //   } catch (e) {
    //     console.error("Error parsing ReOpenPropertyId", e);
    //   }

    //   const updatedReOpenData = [Alertdata.ReOpenPostId, ...reOpenData.filter(id => id !== Alertdata.ReOpenPostId)];
    //   sessionStorage.setItem("ReOpenPropertyId", JSON.stringify(updatedReOpenData));
    // }
  }, [Alertdata]);

  // Filter and sort posts based on availability status
  useEffect(() => {
    if (!data || !data.Post) return;

    const soldOut = data.Post.filter(
      (item) => item.propertyStatus?.currentPropertyStatus === "sold out"
    );
    const available = data.Post.filter(
      (item) => item.propertyStatus?.currentPropertyStatus !== "sold out"
    );

    setFilterdPost([...available, ...soldOut]);
  }, [data]);

  // Update AllPost when filterdPost or PropertyAdType changes
  useEffect(() => {
    if (PropertyAdType === "Rent") {
      setAllPost(
        filterdPost.filter((e) => e.BasicDetails.PropertyAdType === "Rent")
      );
    } else if (PropertyAdType === "Sale") {
      setAllPost(
        filterdPost.filter((e) => e.BasicDetails.PropertyAdType === "Sale")
      );
    } else {
      setAllPost(filterdPost);
    }
  }, [filterdPost, PropertyAdType]);

  return (
    <>
      <Helmet>
        <title>My Listings - PropertyDekho247.com</title>
        <meta
          name="description"
          content="Manage all your property listings in one place. View, edit, or remove posts and keep them up to date on PropertyDekho247.com."
        />
        <link
          rel="canonical"
          href="https://www.propertydekho247.com/user/my-listing/"
        />
      </Helmet>

      {loading && !sessionStorage.getItem("removeLoding-ReOpenAndRentOut") ? (
        <Loader className="componentloader" />
      ) : (
        <>
          <h3 className="user-section-heading">{PropertyAdType} Post</h3>
          <div className="filter-btn-section">
            <div className="user-filter-section flex">
              <img src="/img/mage_filter.svg" alt="filter_icon" />
              {ButtonText.map((btntext, index) => (
                <button
                  key={index}
                  className={`btn-rent-filter ${
                    PropertyAdType === btntext ? "all-post-lisitng" : ""
                  }`}
                  onClick={() => setPropertyAddType(btntext)}
                >
                  {btntext}
                </button>
              ))}
            </div>
            <Link to="/user/post">
              <div className="add-new-lisitng">+ Add More Listings</div>
            </Link>
          </div>

          {AllPost.length > 0 ? (
            <div className="showpost my-listing-post">
              {AllPost.map((e, i) => (
                <SingleCard
                  key={i}
                  PostData={e}
                  setMarkRentOutPropertyId={setMarkRentOutPropertyId}
                  MarkRentOutPropertyId={MarkRentOutPropertyId}
                />
              ))}
            </div>
          ) : (
            <NoListThere />
          )}
        </>
      )}
    </>
  );
}
