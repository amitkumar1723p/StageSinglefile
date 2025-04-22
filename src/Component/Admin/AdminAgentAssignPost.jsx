import React, { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_AgentGetAllPostAction } from "../../Action/postAction";
import AdminListingCard from "./AdminListingCard";
import { useSearchParams } from "react-router-dom";
import { LuCircleGauge } from "react-icons/lu";
import { UserContext } from "../CreateContext/CreateContext";

export default function AdminAgentAssignPost({
  setAssignProperty,
  AssignProperty,
  AssignPropertyAdmin,
  setAssignPropertyAdmin,
  SearchPostId,
  sortOrder,
  activeFilter,
}) {
  const dispatch = useDispatch();
  const { postVerify, allPropertyData, setPostVerify } =
    useContext(UserContext); // global state 

  const [OwnerPosts, setOwnerPosts] = useState([]);//this itrate map 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  //this useEffect is used for update state 
  useEffect(() => {
    if (activeFilter !== null) {
      setPostVerify(null);
    }
  }, [activeFilter, setPostVerify]);
  
  // Update posts when data or sortOrder changes searching or pagination set inside this useEffect
  useEffect(() => {
    if (!allPropertyData?.AssignProperty) return;
  
    let filteredPosts = [...allPropertyData.AssignProperty];
  
    // Search filter
    if (SearchPostId.trim().length > 0) {
      filteredPosts = filteredPosts.filter((item) => {
        const postId = item?.PostId?._id?.toLowerCase() || "";
        const userName = item?.PostId?.CreatePostUser?.Name?.toLowerCase() || "";
        const projectName =
          item?.PostId?.LocationDetails?.ProjectName?.toLowerCase() || "";
        const contactNumber = String(item?.PostId?.CreatePostUser?.ContactNumber || "");
  
        const query = SearchPostId.toLowerCase();
        return (
          postId.includes(query) ||
          userName.includes(query) ||
          projectName.includes(query) ||
          contactNumber.includes(query)
        );
      });
    }
  
    // Active filter (postVerify on PostId)
    if (activeFilter !== null) {
      if (activeFilter === "expired") {
        filteredPosts = filteredPosts.filter(
          (item) => item?.PostId?.PostExpired?.ExpiredStatus
        );
      }
   
      if(activeFilter !== "expired")
      filteredPosts = filteredPosts.filter(
        (item) => item?.PostId?.PostVerify === activeFilter
      );
  
   
    }
  
    // postVerify from context (on AssignProperty itself)
    if (postVerify !== null) {
      filteredPosts = filteredPosts.filter((item) => item?.PostVerify === postVerify);
    }
  
    // Sorting
    if (sortOrder !== undefined) {
      filteredPosts.sort((a, b) => {
        const dateA = new Date(a?.PostId?.createAt);
        const dateB = new Date(b?.PostId?.createAt);
        return sortOrder === "ascending" ? dateA - dateB : dateB - dateA;
      });
    }
  
    // Pagination
    const newTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    setTotalPages(newTotalPages);
  
    if (page > newTotalPages && newTotalPages > 0) {
      setPage(1); // Safe page reset
      return; // Wait for page reset
    }
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const postsToDisplay = filteredPosts.slice(startIndex, endIndex);
  
    setOwnerPosts(postsToDisplay);
  }, [allPropertyData, SearchPostId, sortOrder, activeFilter, postVerify, page]);
  
 

 
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

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="Admin-property-post-card-main-box">
      

      {/* Displaying posts */}
      {OwnerPosts.length > 0 ? (
        OwnerPosts.map((e, i) => {
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
        })
      ) : (
        <p>No posts available</p>
      )}

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li>
            <button className="page-link" onClick={handlePrevPage}>
              Prev
            </button>
          </li>
          {[...Array(totalPages).keys()].map((i) => (
            <li key={i}>
              <button
                className={`page-link ${page === i + 1 ? "active" : ""}`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
