import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_OwnerGetAllPostAction } from "../../Action/postAction";
import AdminListingCard from "./AdminListingCard";
import { useLocation, useSearchParams } from "react-router-dom";
import "./AdminListingCard.css";
import { UserContext } from "../CreateContext/CreateContext";

export default function AllPost({
  setAssignProperty,
  AssignProperty,
  SearchPostId,
  sortOrder,
  activeFilter,
  selectAll,
  postPerPage,
  propertAdType,
  allPostFilterBoxRef,
  onPageActive,
  currenSelected,
  OwnerPostsPageNo,
  setOwnerPostsPageNo,
  MarkUpdatedPost,
  page, //owner all post page
  setPage, // onwer all post setpage

  OwnerPosts,
  setOwnerPosts, // show post for owner
}) {
  const dispatch = useDispatch();
  const { postVerify, allPropertyData, setPostVerify, NavbarRef } =
    useContext(UserContext);

  const { loading, data } = useSelector((state) => state.AdminGetAllPost);
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  // Pagination logic state
  // const [page, setPage] = useState(OwnerPostsPageNo); // Current page for pagination   ( this state paste AdminAgenOwnerPost.jsx)
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const itemsPerPage = postPerPage; // Number of items per page
  const [querry, setquerry] = useSearchParams();
  // Create a URLSearchParams object from the query string (search part of the URL)

  useEffect(() => {
    if (activeFilter !== null && postVerify !== null) {
      setPostVerify(null);
    }
  }, [activeFilter, postVerify]);

  // Update posts when data or sortOrder changes searching or pagination set inside this useEffect
  useEffect(() => {
    if (allPropertyData?.Post) {
      let filteredPosts = [...allPropertyData?.Post];

      // Apply search filter
      if (SearchPostId.length > 0) {
        filteredPosts = filteredPosts.filter((item) => {
          const contactNumber = item.CreatePostUser?.ContactNumber;

          return (
            item._id.toLowerCase().includes(SearchPostId.toLowerCase()) ||
            item?.CreatePostUser?.Name.toLowerCase().includes(
              SearchPostId.toLowerCase()
            ) ||
            item.LocationDetails.ProjectName.toLowerCase().includes(
              SearchPostId.toLowerCase()
            ) ||
            (contactNumber && String(contactNumber).includes(SearchPostId)) // Convert to string before calling includes
          );
        });
      }

      // Apply the active filter (postVerify) to all posts
      if (activeFilter !== null) {
        if (activeFilter === "success") {
          // console.log("in sec")
          filteredPosts = filteredPosts?.filter((item) => {
            return item?.propertyStatus?.currentPropertyStatus === "sold out";
          });
          // console.log(filteredPosts)
          // return ;
        }
        // console.log("out")
        if (activeFilter == true || activeFilter == false) {
          filteredPosts = filteredPosts.filter((item) => {
            return item.PostVerify === activeFilter;
          });
        }
      } else {
        filteredPosts = [...filteredPosts];
      }

      if (postVerify !== null) {
        filteredPosts = filteredPosts.filter((item) => {
          return item.PostVerify === postVerify;
        });
      } else {
        filteredPosts = [...filteredPosts];
      }

      //rent and sale filter logic based on property add type
      if (propertAdType != "") {
        // console.log("this is add type ",propertAdType)
        if (propertAdType === "Rent") {
          // console.log(propertAdType,"in if")

          filteredPosts = filteredPosts.filter((item) => {
            return item?.BasicDetails?.PropertyAdType === propertAdType;
          });
        } else {
          // console.log(propertAdType,"in else")
          filteredPosts = filteredPosts.filter((item) => {
            return item?.BasicDetails?.PropertyAdType === propertAdType;
          });
        }
      }

      // Sorting logic
      if (sortOrder !== undefined) {
        filteredPosts.sort((a, b) => {
          const aDate = a.PostExtend?.PostExtendTime || a.createAt;
          const bDate = b.PostExtend?.PostExtendTime || b.createAt;
      
          if (sortOrder === "ascending") {
            return new Date(aDate) - new Date(bDate); // Ascending
          } else if (sortOrder === "descending") {
            return new Date(bDate) - new Date(aDate); // Descending
          }
      
          return 0; // No sorting applied if sortOrder is not valid
        });
      }

      // Update pagination when filtered posts change
      const newTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
      setTotalPages(newTotalPages); // Update total pages

      // Reset the page if it exceeds the new total pages
      if (page > newTotalPages) {
        setPage(1); // Reset to the first page
      }

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      // console.log("filter post ",filteredPosts)
      const postsToDisplay = filteredPosts.slice(startIndex, endIndex);
      setOwnerPosts(postsToDisplay); // Set the current page posts




//  Select All Post 

let PosttoDisplay = postsToDisplay?.map((post) => {
  return {
    PostId: post?._id,
    CreatedBy: medata?.user?._id,
  };
});

if (selectAll === true) {
  let AllSelectedProperty = [...PosttoDisplay, ...AssignProperty];
    

  // Remove duplicates by keeping the latest entry based on PostId
  const uniqueData = Array.from(
    new Map(AllSelectedProperty.map((item) => [item.PostId, item])).values()
  );
  if (SearchPostId.length > 0) {
    setAssignProperty(uniqueData);
  } else {
    setAssignProperty(PosttoDisplay);
  }
}

    }
  }, [
    data,
    SearchPostId,
    sortOrder,
    activeFilter,
    page,
    postVerify,
    itemsPerPage,
    allPropertyData,
    propertAdType,
    selectAll,
  ]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Go to the selected page
  };

  // this useEffect is used to handle the selectAll functionality
  const endIndex = itemsPerPage * page;
  const startIndex = endIndex - itemsPerPage;
  // useEffect(() => {
   
  // }, [selectAll, OwnerPosts]);

  //  owner update post scoll to post card ------------------------
  // ( if enable post update right admin this useEffect paste AdminAgentOwner component do not use this useEffect in agent section)

  // Empty dependency array to run once when the component mounts// Empty dependency array to run once when the component mounts

  return (
    <div className="Admin-property-post-card-main-box">
      {/* here we itrate all available property for owner only start */}
      {!loading ? (
        OwnerPosts.length > 0 ? (
          OwnerPosts.map((post, index) => (
            <AdminListingCard
              key={index}
              index={index}
              PostData={post}
              setAssignProperty={setAssignProperty}
              AssignProperty={AssignProperty}
              selectAllProperty={selectAll}
              page={page}
              itemsPerPage={itemsPerPage}
              // required pops owner nativate update post route (show updated post)
              activeFilter={activeFilter}
              SearchPostId={SearchPostId}
              propertAdType={propertAdType}
              postPerPage={postPerPage}
              onPageActive={onPageActive}
              currenSelected={currenSelected}
              MarkUpdatedPost={MarkUpdatedPost}
              sortOrder={sortOrder} //sorting
            />
          ))
        ) : (
          <p>No OwnerPosts Available</p>
        )
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      )}
      {/* here we itrate all available property for owner only end */}

      {/* Pagination controls start */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Pre
            </button>
          </li>

          {/* Dynamic page numbers */}
          {[...Array(totalPages).keys()].map((i) => (
            <li
              key={i + 1}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Pagination controls end  */}

      {/* Loading Spinner */}
      {loading && <div>Loading...</div>}
    </div>
  );
}

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Top Section */}
      <div className="skeleton-top">
        <div className="skeleton skeleton-checkbox"></div>
        <div className="skeleton-text">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="skeleton skeleton-badge"></div>
      </div>

      {/* Property Details */}
      <div className="skeleton-details">
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-info"></div>
        <div className="skeleton skeleton-info"></div>
        <div className="skeleton skeleton-info"></div>
      </div>

      {/* Visit, Offer, Duration */}
      <div className="skeleton-actions">
        <div className="skeleton skeleton-action"></div>
        <div className="skeleton skeleton-action"></div>
        <div className="skeleton skeleton-action"></div>
      </div>

      {/* Posted By */}
      <div className="skeleton-posted">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag"></div>
      </div>

      {/* Toggle Switch */}
      <div className="skeleton-toggle">
        <div className="skeleton skeleton-switch-text"></div>
        <div className="skeleton skeleton-switch"></div>
      </div>

      {/* Buttons */}
      <div className="skeleton-buttons">
        <div className="skeleton skeleton-button blue"></div>
        <div className="skeleton skeleton-button red"></div>
      </div>
    </div>
  );
};
