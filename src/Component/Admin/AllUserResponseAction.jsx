import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
// CSS file is here at bottom of this page 
import "./AllUserResponseAction.css"
import { useDispatch, useSelector } from "react-redux";
import "./AllRegistrationResponse.css"
import { getAllUserResponseAction } from "../../Action/userAction";
export default function AllUserResponseAction() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // All user response action



  const { data: AllUserResponseAction_Store,loading } = useSelector((state) => {
    return state.AllUserResponseAction_Store;
  });

  // Pagination logic state
  const [page, setPage] = useState(AllUserResponseAction_Store?.currentPage); // Current page for pagination

  const totalPages = AllUserResponseAction_Store?.totalPages
  const itemsPerPage = 10; // Number of items per page

  // console.log(AllUserResponseAction_Store)
  useEffect(() => {
     console.log(AllUserResponseAction_Store,loading)
    if(AllUserResponseAction_Store,loading==undefined){
      dispatch(getAllUserResponseAction(page))
    }
   
  }, [page])

  const handlePrevPage = () => {
    if (page > 1) {
     
      dispatch({type:"AllUserResponseActionFailClear"})
      setPage(page - 1);
      
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      
      dispatch({type:"AllUserResponseActionFailClear"})
      setPage(page + 1);
 
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Go to the selected page
    dispatch({type:"AllUserResponseActionFailClear"})
  };
// console.log(loading)
  return (
    <>
    {
      loading ? <div class="all-user-response">
      <div class="all-user-response-card">
          <div class="all-user-response-box all-user-response-name"></div>
          <div class="all-user-response-box all-user-response-email"></div>
          <div class="all-user-response-box all-user-response-phone"></div>
          <div class="all-user-response-box all-user-response-fav"></div>
          <div class="all-user-response-box all-user-response-button"></div>
      </div>
      <div class="all-user-response-card">
          <div class="all-user-response-box all-user-response-name"></div>
          <div class="all-user-response-box all-user-response-email"></div>
          <div class="all-user-response-box all-user-response-phone"></div>
          <div class="all-user-response-box all-user-response-fav"></div>
          <div class="all-user-response-box all-user-response-button"></div>
      </div>
      
  </div>
   :<div className="border border-primary border-opacity-25 ">

      {/* <p className="px-4 mt-3 fw-semibold text-primary">All Response({AllUserResponseAction_Store?.totalUsers})</p> */}
      <div className="container-fluid d-flex flex-column gap-3   ">
        {AllUserResponseAction_Store?.data?.map((item) => {
          return (


            <div className="d-flex align-content-start flex-wrap border border-primary border-opacity-25 py-1 rounded ">

              <div className="userName border-end border-primary px-2  border-opacity-25">
                <Link to={`/admin/single-user-Response-action/${item?._id}`} className="text-decoration-none">
                  <div>
                    <p className="  fw-light  All-response-section-name fw-medium ">{item?.Name}</p>
                    <small className=" fw-light All-response-section-Email">{item?.email}</small>
                  </div>
                </Link>
              </div>

                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
              <Link to={`/admin/single-user-Response-action/${item?._id}`} className="text-decoration-none">
                  <p className="All-response-section-Contact fw-light fw-medium">{item?.ContactNumber}</p>
              </Link>
                </div>
              <div className="userDetail px-5 d-flex justify-content-between">


                <select className="border-0" onChange={(e) => {
                  if (e.target.value) {
                    window.open(`/post-detail/${e.target.value}`, 'SinglePostDetail')
                  }
                  // navigate(`/post-detail/${e.target.value}`)


                }} >
                  <option className="All-response-section-noFav-prop" value={null}> No. of favourite Property : <span className="px-2">{item?.FavouritePost.length} </span></option>
                  {item.FavouritePost.map((data) => {
                    return (

                      <option value={`${data?.PostData?.PostId}`} >
                        {data?.PostData?.PostId}
                      </option>
                    )
                  })}

                </select>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to={`/admin/single-user-Response-action/${item?._id}`} className="text-decoration-none">

                    <button className="All-response-section-View-response fw-light text-end  ">View Response</button>

                  </Link>
                </div>


              </div>
            </div>

          )
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

            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNextPage}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Pagination controls end  */}

      </div>

    </div >
    }
      
    </>
  )
}

