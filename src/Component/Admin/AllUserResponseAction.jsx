import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
// CSS file is here at bottom of this page 
import "./AllUserResponseAction.css"
import { useDispatch, useSelector } from "react-redux";
import "./AllRegistrationResponse.css";
import { getAllUserResponseAction } from "../../Action/userAction";
export default function AllUserResponseAction() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // All user response action
const [searchbtn,setSearchbtn]=useState(false)
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState([])
  const { data: AllUserResponseAction_Store } = useSelector((state) => {
    return state.AllUserResponseAction_Store;
  });
  


  // console.log(sort,"lgjk")
  // Pagination logic state
  const [page, setPage] = useState(AllUserResponseAction_Store?.currentPage); // Current page for pagination
const [runPagination, setrunPagination] = useState(false);
  const totalPages = AllUserResponseAction_Store?.totalPages
  // const itemsPerPage = 10; // Number of items per page

  // console.log(AllUserResponseAction_Store)
useEffect(() => {
  if (AllUserResponseAction_Store == undefined || runPagination == true) {
    dispatch(getAllUserResponseAction(page));
  }
}, [page]);
useEffect(() => {
  // If 'page' has a value or both 'searchText' and 'searchbtn' are truthy, dispatch the action
  if (searchText && searchbtn===true) {
    dispatch(getAllUserResponseAction(page, searchText));
    
    setSearchbtn(false)
  }
  


}, [page, searchText, searchbtn]);


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


  // searching


  // Function to handle input changes
  const handleInputChange = (event) => {
    setSearchText(event.target.value); // Update state with input value
  };

  // Function to handle search button click
  const handleSearch = () => {
   setSearchbtn(true)
    // For example, log the search text
  };
  
  return (
    <>
      <div className="border border-primary border-opacity-25 ">
        <div className="d-flex justify-content-between">
        <div className=""> 
           <p className="px-4 mt-3 fw-semibold text-primary">All Response({AllUserResponseAction_Store?.totalUsers})</p>
           </div>
           <div className="px-4 mt-3 d-flex">
      <input
        type="text"
        value={searchText} // Bind input value to state
        onChange={handleInputChange} // Handle input change
      />
      <div className="px-2">
        <button className="px-2" onClick={handleSearch}>Search</button>
      </div>
    </div>
        </div>
     
        <div className="container-fluid ">


          {AllUserResponseAction_Store?.data?.map((item) => {
            return (

              <div className="d-flex align-content-start flex-wrap border border-primary border-opacity-25 py-2">

                <div className="userName border-end border-primary px-2  border-opacity-25">
                  <div className="">
                    <p className="">{item?.Name}- <small className="fw-light">({item?.Role})</small></p>
                    {/* <small className="fw-light">{item?.email}</small> */}
                    <small className="fw-light">
                      {item?.createAt ? new Date(item.createAt).toLocaleDateString() : 'N/A'}
                    </small>
                  </div>
                </div>

                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">{item?.ContactNumber}</p>
                </div>

                
                
                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">Schedule Data:<small className="fw-light">{item?.scheduleData?.length}</small></p>
                </div>
                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">Post Data: <small className="fw-light">{item?.postData?.length}</small></p>
                </div>
                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">Offer Data:<small className="fw-light">{item?.offerData?.length}</small></p>
                </div>
                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className=" fw-light">Notify Data:<small className="fw-light">{item?.notifyData?.length}</small></p>
                </div>
                <div className="userContact border-end border-primary border-opacity-25 px-2 ">
                  <p className="fw-light">Requirement:<small className="fw-light">{item?.requireData?.length}</small></p>
                </div>
                {/* <div className="userDetail px-5 d-flex justify-content-between"> */}


                

                  <Link to={`/admin/single-user-Response-action/${item?._id}`} className="text-decoration-none ">
                    <small className="fw-light px-4">click me</small>

                  </Link>


                {/* </div> */}
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

      </div>
    </>
  )
}
