import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// CSS file is here at bottom of this page
import { useDispatch, useSelector } from "react-redux";
import "./AllRegistrationResponse.css";
import { getAllUserResponseAction } from "../../Action/userAction";
export default function AllUserResponseAction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // All user response action

  const { data: AllUserResponseAction_Store } = useSelector((state) => {
    return state.AllUserResponseAction_Store;
  });

  // Pagination logic state
  const [page, setPage] = useState(AllUserResponseAction_Store?.currentPage); // Current page for pagination
  const [runPagination, setrunPagination] = useState(false);
  const totalPages = AllUserResponseAction_Store?.totalPages;
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (AllUserResponseAction_Store == undefined || runPagination == true) {
      dispatch(getAllUserResponseAction(page));
    }
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setrunPagination(true);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setrunPagination(true);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Go to the selected page
    setrunPagination(true);
  };

  return (
    <>
      <div className="border border-primary border-opacity-25 ">
        <p className="px-4 mt-3 fw-semibold text-primary">
          All Response({AllUserResponseAction_Store?.totalUsers})
        </p>
        <div className="container-fluid ">
          {AllUserResponseAction_Store?.data?.map((item) => {
            return (
              <div className="d-flex align-content-start flex-wrap border border-primary border-opacity-25 py-1">
                <div className="userName border-end border-primary px-2  border-opacity-25">
                  <div className="">
                    <p className="fw-light">{item?.Name}</p>
                    <small className="fw-light">{item?.email}</small>
                  </div>
                </div>

                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">{item?.ContactNumber}</p>
                </div>

                <div className="userDetail px-5 d-flex justify-content-between">
                  <select
                    className="border-0"
                    onChange={(e) => {
                      if (e.target.value) {
                        window.open(
                          `/post-detail/${e.target.value}`,
                          "SinglePostDetail"
                        );
                      }
                      // navigate(`/post-detail/${e.target.value}`)
                    }}
                  >
                    <option value={null}>
                      {" "}
                      No. of favourite Property :{" "}
                      <span className="px-2">
                        {item?.FavouritePost.length}{" "}
                      </span>
                    </option>
                    {item.FavouritePost.map((data) => {
                      return (
                        <option value={`${data?.PostData?.PostId}`}>
                          {data?.PostData?.PostId}
                        </option>
                      );
                    })}
                  </select>

                  <Link
                    to={`/admin/single-user-Response-action/${item?._id}`}
                    className="text-decoration-none "
                  >
                    <small className="fw-light text-end">click me</small>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" text-center">
          {/* Pagination controls start */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={handlePrevPage}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              {/* Dynamic page numbers */}

              {Array.from({ length: totalPages }, (_, i) => (
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
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Pagination controls end  */}
        </div>
      </div>
    </>
  );
}
