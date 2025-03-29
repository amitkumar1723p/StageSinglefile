import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AllUserResponseAction.css"
import { getSingleUserResponseAction } from "../../Action/userAction";
import { FormatDate, FormatDateAndTime, formatPrice } from "../../utils/CommonFunction";

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


    return (
        <div className="border border-primary border-opacity-25 ">
            <div className="ps-3 pt-2">
                <div className="card col-4" >
                    <div className="card-header fw-medium">User Info...</div>

                    <ul className="list-group list-group-flush ">
                        <li className="list-group-item fw-light"><small>Name :  <span> {SingleUserResponseAction_Store?.user?.Name}  <span className="All-response-section-role"> ({SingleUserResponseAction_Store?.user?.Role})</span>  </span></small></li>
                        <li className="list-group-item fw-light"><small>Contact:  <span> {SingleUserResponseAction_Store?.user?.ContactNumber}</span></small></li>
                        <li className="list-group-item fw-light "><small>Email : <span> {SingleUserResponseAction_Store?.user?.email}</span></small></li>
                    </ul>
                </div>
            </div>
            <div className="px-0">
                <div className=" mian-form-data-section d-flex  mt-3  singleUser_mainbtn" >
                    <div className="col-2 text-center py-3"><small className={activeTable === 3 ? ' border-bottom user-select-none all-response-active ' : ' all-response-inactive activebtn border-bottom user-select-none'} onClick={() => setActiveTable(3)}>View  Listing({SingleUserResponseAction_Store?.posts?.length})</small></div>

                    <div className="col-2 text-center py-3 " ><small className={activeTable === 1 ? 'border-bottom user-select-none all-response-active ' : ' all-response-inactive activebtn  border-bottom user-select-none'} onClick={() => setActiveTable(1)}>View Scheduled Visits({SingleUserResponseAction_Store?.schedules?.length})</small></div>

                    <div className="col-2 text-center py-3"><small className={activeTable === 2 ? ' border-bottom user-select-none all-response-active ' : 'all-response-inactive activebtn border-bottom user-select-none'} onClick={() => setActiveTable(2)}> View Offers Details({SingleUserResponseAction_Store?.offers?.length})</small></div>




                    <div className="col-2 text-center py-3"><small className={activeTable === 4 ? ' border-bottom user-select-none  all-response-active ' : ' all-response-inactive activebtn border-bottom user-select-none'} onClick={() => setActiveTable(4)}>Notify ({SingleUserResponseAction_Store?.notifyData?.length})</small></div>


                    <div className="col-2 text-center py-3"><small className={activeTable === 5 ? ' border-bottom user-select-none all-response-active  ' : ' all-response-inactive activebtn border-bottom user-select-none'} onClick={() => setActiveTable(5)}>Requirement({SingleUserResponseAction_Store?.requireData?.length})</small></div>
                </div>
            </div>
            {
                activeTable === 1 && (

                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"> <span className="fw-normal">Project Name</span></th>

                                {/* <th scope="col"><span className="fw-normal">Post Id</span></th> */}
                                <th scope="col"><span className="fw-normal">Visit Status & Time </span></th>
                                <th scope="col"><span className="fw-normal">Visit Date</span></th>
                                {/* <th scope="col"><span className="fw-normal">Visit Time</span></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.schedules?.map((item) => {
                                return (<tr>
                                    {/* <td><small className="fw-light">{item?.LocationDetails?.ProjectName}</small></td> */}

                                    <td
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?.PostData?.PostId}`, 'SinglePostDetail');
                                        }}
                                    >
                                        <small className="fw-light"> {item?.PostData?.PostId}</small>
                                    </td>
                                    <td><small className="fw-light">{item?.VisitStatusData?.Status}</small></td>
                                    <td><small className="fw-light">{item?.VisitDate ? FormatDate(item?.VisitDate) : 'N/A'} ({item?.VisitTime?.From} {item?.VisitTime?.To})</small></td>
                                    {/* <td><small className="fw-light">{item?.VisitTime?.From} {item?.VisitTime?.To}</small></td> */}
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
                                {/* <th scope="col"> <span className="fw-normal">Project Name</span></th> */}

                                <th scope="col"> <span className="fw-normal">Post Id</span></th>
                                <th scope="col"><span className="fw-normal">Offer</span></th>
                                <th scope="col"><span className="fw-normal">Date</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.offers?.map((item) => {

                                return (<tr>


                                    <td onClick={(e) => {
                                        window.open(`/post-detail/${item?.PostData?.PostId}`, 'SinglePostDetail2')
                                    }}
                                    ><small className="fw-light">{item?.PostData?.PostId}</small></td>

                                    <td>  {formatPrice(item?.BidPrice)}</td>

                                    {/* {item?.BidPrice?.toString().length == 8 ? <td> <small className="fw-light">{item?.BidPrice / 10000000} Cr</small></td> : item?.BidPrice?.toString().length == 7 ? <td> <small className="fw-light">{item?.BidPrice / 1000000} Lakh</small></td> : item?.BidPrice?.toString().length == 6 ? <td><small className="fw-light">{item?.BidPrice / 100000} lakh</small></td> : null} */}


                                    <td><small className="fw-light">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'} </small></td>
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
                                <th scope="col"> <span className="fw-normal">Project Name</span></th>
                                <th scope="col"> <span className="fw-normal">Property Type</span></th>
                                <th scope="col"> <span className="fw-normal">Listing Status</span></th>

                                <th scope="col"> <span className="fw-normal">Date</span></th>
                                <th scope="col"> <span className="fw-normal">Post Id</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.posts.map((item) => {
                                return (<tr>

                                    <td><small className="fw-light">{item?.LocationDetails?.ProjectName},{item?.LocationDetails?.Landmark},{item?.LocationDetails?.City}</small></td>

                                    <td><small className="fw-light">{item?.BasicDetails?.ApartmentType}</small></td>
                                    <td>
                                        <small className="fw-light">
                                            {item?.PostVerify === true ? "Active" : "Inactive"}
                                        </small>
                                    </td>


                                    <td><small className="fw-light">{item?.createAt ? FormatDate(item?.createAt) : 'N/A'}</small></td>

                                    <td onClick={(e) => {
                                        window.open(`/post-detail/${item?._id}`, 'SinglePostDetail3')
                                    }}
                                    ><small className="fw-light">{item?._id}</small></td>







                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }
            {
                activeTable === 4 && (
                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th scope="col"><span className="fw-normal">Project Name</span></th>
                                <th scope="col"><span className="fw-normal">Floor Prefrence</span></th>
                                <th scope="col"><span className="fw-normal">Bhk Type</span></th>
                                <th scope="col"><span className="fw-normal">Date</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.notifyData.map((item) => {
                                return (<tr>


                                    <td><small className="fw-light">{item?.ProjectName}</small></td>
                                    <td><small className="fw-light">{item?.FloorPreference}</small></td>
                                    <td><small className="fw-light">{item?.BHKType}</small></td>
                                    <td><small className="fw-light">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'}</small></td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }


            {
                activeTable === 5 && (
                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"><span className="fw-normal">Project Name</span></th>
                                <th scope="col"><span className="fw-normal">Floor Prefrence</span></th>
                                <th scope="col"><span className="fw-normal">Bhk Type</span></th>
                                <th scope="col"><span className="fw-normal">Budget</span></th>
                                <th scope="col"><span className="fw-normal">Date</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.requireData.map((item) => {
                                return (<tr>


                                    <td><small className="fw-light">{item?.ProjectName}</small></td>
                                    <td><small className="fw-light">{item?.FloorPreference}</small></td>
                                    <td><small className="fw-light">{item?.BHKType}</small></td>
                                    <td><small className="fw-light">{item?.Budget} {item?.unit}</small></td>
                                    <td><small className="fw-light">{item?.createAt ?
                                        FormatDateAndTime(item?.createAt)
                                        : 'N/A'}</small></td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }
        </div>
    )
}