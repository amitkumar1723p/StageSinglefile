import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Admin_OwnerGetAllPostAction } from "../../Action/postAction";
import AdminListingCard from "./AdminListingCard";
import { useSearchParams } from "react-router-dom";
import "./AdminListingCard.css";

export default function AllPost({
  setAssignProperty,
  AssignProperty,
  SearchPostId,
  sortOrder,
  activeFilter,
 
}) {
  const dispatch = useDispatch();
  const [OwnerPosts, setOwnerPosts] = useState([]);
  const { loading, data } = useSelector((state) => state.AdminGetAllPost);


  // Pagination logic state 
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const itemsPerPage = 10; // Number of items per page

  // Update posts when data or sortOrder changes searching or pagination set inside this useEffect
  useEffect(() => {

    if (data?.Post) {
      let filteredPosts = [...data.Post];
  
      // Apply search filter
      if (SearchPostId.length > 0) {
        filteredPosts = filteredPosts.filter((item) => {
          const contactNumber = item.CreatePostUser?.ContactNumber;
  
          return (
            item._id.toLowerCase().includes(SearchPostId.toLowerCase()) ||
            (item?.CreatePostUser?.Name.toLowerCase().includes(
              SearchPostId.toLowerCase()
            )) ||
            (item.LocationDetails.ProjectName.toLowerCase().includes(
              SearchPostId.toLowerCase()
            )) ||
            (contactNumber && String(contactNumber).includes(SearchPostId)) // Convert to string before calling includes
          );
        });
      }
  
      // Apply the active filter (postVerify) to all posts
      if (activeFilter !== null) {
        filteredPosts = filteredPosts.filter((item) => {
          return item.PostVerify === activeFilter;
        });
      }else{
        filteredPosts=[...filteredPosts]
      }
  
   
  
      // Sorting logic
      if (sortOrder !== undefined) {
        if (sortOrder === "ascending") {
          filteredPosts.sort((a, b) => new Date(a.createAt) - new Date(b.createAt)); // Ascending order
        } else if (sortOrder === "descending") {
          filteredPosts.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)); // Descending order
        }
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

  // Re-run when data, SearchPostId, sortOrder, or page changes

  const [querry, setquerry] = useSearchParams();
  useEffect(() => {
    if (querry.get("PostVerify")) {
      dispatch(Admin_OwnerGetAllPostAction({ PostVerify: querry.get("PostVerify") }));
    } else {
      dispatch(Admin_OwnerGetAllPostAction());
    }
  }, [querry, dispatch]);

  // Pagination control functions start 
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
 // Pagination control functions end
  return (
    <div className="Admin-property-post-card-main-box">
      <p className="AllListing-admin">All Listing</p>
{/* here we itrate all available property for owner only start */}
      {OwnerPosts.length > 0 ? (
        OwnerPosts.map((post, index) => (
          <AdminListingCard
            key={index}
            index={index}
            PostData={post}
            setAssignProperty={setAssignProperty}
            AssignProperty={AssignProperty}
          />
        ))
      ) : (
        <div>No posts available</div>
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
