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

  const ButtonText = ["All", "Sale", "Rent"];

  // Get All Post by Login User
  const { loading, data } = useSelector((state) => state.GetPost);

  // Fetch user posts on component mount
  useEffect(() => {
    dispatch(LoginUserPostAction());
  }, [dispatch]);

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

  // Update `AllPost` when `filterdPost` or `PropertyAdType` changes
  useEffect(() => {
    if (PropertyAdType === "Rent") {
      setAllPost(filterdPost.filter((e) => e.BasicDetails.PropertyAdType === "Rent"));
    } else if (PropertyAdType === "Sale") {
      setAllPost(filterdPost.filter((e) => e.BasicDetails.PropertyAdType === "Sale"));
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
          content="Manage all your property listings in one place. View, edit, or remove your active posts and keep your listings up to date on PropertyDekho247.com."
        />
        <link rel="canonical" href="https://www.propertydekho247.com/user/my-listing/" />
      </Helmet>

      {loading ? (
        <Loader className="componentloader" />
      ) : AllPost.length > 0 ? (
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
                <SingleCard key={i} PostData={e} />
              ))}
            </div>
          ) : (
            <NoListThere />
          )}
        </>
      ) : (
        <NoListThere />
      )}
    </>
  );
}
