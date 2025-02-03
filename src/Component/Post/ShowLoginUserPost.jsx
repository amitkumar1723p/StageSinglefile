import React, { useEffect, useState } from "react";
import { LoginUserPostAction } from "../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { AlertAction } from "../../Action/alertAction";
import { useLocation, useNavigate } from "react-router-dom";
import NoListThere from "./NoListThere";

export default function ShowLoginUserPost() {
  const dispatch = useDispatch();
  const location = useLocation();
  const update = location.pathname.includes("update");
  const [AllPost, setAllPost] = useState([]);
  const [PropertyAdType, setPropertyAddType] = useState("All");
  const navigate = useNavigate();

  const ButtonText = ["All", "Sale", "Rent"];
  // Get All Post by Login User
  const { loading, data } = useSelector((state) => {
    return state.GetPost;
  });

  useEffect(() => {
    if (data) {
      if (data.success == true) {
        if (PropertyAdType == "Rent") {
          let allRentPost = data.Post.filter((e) => {
            return e.BasicDetails.PropertyAdType == "Rent";
          });
          setAllPost(allRentPost);
        } else if (PropertyAdType == "Sale") {
          let allSellPost = data.Post.filter((e) => {
            return e.BasicDetails.PropertyAdType == "Sale";
          });
          setAllPost(allSellPost);
        } else if (PropertyAdType == "All") {
          setAllPost(data.Post);
        }
      }
    }
    // eslint-disable-next-line
  }, [data, PropertyAdType]);

  useEffect(() => {
    dispatch(LoginUserPostAction());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* <div className="showpost"> */}
      {
        <>
          {loading ? (
            <Loader className="componentloader" />
          ) : // AllPost.length > 0 ? <>
          data?.Post?.length > 0 ? (
            <>
              <h3 className="user-section-heading">{PropertyAdType} Post</h3>
              <div className="filter-btn-section">
                <div className="user-filter-section flex">
                  <img src="/img/mage_filter.svg" alt="mage_filter" />
                  {ButtonText.map((btntext, index) => {
                    return (
                      <button
                        key={index}
                        className={`btn-rent-filter ${
                          PropertyAdType == btntext ? "all-post-lisitng" : ""
                        }`}
                        onClick={() => {
                          setPropertyAddType(btntext);
                        }}
                      >
                        {btntext}
                      </button>
                    );
                  })}
                </div>
                <Link to="/user/post">
                  <div className="add-new-lisitng">+ Add More Listings </div>
                </Link>
              </div>

              {AllPost.length > 0 ? (
                <div className="showpost">
                  {AllPost.map((e, i) => {
                    return <PostCard key={i} PostData={e} />;
                  })}
                </div>
              ) : (
                <NoListThere />
              )}
            </>
          ) : (
            <NoListThere />
          )}
        </>
      }
      {/* </div> */}
    </>
  );
}
