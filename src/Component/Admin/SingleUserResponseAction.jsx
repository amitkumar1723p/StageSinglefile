import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./AllUserResponseAction.css"
import { getSingleUserResponseAction, updateBidStatusAction, updateNotifyStatusAction, updateRequirementStatusAcion } from "../../Action/userAction";
import { FormatDate, FormatDateAndTime, formatPrice } from "../../utils/CommonFunction";
import { Admin_OwnerScheduleVisitDone } from "../../Action/postAction";
import { useLocation } from 'react-router-dom';

export default function SingleUserRespponseAction() {
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const indexAgent = params.get('indexAgent');
    const { index } = location.state || {};

    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(index,"lll")
    const [activeTable, setActiveTable] = useState(1);

    const [scheduleStatus, setScheduleStatus] = useState()
    const [offerStatus, setOfferStatus] = useState()
    const [notifyStatus, setNotifyStatus] = useState()
    const [requirementStatus, setRequirementStatus] = useState()
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

    const firstRoom = SingleUserResponseAction_Store?.notifyData?.find((item) => item?.Room?.length > 0);
    // console.log(scheduleStatus, offerStatus, notifyStatus, "jk")
    // handle email for view off section
    const handleEmailOffer = () => {
        try {
            alert("email sent")
        } catch (error) {
            console.log(error)
        }
    }


    // used for update status 
    useEffect(() => {
        if (scheduleStatus) {
            dispatch(
                Admin_OwnerScheduleVisitDone(
                    { VisitStatus: scheduleStatus?.status },
                    scheduleStatus?.id
                ))
        }
        if (offerStatus) {
            dispatch(updateBidStatusAction(
                { VisitStatus: offerStatus?.status },
                offerStatus?.id
            ))
        }
        if (notifyStatus) {
            dispatch(updateNotifyStatusAction(
                { VisitStatus: notifyStatus?.status },
                notifyStatus?.id
            ))
        }
        if (requirementStatus) {
            dispatch(updateRequirementStatusAcion(
                { VisitStatus: requirementStatus?.status },
                requirementStatus?.id
            ))
        }

    }, [scheduleStatus, offerStatus, notifyStatus, requirementStatus])


    // Admin_OwnerScheduleVisitDone

    useEffect(() => {
        if (index !== undefined && index !== null) {
            const stored = localStorage.getItem('readMode');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Remove first match by ContactNumber
                const updated = parsed.filter(item => item.ContactNumber !== index);
                console.log(updated)
                localStorage.setItem('readMode', JSON.stringify(updated));

            }
        }
        if (indexAgent !== undefined && indexAgent !== null) {
            const stored = localStorage.getItem('agentReadMode');
            if (stored) {
                const parsed = JSON.parse(stored);
                console.log(indexAgent, "id")
                // Filter out the one with matching _id
                const updated = parsed.filter(item => item !== indexAgent);

                // Update localStorage
                localStorage.setItem('agentReadMode', JSON.stringify(updated));
            }
        }

    }, [index, indexAgent]);
    console.log(index, indexAgent, "lk")

    return (
        <div className="border border-primary border-opacity-25 ">

            <div className="ps-3 pt-2">
                <div className="card col-4" >
                    <div className="card-header fw-medium">User Info...</div>

                    <ul className="list-group list-group-flush ">
                        <li className="list-group-item fw-light">
                            <small>Name :  <span> {SingleUserResponseAction_Store?.user?.Name}
                                <span className="All-response-section-role"> ({SingleUserResponseAction_Store?.user?.Role})</span>  </span>
                            </small></li>
                        <li className="list-group-item fw-light">
                            <small>Contact:  <span> {SingleUserResponseAction_Store?.user?.ContactNumber}</span>
                            </small> {activeTable === 2 && (<a href={`tel:${SingleUserResponseAction_Store?.user?.ContactNumber}`}>&#9742;</a>)}
                        </li>
                        <li className="list-group-item fw-light ">
                            <small>Email : <span> {SingleUserResponseAction_Store?.user?.email}</span>
                            </small> {activeTable === 2 && (<a className="text-bolder user-select-none" onClick={handleEmailOffer}>&#9993;</a>)}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="px-0">
                <div className=" mian-form-data-section d-flex  mt-3  singleUser_mainbtn" >

                    <div className="col-2 text-center py-3"><small className={activeTable === 3 ?
                        ' border-bottom user-select-none all-response-active ' :
                        ' all-response-inactive activebtn border-bottom user-select-none'}
                        onClick={() => setActiveTable(3)}>View  Listing({SingleUserResponseAction_Store?.posts?.length})</small></div>


                    <div className="col-2 text-center py-3 " ><small className={activeTable === 1 ?
                        'border-bottom user-select-none all-response-active ' :
                        ' all-response-inactive activebtn  border-bottom user-select-none'}
                        onClick={() => setActiveTable(1)}>View Scheduled Visits({SingleUserResponseAction_Store?.schedules?.length})</small></div>

                    <div className="col-2 text-center py-3"><small className={activeTable === 2 ?
                        ' border-bottom user-select-none all-response-active ' :
                        'all-response-inactive activebtn border-bottom user-select-none'}
                        onClick={() => setActiveTable(2)}> View Offers Details({SingleUserResponseAction_Store?.offers?.length})</small></div>




                    <div className="col-2 text-center py-3"><small className={activeTable === 4 ?
                        ' border-bottom user-select-none  all-response-active ' :
                        ' all-response-inactive activebtn border-bottom user-select-none'}
                        onClick={() => setActiveTable(4)}>Notify ({SingleUserResponseAction_Store?.notifyData?.length})</small></div>


                    <div className="col-2 text-center py-3"><small className={activeTable === 5 ?
                        ' border-bottom user-select-none all-response-active  ' :
                        ' all-response-inactive activebtn border-bottom user-select-none'}
                        onClick={() => setActiveTable(5)}>Requirement({SingleUserResponseAction_Store?.requireData?.length})</small></div>


                </div>
            </div>
            {
                activeTable === 1 && (

                    <div className="px-3">    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"><span className="fw-normal ">Property Type</span></th>
                                <th scope="col"> <span className="fw-normal ">Project Name</span></th>
                                <th scope="col"> <span className="fw-normal "> P-ID</span></th>


                                <th scope="col"><span className="fw-normal">Prop Status</span></th>
                                <th scope="col"><span className="fw-normal ">Visit Date & Time </span></th>
                                <th scope="col"><span className="fw-normal">Visit Status</span></th>

                                {/* <th scope="col"><span className="fw-normal">Visit Time</span></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.schedules?.slice().reverse().map((item) => {

                                return (<tr>
                                    {/* <td><small className="fw-light">{item?.LocationDetails?.ProjectName}</small></td> */}
                                    <td><small className="fw-light ">{item?.PostData?.PostId?.BasicDetails?.ApartmentType}</small></td>
                                    <td style={{ maxWidth: '220px' }}
                                        className="cursor-pointer pe-5"
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?.PostData?.PostId?._id}`, 'SinglePostDetail');
                                        }}
                                    >
                                        <small className="fw-light text-truncate text-nowrap overflow-hidden text-primary border-primary border-bottom px-2 border-opacity-50  d-inline-block w-100">
                                            {item?.PostData?.PostId?.LocationDetails?.ProjectName} - {item?.PostData?.PostId?.LocationDetails?.Landmark} {item?.PostData?.PostId?.LocationDetails?.City}
                                        </small>
                                    </td>
                                    <td><small className="fw-light ">{item?.PostData?.PostId?._id}</small></td>


                                    <td><small className="fw-light ">{item?.PostData?.PostId?.PostVerify === true ? "Active" : "Inactive"}</small></td>
                                    <td><small className="fw-light ">{item?.VisitDate ? FormatDate(item?.VisitDate) : 'N/A'} ({item?.VisitTime?.From} {item?.VisitTime?.To})</small></td>
                                    <td><small className="fw-light ">
                                        <select
                                            className="admin-all-response-remaks"
                                            onChange={(e) => setScheduleStatus({ status: e.target.value, id: item?._id })}

                                        >
                                            <option value={item?.VisitStatusData?.Status}
                                            /* <option value={item?.VisitStatusData?.Status}  style={{
                                                        backgroundColor:item?.VisitStatusData?.Status === "Done" ? "red" : "green",
                                                        color: "white",
                                                        padding: "10px",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                      }}> */
                                            >
                                                {item?.VisitStatusData?.Status}
                                            </option>
                                            {["Plan", "Done", "Re-Plan"]
                                                .filter(status => status !== item?.VisitStatusData?.Status)
                                                .map((status) => (
                                                    <option key={status} value={status}   >
                                                        {status}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                    </small></td>

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

                                <th scope="col"> <span className="fw-normal">Project Name</span></th>
                                <th scope="col"> <span className="fw-normal">P-ID</span></th>

                                <th scope="col"> <span className="fw-normal">Project Price</span></th>
                                <th scope="col"> <span className="fw-normal">Property Type</span></th>
                                <th scope="col"><span className="fw-normal">Offer Price</span></th>
                                <th scope="col"><span className="fw-normal"> Offer Date</span></th>
                                <th scope="col"><span className="fw-normal"> Status</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.offers?.slice().reverse().map((item) => {
                                return (<tr>



                                    <td style={{ maxWidth: '220px' }} className="cursor-pointer" onClick={(e) => {

                                        window.open(`/post-detail/${item?.PostData?.PostId?._id}`, 'SinglePostDetail2')
                                    }}
                                    ><small className="fw-light text-truncate text-nowrap overflow-hidden text-primary border-primary border-bottom px-2 border-opacity-50  d-inline-block w-100">{item?.PostData?.PostId?.LocationDetails?.ProjectName} -
                                            {item?.PostData?.PostId?.LocationDetails?.Landmark} {item?.PostData?.PostId?.LocationDetails?.Locality}</small></td>
                                    <td><small className="fw-light">{item?.PostData?.PostId?._id}</small></td>

                                    <td><small className="fw-light">{formatPrice(item?.PostData?.PostId?.PricingDetails?.ExpectedPrice)}</small></td>
                                    <td><small className="fw-light">{item?.PostData?.PostId?.BasicDetails?.ApartmentType}</small></td>
                                    <td><small className="fw-light">{formatPrice(item?.BidPrice)}</small></td>
                                    <td><small className="fw-light">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'} </small></td>
                                    <td><small className="fw-light">
                                        <select className="admin-all-response-remaks" onChange={(e) => setOfferStatus({ status: e.target.value, id: item?._id })}>
                                            <option value={item?.bidStatus?.status}>{item?.bidStatus?.status}</option>
                                            {["Made", "Accepted", "Rejected"]
                                                .filter(status => status !== item?.bidStatus?.status)
                                                .map((status) => (
                                                    <option key={status} value={status}   >
                                                        {status}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </small></td>
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
                                <th scope="col"> <span className="fw-normal">P-ID</span></th>
                                <th scope="col"> <span className="fw-normal ps-4">Property Type</span></th>
                                <th scope="col"> <span className="fw-normal">Listing Status</span></th>
                                <th scope="col"> <span className="fw-normal">Date</span></th>

                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.posts?.slice().reverse().map((item) => {
                                return (<tr>

                                    <td style={{ maxWidth: '220px' }} className="pe-5">
                                        <small
                                            className="fw-light text-truncate text-nowrap overflow-hidden text-primary border-primary border-bottom pe-3 border-opacity-50 cursor-pointer d-inline-block w-100"
                                            onClick={() => window.open(`/post-detail/${item?._id}`, 'SinglePostDetail')}
                                        >
                                            {item?.LocationDetails?.ProjectName} -
                                            {item?.LocationDetails?.Landmark}, {item?.LocationDetails?.City}
                                        </small>
                                    </td>

                                    <td
                                    ><small className="fw-light">{item?._id}</small></td>



                                    <td><small className="fw-light ps-5">{item?.BasicDetails?.ApartmentType}</small></td>
                                    <td>
                                        <small className="fw-light ps-3">
                                            {item?.PostVerify === true ? "Active" : "Inactive"}
                                        </small>
                                    </td>







                                    <td><small className="fw-light">{item?.createAt ? FormatDate(item?.createAt) : 'N/A'}</small></td>



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
                                <th scope="col"><span className="fw-normal">Required Bhk</span></th>
                                <th scope="col"><span className="fw-normal">Floor Prefrence</span></th>
                                {/* Conditionally render the first valid room */}
                                {firstRoom ? (
                                    <th scope="col">
                                        <span className="fw-normal">Additional Room</span>
                                    </th>
                                ) : null}
                                <th scope="col"><span className="fw-normal">Date</span></th>
                                <th scope="col"><span className="fw-normal">Status</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.notifyData?.slice().reverse().map((item) => {

                                return (<tr>


                                    <td style={{ maxWidth: '150px' }}>
                                        <small className="fw-light text-truncate text-nowrap overflow-hidden text-primary  pe-3 border-opacity-50 cursor-pointer d-inline-block w-100">
                                            {item?.ProjectName}</small>
                                    </td>
                                    <td><small className="fw-light">{item?.BHKType}</small></td>
                                    <td><small className="fw-light">{item?.FloorPreference}</small></td>
                                    {item?.Room.length > 0 ? <td><small className="fw-light">
                                        <select className="">
                                            {item?.Room?.map((option, index) => (
                                                <option key={index} value={option} className="">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                    </small></td> : null}


                                    <td><small className="fw-light">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'}</small></td>
                                    <td><small className="fw-light">
                                        <select className="admin-all-response-remaks" onChange={(e) => setNotifyStatus({ status: e.target.value, id: item?._id })}>
                                            <option value={item?.notifyStatus?.status}>{item?.notifyStatus?.status}</option>
                                            {["Pending", "Completed"]
                                                .filter(status => status !== item?.notifyStatus?.status)
                                                .map((status) => (
                                                    <option key={status} value={status}   >
                                                        {status}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </small></td>
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
                                <th scope="col"><span className="fw-normal">Property Type</span></th>
                                <th scope="col"><span className="fw-normal">Project Name</span></th>

                                <th scope="col"><span className="fw-normal">Floor Prefrence</span></th>
                                <th scope="col"><span className="fw-normal">BHK Type</span></th>
                                <th scope="col"><span className="fw-normal">Budget</span></th>
                                <th scope="col"><span className="fw-normal">Date</span></th>
                                <th scope="col"><span className="fw-normal">Status</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {SingleUserResponseAction_Store?.requireData?.map((item) => {
                                return (<tr>

                                    <td><small className="fw-light">{item?.PropertyType}</small></td>
                                    <td><small className="fw-light  text-primary border-primary border-bottom px-2 border-opacity-50">
                                        {item?.ProjectName}
                                    </small></td>


                                    <td><small className="fw-light">{item?.FloorPreference}</small></td>
                                    <td><small className="fw-light">{item?.BHKType}</small></td>
                                    <td><small className="fw-light">{item?.Budget} {item?.unit}</small></td>
                                    <td><small className="fw-light">{item?.createAt ?
                                        FormatDateAndTime(item?.createAt)
                                        : 'N/A'}</small></td>
                                    <td><small className="fw-light">
                                        <select className="admin-all-response-remaks" onChange={(e) => setRequirementStatus({ status: e.target.value, id: item?._id })}>
                                            <option value={item?.requirementStatus?.status}>{item?.requirementStatus?.status}</option>
                                            {["Pending", "Completed"]
                                                .filter(status => status !== item?.requirementStatus?.status)
                                                .map((status) => (
                                                    <option key={status} value={status}   >
                                                        {status}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </small></td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }
        </div>
    )
}