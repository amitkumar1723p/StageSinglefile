import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_OwnerGetAllPostAction,
  GetAllAssignProperty,
} from "../../Action/postAction";
import Loader from "../Loader/Loader";
import AdminListingCard from "./AdminListingCard";
// import PostCard from "../Post/PostCard";
import { useLocation, useSearchParams } from "react-router-dom";
import "./AdminListingCard.css";
import { GetAllAdminAction } from "../../Action/userAction";
import { adminAssigned } from "../../Action/postAction";
import { UserContext } from "../CreateContext/CreateContext";

export default function AllPost({
  setAssignProperty,
  AssignProperty,
  SearchPostId,
}) {
  const dispatch = useDispatch();
  const [OwnerPosts, setOwnerPosts] = useState([]);
  const location = useLocation();
  // const { medata } = useSelector((state) => {
  //   return state.meDetails;
  // });

  const { loading, data } = useSelector((state) => {
    return state.AdminGetAllPost;
  });

  //  Assign Property Code

  // const [active, setActive] = useState(null);
  // const [inputValue, setInputValue] = useState("");

   
  // const [inactive, setInActive] = useState(null); // Use null to indicate no filter

  // filter data based on the active or in-active
  // const newData = data?.Post || [];

  // // const [filteredData, setFilteredData] = useState(newData);
  // const handleChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  // const handleSearch = () => {};

  // const handleActive = () => {
  //   setActive(true); // Set active to true when the "Active" button is clicked
  // };
  // const handleInactive = () => {
  //   setActive(false); // Set inactive to false when the "Inactive" button is clicked
  // };
  // const handleAllPost = () => {
  //   setActive(null);
  // };

  // const filteredPosts = useMemo(() => {
  //   let posts = [...newData];

  //   // Filter based on 'active' (PostVerify)
  //   if (active === true) {
  //     posts = posts.filter((item) => item.PostVerify === true);
  //   }

  //   if (active === false) {
  //     posts = posts.filter((item) => item.PostVerify === false);
  //   }

  //   // Filter based on 'inputValue'
  //   if (inputValue !== "") {
  //     posts = posts.filter((item) => {
  //       const contactNumber = item.CreatePostUser?.ContactNumber;
  //       return (
  //         item._id.toLowerCase().includes(inputValue.toLowerCase()) ||
  //         (item.CreatePostUser?.Name &&
  //           item.CreatePostUser.Name.toLowerCase().includes(
  //             inputValue.toLowerCase()
  //           )) ||
  //         (item.LocationDetails?.ProjectName &&
  //           item.LocationDetails.ProjectName.toLowerCase().includes(
  //             inputValue.toLowerCase()
  //           )) ||
  //         (contactNumber && String(contactNumber).includes(inputValue)) // Convert to string before calling includes
  //       );
  //     });
  //   }

  //   return posts; // Return the filtered posts
  // }, [newData, active, inputValue]);
  // +============================================================filter work end here

  useEffect(() => {
    //  data?.Post?.length
    if (data?.Post) {
      setOwnerPosts(data.Post);
    }
  }, [data]);

  useEffect(() => {
    if (data?.Post) {
      if (SearchPostId.length > 0) {
        //   let a = data.Post.find((post) => {
        //   return post._id == SearchPostId;
        // });

        let posts = data.Post.filter((item) => {
          const contactNumber = item.CreatePostUser?.ContactNumber;

          return (
            item._id.toLowerCase().includes(SearchPostId.toLowerCase()) ||
            ( item?.CreatePostUser?.Name.toLowerCase().includes(
                SearchPostId.toLowerCase()
              )) ||
            ( item.LocationDetails.ProjectName.toLowerCase().includes(
                SearchPostId.toLowerCase()
              )) ||
            (contactNumber && String(contactNumber).includes(SearchPostId)) // Convert to string before calling includes
          );
        });

        setOwnerPosts(posts);
        // if (posts) {
        //   setOwnerPosts(posts);

        //   // Filter based on 'inputValue'
        //   // if (inputValue !== "") {
        //   //   posts = posts.filter((item) => {
        //   //     const contactNumber = item.CreatePostUser?.ContactNumber;
        //   //     return (
        //   //       item._id.toLowerCase().includes(inputValue.toLowerCase()) ||
        //   //       (item.CreatePostUser?.Name &&
        //   //         item.CreatePostUser.Name.toLowerCase().includes(
        //   //           inputValue.toLowerCase()
        //   //         )) ||
        //   //       (item.LocationDetails?.ProjectName &&
        //   //         item.LocationDetails.ProjectName.toLowerCase().includes(
        //   //           inputValue.toLowerCase()
        //   //         )) ||
        //   //       (contactNumber && String(contactNumber).includes(inputValue)) // Convert to string before calling includes
        //   //     );
        //   //   });
        //   // }
        // }

        // else {
        //   setOwnerPosts(data.Post);
        // }
      } else {
        setOwnerPosts(data.Post);
      }
    }
  }, [SearchPostId, data]);
  const [querry, setquerry] = useSearchParams();
  useEffect(() => {
    if (querry.get("PostVerify")) {
      dispatch(
        Admin_OwnerGetAllPostAction({ PostVerify: querry.get("PostVerify") })
      );
    } else {
      dispatch(Admin_OwnerGetAllPostAction());
    }
  }, [querry]);

  // Get All AssignProperty

  return (
    <>
      <>
        <div className="Admin-property-post-card-main-box">
          <p className="AllListing-admin">All Listing</p>

          {OwnerPosts.map((e, i) => {
            return (
              <AdminListingCard
                key={i}
                index={i}
                PostData={e}
                setAssignProperty={setAssignProperty}
                AssignProperty={AssignProperty}
              />
            );
          })}
          {/* {filteredPosts.length > 0 ? (
              filteredPosts.length &&
              filteredPosts.map((e, i) => {
                return (
                  <AdminListingCard
                    key={i}
                    index={i}
                    PostData={e}
                    setAssignProperty={setAssignProperty}
                    AssignProperty={AssignProperty}
                  />
                );
              })
            ) : (
              <>
                {data?.Post.map((e, i) => {
                  return (
                    <AdminListingCard
                      key={i}
                      index={i}
                      PostData={e}
                      setAssignProperty={setAssignProperty}
                      AssignProperty={AssignProperty}
                    />
                  );
                })}
              </>
            )} */}
        </div>
      </>
    </>
  );
}
