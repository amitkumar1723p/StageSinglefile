import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_AgentGetAllPostAction } from "../../Action/postAction";
import AdminListingCard from "./AdminListingCard";
import { useSearchParams } from "react-router-dom";

export default function AdminAgentAssignPost({
  setAssignProperty,
  AssignProperty,
  AssignPropertyAdmin,
  setAssignPropertyAdmin,
  SearchPostId,
}) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.AdminProperty;
  });
  const [OwnerPosts, setOwnerPosts] = useState([]);
  useEffect(() => {
    if (data?.AssignProperty) {
      setOwnerPosts(data.AssignProperty);
    }
  }, [data]);

  useEffect(() => {
    if (data?.AssignProperty) {
       
      if (SearchPostId.length > 0) {
        //   let a = data.Post.find((post) => {
        //   return post._id == SearchPostId;
        // });

        let posts = data.AssignProperty.filter((item) => {
          const contactNumber = item?.PostId?.CreatePostUser?.ContactNumber;
            

          return (
            item?.PostId?._id.toLowerCase().includes(SearchPostId.toLowerCase()) ||
            (
              item?.PostId?.CreatePostUser?.Name.toLowerCase().includes(
                SearchPostId.toLowerCase()
              )) ||
            ( 
              item.PostId?.LocationDetails.ProjectName.toLowerCase().includes(
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
        setOwnerPosts(data.AssignProperty);
      }
       
    }
  }, [SearchPostId, data]);
  const [querry, setquerry] = useSearchParams();
  useEffect(() => {
    if (querry.get("PostVerify")) {
      dispatch(
        Admin_AgentGetAllPostAction({ PostVerify: querry.get("PostVerify") })
      );
    } else {
      dispatch(Admin_AgentGetAllPostAction());
    }
  }, [querry]);
  return (
    <div className="Admin-property-post-card-main-box">
      <p>All Listing</p>

      {OwnerPosts.map((e, i) => {
        if (e.PostId) {
          return (
            <AdminListingCard
              key={i}
              index={i}
              PostData={e.PostId}
              setAssignProperty={setAssignProperty}
              AssignProperty={AssignProperty}
            />
          );
        }
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
  );
}
