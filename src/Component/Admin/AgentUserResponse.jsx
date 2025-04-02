// this page custom css insidet the file at bottom All user response action
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormatDate } from '../../utils/CommonFunction'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserResponseAction } from '../../Action/userAction';
import { FormatDateAndTime, formatPrice } from "../../utils/CommonFunction";
import "./AllRegistrationResponse.css";
export default function AgentUserResponse() {
    const dispatch = useDispatch()
    // All user response action
    const [searchbtn, setSearchbtn] = useState(false)
    const [searchText, setSearchText] = useState("");
    const [runPagination, setrunPagination] = useState(false);
    const { data: AllUserResponseAction_Store } = useSelector((state) => {
        return state.AllUserResponseAction_Store;
    });

    // Pagination logic state
    const [page, setPage] = useState(AllUserResponseAction_Store?.currentPage); // Current page for pagination

    const totalPages = AllUserResponseAction_Store?.totalPages

    useEffect(() => {
        if (AllUserResponseAction_Store == undefined || runPagination == true) {

            dispatch(getAllUserResponseAction(page))
        }
    }, [page])

    useEffect(() => {
        // If 'page' has a value or both 'searchText' and 'searchbtn' are truthy, dispatch the action
        if (searchText && searchbtn === true) {
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

    // Function to handle input changes
    const handleInputChange = (event) => {
        setSearchText(event.target.value); // Update state with input value
    };

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
                            className="allresponse-search-input"
                            placeholder="e.g.  9053608395"
                            type="text"
                            value={searchText} // Bind input value to state
                            onChange={handleInputChange} // Handle input change
                        />
                        <div className=" px-2">
                            <button className=" allresponse-search-input-btn px-2" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid d-flex flex-column  gap-3 rounded">


                    {AllUserResponseAction_Store?.data?.map((item) => {
                        return (

                            <div className=" main-box-all-response-section all-response-section-admin  d-flex   border border-primary border-opacity-25 py-2 rounded  ">

                                <div className="agentuserName border-end border-primary px-1  border-opacity-25">
                                    <div className="">
                                        <small className=" fw-light text-primary border-primary border-bottom px-2 border-opacity-50  cursor-pointer"  
                                        //    className=""
                                           onClick={(e) => {
                                               window.open(`/post-detail/${item?.propertyDetail?._id}`, 'SinglePostDetail');
                                           }}
                                        >
                                            {item?.propertyDetail?.LocationDetails?.ProjectName} 
                                            - {item?.propertyDetail?.LocationDetails?.Landmark} {item?.propertyDetail?.LocationDetails?.City}-
                                             <small className="fw-light">( {item?.propertyDetail?._id})</small></small>
                                        {/* <small className="fw-light">{item?.email}</small> */}<br/>
                                        <small className="fw-light">
                                        {item?.createAt ? FormatDate(item?.createAt) : 'N/A'}
                                        </small>
                                    </div>
                                </div>

                                <div className="agentuserContact border-end border-primary border-opacity-25 px-1 ">
                                    <p className="text-center">
                                        <small className='fw-light'>User Number </small><br/>
                                        <small className="fw-normal"> {item?.userDetail?.ContactNumber}</small>



                                    </p>
                                </div>
                                <div className="  agentuserContact border-end border-primary border-opacity-25 px-1 ">
                                    <p className="text-center">

                                     <small className='fw-light'>User Name</small> <br/>  <small className="fw-normal">{item?.userDetail?.Name} {item?.userDetail?.LastName}</small>

                                    </p>
                                </div>

                                <div className="  agentuserContact border-end border-primary border-opacity-25 px-1 ">
                                    <p className="text-center">
                                        <small className='fw-light'>Response Date</small> <br/><small className="fw-normal">{item?.createAt ? FormatDate(item?.createAt) : 'N/A'}</small>

                                    </p>

                                </div>
                                <div className="  userContact border-end border-primary border-opacity-25 px-1 ">
                                    <p className="text-center">
                                     
                                        {item?.Biddinguser ?
                                         <><small className='fw-light'>Offer Price</small><br/>{formatPrice(item?.BidPrice)}</>
                                          :
                                           <> <small className='fw-light'>
                                            Visit Date</small><br/>
                                            <small className='fw-normal'>{item?.VisitDate ? FormatDate(item?.VisitDate) : 'N/A'} - {(item?.VisitTime?.From)}</small></>}
                                    </p>
                                </div>

                             
                                {/* 
                                <div className="  userContact border-end border-primary border-opacity-25 px-2 ">
                                    <p className=" all-response-data-section d-flex justify-content-center align-items-center ">Schedule :  &nbsp; <small className="fw-bold">  {item?.scheduleData?.length} </small> </p>
                                </div>
                                <div className="  userContact border-end border-primary border-opacity-25 px-2 ">
                                    <p className="  all-response-data-section d-flex justify-content-center align-items-center ">Offer Data : &nbsp; <small className="fw-bold"> {item?.offerData?.length}</small></p>
                                </div> */}

                                {/* <div className="userDetail px-5 d-flex justify-content-between"> */}



                                <div className="px-1">
                                   
                                    

                                       <p className="text-center px-5">
                                      <small className='fw-light'>Lead Type</small> <br/><small className="fw-normal">{item?.Biddinguser ? <>Offer</> : <>Schedule</>}</small>

                                    </p>

                                </div>


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