import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminListingCard from "./AdminListingCard";
import {
  GetAllAssignProperty,
  GetAllScheduleVisitsAndMakeOffer_Length,
  GetDeletedPostsAction,
} from "../../Action/postAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./DeletePost.css";
export default function DeletePosts() {
  const { data: DeletedPost } = useSelector((state) => {
    return state.deletePosts;
  });
  const { data: VistAndOfferData } = useSelector((state) => {
    return state.VistAndOffer;
  });
  //  get All Assign Property
  const { data: AssignPostData } = useSelector((state) => {
    return state.AssignPropertys;
  });

  const dispatch = useDispatch();
  const [showDeletePost, setshowDeletePost] = useState([]);
  const [countFilterPost, secoutFilterPost] = useState([]);
  const [SearchValue, setSearhValue] = useState("");
  const [querry, setquerry] = useSearchParams();
  const [propertyOrder, setPropertyOrder] = useState("decending");

  //  pagination
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const itemsPerPage = 25; // Number of items per page

  //  if  data is  exit in redux store not call thsi api
  useEffect(() => {
    if (!DeletedPost) {
      dispatch(GetDeletedPostsAction());
    }
    if (!VistAndOfferData) {
      dispatch(GetAllScheduleVisitsAndMakeOffer_Length());
    }
    if (!AssignPostData) {
      dispatch(GetAllAssignProperty());
    }
  }, []);

  const {
    data: adminAlertData,
    LodingType,
    loading: PostVerifyLoding,
  } = useSelector((state) => {
    return state.Post;
  });

  useEffect(() => {
    if (adminAlertData && ["RestorePostRequest"].includes(LodingType)) {
      if (adminAlertData.success === true) {
        dispatch(GetDeletedPostsAction());
      }
    }

    // eslint-disable-next-line
  }, [adminAlertData]);

  const navigate = useNavigate();

  //  deleted post filter
  useEffect(() => {
    //  delete post filter
    const FilterType = querry.get("Type");
    if (DeletedPost?.deletedPosts) {
      let filteredPosts = DeletedPost?.deletedPosts;

      
      
  //  user change filter without search querry 
     
        if (FilterType == "AllPost") {
          window.scrollTo(0, 0);
          filteredPosts = DeletedPost?.deletedPosts;
          secoutFilterPost(filteredPosts);
        } else if (FilterType == "Active") {
          window.scrollTo(0, 0);
          filteredPosts = DeletedPost?.deletedPosts?.filter((post) => {
            return post.PostVerify == true;
          });
          secoutFilterPost(filteredPosts);
        } else if (FilterType == "In-Active") {
          window.scrollTo(0, 0);
          filteredPosts = DeletedPost?.deletedPosts?.filter((post) => {
            return post.PostVerify == false;
          });
          secoutFilterPost(filteredPosts);
        } else if (FilterType == "Sale") {
          window.scrollTo(0, 0);
          filteredPosts = DeletedPost?.deletedPosts?.filter((post) => {
            return post?.BasicDetails?.PropertyAdType == "Sale";
          });
          secoutFilterPost(filteredPosts);
        } else if (FilterType == "Rent") {
          window.scrollTo(0, 0);
          filteredPosts = DeletedPost?.deletedPosts?.filter((post) => {
            return post?.BasicDetails?.PropertyAdType == "Rent";
          });
        
         
      }
      if (SearchValue?.length > 0) {
        let search_filter_post = filteredPosts?.filter((item) => {
          const contactNumber = item?.CreatePostUser?.ContactNumber;

          return (
            item?._id?.toLowerCase().includes(SearchValue.toLowerCase()) ||
            item?.CreatePostUser?.Name.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            item?.LocationDetails?.ProjectName.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            (contactNumber && String(contactNumber).includes(SearchValue)) // Convert to string before calling includes
          );
        });
        filteredPosts = search_filter_post;
        // setshowDeletePost(search_filter_post);
      }
      //  user chage filter with search querry 

       
      secoutFilterPost(filteredPosts);


      if (propertyOrder === "ascending") {
        filteredPosts.sort(
          (a, b) => new Date(a.createAt) - new Date(b.createAt)
        ); // Ascending order
      } else if (propertyOrder === "descending") {
        filteredPosts.sort(
          (a, b) => new Date(b.createAt) - new Date(a.createAt)
        ); // Descending order
      }

      const newTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
      setTotalPages(newTotalPages); // Update total pages

      // Reset the page if it exceeds the new total pages
      if (page > newTotalPages) {
        setPage(1); // Reset to the first page
      }

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;

      const postsToDisplay = filteredPosts.slice(startIndex, endIndex);

      setshowDeletePost(postsToDisplay); // Set
    }
  }, [DeletedPost, querry, SearchValue, page, propertyOrder]);

  //  back button
  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent the back/forward action by pushing the current state again
      // window.history.pushState(null, null, window.location.href);
      navigate("/admin/dashboard");
    };

    // Add the event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Pagination logic state

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
  return (
    <>
      {/* Filter nav  */}
      <div className="admin-filter-main-parent-box">
        <p className="AllListing-admin">
          <span>
            {" "}
            Total Deleted Posts ({DeletedPost?.deletedPosts?.length})
          </span>{" "}
          {querry.get("Type") && (
            <span>
              {" "}
              {`>`} {`${querry.get("Type")} (${countFilterPost?.length})`}{" "}
            </span>
          )}
        </p>
        <div className="filter-section-property">
          <div className="admin-filter-all-button-parent">
            <div>
              <img src="/img/FilteImg.png" alt="FilteImg" />
            </div>

            <button
              className={`${
                !querry.get("Type")
                  ? "select"
                  : `${querry.get("Type") == "AllPost" ? "select" : ""}`
              }`}
              onClick={() => {
                setquerry({ Type: "AllPost" });
              }}
            >
              <span>All Post</span>
            </button>

            <button
              className={`${querry.get("Type") == "Active" ? "select" : ""}`}
              onClick={() => {
                setquerry({ Type: "Active" });
              }}
            >
              Active
            </button>
            <button
              className={`${querry.get("Type") == "In-Active" ? "select" : ""}`}
              onClick={() => {
                setquerry({ Type: "In-Active" });
              }}
            >
              Inactive
            </button>
            {/* <button
              onClick={() => {
                setquerry({ Type: "Success" });
              }}
            >
              Success
            </button> */}

            
            {/* <select id="itemsPerPage">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> */}
            <button
              className={`${querry.get("Type") == "Rent" ? "select" : ""}`}
              onClick={() => {
                setquerry({ Type: "Rent" });
              }}
            >
              {" "}
              Rent
            </button>
            <button
              className={`${querry.get("Type") == "Sale" ? "select" : ""}`}
              onClick={() => {
                setquerry({ Type: "Sale" });
              }}
            >
              Sale
            </button>

            <button
            onClick={() => {
              if (propertyOrder === "ascending") {
                setPropertyOrder("descending");
              } else {
                setPropertyOrder("ascending");
              }
            }}
            style={{ pointerEvents: "auto" }}
          >
            {propertyOrder === "ascending" ? <>Sort (↑)</> : <>Sort(↓)</>}
          </button>
          </div>
      
          {/* <button>Exprired</button>
        <button>Reported</button>
        <button>Success</button> */}
          <div className="">
            <input
              className="controlled-input"
              type="text"
              placeholder="Search Here"
              value={SearchValue?.trimStart()}
              onChange={(e) => {
                window.scrollTo(0, 0);
                setSearhValue(e.target.value);
              }}
            />
            <img
              className="search-admin-section"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
  <g clip-path="url(#clip0_3153_291)">
    <path d="M7.42252 0.388672C6.53035 0.388399 5.64687 0.563912 4.82256 0.905183C3.99824 1.24645 3.24924 1.7468 2.61835 2.37762C1.98746 3.00845 1.48704 3.7574 1.14568 4.58168C0.804328 5.40596 0.628725 6.28943 0.628907 7.1816C0.628634 8.07382 0.804169 8.95736 1.14548 9.78172C1.4868 10.6061 1.9872 11.3551 2.6181 11.986C3.249 12.6169 3.99803 13.1173 4.8224 13.4586C5.64676 13.7999 6.5303 13.9755 7.42252 13.9752C9.00791 13.9752 10.4638 13.4137 11.62 12.5041L12.2258 13.1098C12.1014 13.3515 12.0573 13.6266 12.1 13.895C12.1427 14.1635 12.27 14.4113 12.4632 14.6024L15.6437 17.8044C16.1373 18.2987 16.9452 18.2987 17.4395 17.8044L18.0453 17.1986C18.2825 16.9599 18.4156 16.6371 18.4156 16.3007C18.4156 15.9642 18.2825 15.6414 18.0453 15.4027L14.8434 12.2223C14.6511 12.03 14.4018 11.905 14.1326 11.8661C13.8635 11.8271 13.5889 11.8763 13.3501 12.0063L12.7443 11.4005C13.5372 10.3999 14.0321 9.19608 14.1722 7.92709C14.3123 6.6581 14.092 5.37531 13.5365 4.22581C12.9809 3.0763 12.1127 2.10662 11.0313 1.42795C9.94997 0.749275 8.69922 0.389083 7.42252 0.388672ZM7.42252 1.64313C8.89141 1.64313 10.3001 2.22665 11.3388 3.26531C12.3775 4.30397 12.961 5.7127 12.961 7.1816C12.961 8.65049 12.3775 10.0592 11.3388 11.0979C10.3001 12.1365 8.89141 12.7201 7.42252 12.7201C5.95363 12.7201 4.5449 12.1365 3.50624 11.0979C2.46758 10.0592 1.88406 8.65049 1.88406 7.1816C1.88406 5.7127 2.46758 4.30397 3.50624 3.26531C4.5449 2.22665 5.95363 1.64313 7.42252 1.64313ZM3.91737 5.42936C3.54825 6.02751 3.35355 6.71688 3.35521 7.41975C3.35439 7.91719 3.45177 8.40991 3.64175 8.86965C3.83174 9.32938 4.1106 9.7471 4.46235 10.0988C4.81409 10.4506 5.23181 10.7295 5.69155 10.9194C6.15128 11.1094 6.644 11.2068 7.14145 11.206C7.92357 11.2051 8.68645 10.9634 9.32637 10.5137C9.15379 10.5299 8.98046 10.5368 8.80714 10.5344C8.1646 10.5361 7.52807 10.4108 6.93412 10.1656C6.34017 9.92054 5.8005 9.56048 5.34613 9.10617C4.89175 8.65186 4.53162 8.11225 4.28643 7.51833C4.04124 6.92441 3.91582 6.2879 3.91737 5.64536C3.91737 5.57336 3.91391 5.50136 3.91737 5.42936Z" fill="#0078D4"/>
  </g>
  <defs>
    <clipPath id="clip0_3153_291">
      <rect width="18" height="18" fill="white" transform="translate(0.5 0.258789)"/>
    </clipPath>
  </defs>
</svg>
                  `)}`}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="Admin-delete-property-card-main-box">
        {/* Displaying posts */}
        {showDeletePost?.length > 0 ? (
          showDeletePost?.map((postdata, i) => {
            return <AdminListingCard key={i} index={i} PostData={postdata} />;
          })
        ) : (
          <p>No posts available</p>
        )}

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

            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
