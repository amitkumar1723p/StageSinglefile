import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AllUserResponseAction.css"
import { getSingleUserResponseAction } from "../../Action/userAction";
import { FormatDate } from "../../utils/CommonFunction";
export default function SingleUserRespponseAction() {
    const dispatch = useDispatch()
    const { id } = useParams()

    const [activeTable, setActiveTable] = useState(1);
    // single user response action
    const { data: SingleUserResponseAction_Store, loading } = useSelector((state) => {
        return state.SingleUserResponseAction_Store;
    });

    useEffect(() => {
        dispatch(getSingleUserResponseAction(id))
    }, [id])
    const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    console.log(loading
    )

    return (
        <div className="border border-primary border-opacity-25 ">
            <div className="ps-3 pt-2">
                <div className="card col-4" >
                    <div className="card-header fw-medium">User Info...</div>

                    <ul className="list-group list-group-flush ">
                        <li className="list-group-item fw-light"><small>Name :  <span> {SingleUserResponseAction_Store?.user?.Name}</span></small></li>
                        <li className="list-group-item fw-light"><small>Contact:  <span> {SingleUserResponseAction_Store?.user?.ContactNumber}</span></small></li>
                        <li className="list-group-item fw-light "><small>Email : <span> {SingleUserResponseAction_Store?.user?.email}</span></small></li>
                    </ul>
                </div>
            </div>
            <div className="px-3">
                <div className="d-flex  mt-3  singleUser_mainbtn" >
                    <div className="col-3 text-center py-3 " ><small className={activeTable === 1 ? 'btn-inactive-home  user-select-none cursor-pointer' : ' btn-active-home activebtn   user-select-none cursor-pointer'} onClick={() => setActiveTable(1)}>View All Scheduled Visits({SingleUserResponseAction_Store?.schedules?.length})</small></div>

                    <div className="col-3 text-center py-3"><small className={activeTable === 2 ? '  user-select-none cursor-pointer btn-inactive-home' : ' btn-active-home cursor-pointer activebtn  user-select-none '} onClick={() => setActiveTable(2)}>View All Offers Made({SingleUserResponseAction_Store?.offers?.length})</small></div>

                    <div className=" col-3 text-center py-3"><small className={activeTable === 3 ? '  user-select-none cursor-pointer btn-inactive-home' : ' btn-active-home cursor-pointer activebtn  user-select-none'} onClick={() => setActiveTable(3)}>All Post Property({SingleUserResponseAction_Store?.posts?.length})</small></div>
                </div>
            </div>
            {
                activeTable === 1 && (

                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Post ID</th>
                                <th scope="col">Visit Date</th>
                                <th scope="col">Visit Status Data</th>
                                <th scope="col">Visit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.schedules?.map((item) => {
                                return (<tr>


                                    <td
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?.PostData?.PostId}`, 'SinglePostDetail');
                                        }}
                                    >
                                        {item?.PostData?.PostId}
                                    </td>
                                
                                    <td>{item?.VisitDate ?  FormatDate(item?.VisitDate)   : 'N/A'}</td>
                                    <td>{item?.PostVerify}</td>
                                    <td>{item?.VisitTime?.From}-{item?.VisitTime?.To}</td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>

                )
            }

            {
                activeTable === 2 && (
                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Post ID</th>
                                <th scope="col">Bid Price</th>

                                <th scope="col">Project Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.offers?.map((item) => {
                                return (<tr>


                                    <td
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?.PostData?.PostId}`, 'SinglePostDetail2')
                                        }}
                                    >{item?.PostData?.PostId}</td>

                                    {item?.BidPrice?.toString().length == 8 ? <td>{item?.BidPrice / 10000000} Cr</td> : item?.BidPrice?.toString().length == 7 ? <td>{item?.BidPrice / 1000000} Lakh</td> : item?.BidPrice?.toString().length == 6 ? <td>{item?.BidPrice / 100000} lakh</td> : null}

 
                                    {/* <td> {item?.createAt ? FormatDate(item?.createAt) : 'N/A'}</td> */}
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }

            {
                activeTable === 3 && (
                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Post ID</th>
                                <th scope="col">Post Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Property Type</th>

                                <th scope="col">Project</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.posts.map((item) => {
                                return (<tr>


                                    <td
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?._id}`, 'SinglePostDetail3')
                                        }}
                                    >{item?._id}</td>




                                    <td>{item?.createAt ?  FormatDate(item?.createAt) : 'N/A'}</td>

                                    <td>{item?.PostVerify == true ? "Active" : "Inactive"}</td>
                                    <td>{item?.BasicDetails?.PropertyAdType}</td>
                                    <td>{item?.LocationDetails?.ProjectName}, {item?.LocationDetails?.Landmark}, {item?.LocationDetails?.City}</td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }
        </div>
    )
}