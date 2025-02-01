import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_AgentGetAllPostAction } from "../../Action/postAction";
import AdminListingCard from "./AdminListingCard";
import { useSearchParams } from "react-router-dom";
import { LuCircleGauge } from "react-icons/lu";

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
  const { data } = useSelector((state) => {
    return state.AdminProperty;
  });

  const [OwnerPosts, setOwnerPosts] = useState([]);
  useEffect(() => {
    if (data?.AssignProperty) {
      setOwnerPosts(data.AssignProperty);
    }
  }, [data]);

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


   

console.log(data?.AssignProperty,"j")
   
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(0);
     const itemsPerPage = 10;
    
   
    
      // Update posts when data or sortOrder changes searching or pagination set inside this useEffect
      useEffect(() => {
        if (data?.AssignProperty) {
          let filteredPosts = [...data.AssignProperty];
        
          if (SearchPostId.length > 0) {
            filteredPosts = filteredPosts.filter((item) => {
              const contactNumber = item?.PostId?.CreatePostUser?.ContactNumber;
              return (
                item?.PostId?._id.toLowerCase().includes(SearchPostId.toLowerCase()) ||
                item?.PostId?.CreatePostUser?.Name.toLowerCase().includes(SearchPostId.toLowerCase()) ||
                item.PostId?.LocationDetails.ProjectName.toLowerCase().includes(SearchPostId.toLowerCase()) ||
                (contactNumber && String(contactNumber).includes(SearchPostId)) // Convert to string before calling includes
              );
            });
          }
        
          // Apply the active filter (postVerify) to all posts
          if (activeFilter !== null) {
            filteredPosts = filteredPosts.filter((item) => item?.PostId?.PostVerify === activeFilter);
          }
        
          // Sorting logic - Ensure 'createAt' is valid
          if (sortOrder !== undefined) {
            filteredPosts.sort((a, b) => {
              const dateA = new Date(a?.PostId?.createAt); // Ensure proper date handling
              const dateB = new Date(b?.PostId?.createAt);
              return sortOrder === "ascending"
                ? dateA - dateB
                : dateB - dateA;
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
          const postsToDisplay = filteredPosts.slice(startIndex, endIndex);
        
          setOwnerPosts(postsToDisplay); // Set the current page posts
        }
      }, [data, SearchPostId, sortOrder, activeFilter, page]);
      
console.log(sortOrder,"dfkuhugfu")

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
    <p>All Listing</p>

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
