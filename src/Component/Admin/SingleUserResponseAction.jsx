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
        
      }, [index,indexAgent]);
    return (
        <div className="single-user-response-action-container ">

            <div className="ps-4 pt-4 mb-5">
                <div className="single-user-response-info-container " >
                    <div className="single-user-response-info-top">
                        <div className="single-fresh-user-name">
                            <h2>{SingleUserResponseAction_Store?.user?.Name}</h2>
                        </div>
                        <div className="single-user-response-info-top-button">
                            <div className="single-user-response-role">
                                <p>{SingleUserResponseAction_Store?.user?.Role}</p>
                            </div>
                            <a href={`tel:${SingleUserResponseAction_Store?.user?.ContactNumber}`}>
                            <button className="single-user-response-call-button">
                                <img src="/img/singleresponsecall.svg" alt="call" />
                                <span>Call</span>
                            </button>
                            </a>
                           
                        </div>
                    </div>
                    <div className="single-user-response-info-bottom">
                        <div className="single-user-response-phno-email">
                            <div className="single-user-response-phone">
                            <img src="/img/singleresponsecall.svg" alt="call" />
                            <p>{SingleUserResponseAction_Store?.user?.ContactNumber}</p>
                            
                            </div>
                            <div className="single-user-response-email">
                            <img src="/img/Envelope.svg" alt="mail" />
                           <p> {SingleUserResponseAction_Store?.user?.email}</p>
                            </div>

                        </div>
                        <a className="text-bolder user-select-none" onClick={handleEmailOffer}>
                        <button className="single-user-response-email-button">
                        <img src="/img/EnvelopeOpen.svg" alt="mail" />
                        <span>Mail</span>
                        </button>
                        </a>
                        
                    </div>



                    

                    {/* <ul className="list-group list-group-flush ">
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
                    </ul> */}
                </div>
            </div>
            <div className="single-user-response-filter-container">
                <div className=" main-form-data-section d-flex  mt-3  " >

                    <div className=" text-center "><small className={activeTable === 3 ?
                        '  isSingleFilterButtonActive ' :
                        '  isSingleFilterButtonNotActive   '}
                        onClick={() => setActiveTable(3)}>Listings <span>{SingleUserResponseAction_Store?.posts?.length}</span></small></div>


                    <div className=" text-center " ><small className={activeTable === 1 ?
                        '  isSingleFilterButtonActive ' :
                        '   isSingleFilterButtonNotActive   '}
                        onClick={() => setActiveTable(1)}>Visits <span>{SingleUserResponseAction_Store?.schedules?.length}</span></small></div>

                    <div className="text-center "><small className={activeTable === 2 ?
                        '   isSingleFilterButtonActive ' :
                        '  isSingleFilterButtonNotActive '}
                        onClick={() => setActiveTable(2)}>Offers<span>{SingleUserResponseAction_Store?.offers?.length}</span></small></div>

                    <div className=" text-center "><small className={activeTable === 5 ?
                        '     isSingleFilterButtonActive ' :
                        '     isSingleFilterButtonNotActive'}
                        onClick={() => setActiveTable(5)}>Requirements <span>{SingleUserResponseAction_Store?.requireData?.length}</span> </small></div>

                    <div className=" text-center"><small className={activeTable === 4 ?
                        '   isSingleFilterButtonActive  ' :
                        '   isSingleFilterButtonNotActive  '}
                        onClick={() => setActiveTable(4)}>Notification <span>{SingleUserResponseAction_Store?.notifyData?.length}</span></small></div>





                </div>
            </div>
            {
                activeTable === 1 && (

                    <div className="">    <table className="table table-striped">
                        <thead className="single-user-response-table-head-container">
                            <tr>
                                <th scope="col"><span className="fw-normal ">PROPERTY TYPE</span></th>
                                <th scope="col"> <span className="fw-normal ">PROJECT NAME</span></th>
                                <th scope="col"> <span className="fw-normal "> POST-ID</span></th>
                                <th scope="col"><span className="fw-normal">PROPERTY STATUS</span></th>
                                <th scope="col"><span className="fw-normal ">VISIT DATE & TIME </span></th>
                                <th scope="col"><span className="fw-normal">VISIT STATUS</span></th>
                                {/* <th scope="col"><span className="fw-normal">Visit Time</span></th> */}
                            </tr>
                        </thead>
                        <tbody className="single-user-response-table-body-container">
                            {SingleUserResponseAction_Store?.schedules?.slice().reverse().map((item) => {
                            
                                return (<tr>
                                    {/* <td><small className="fw-light">{item?.LocationDetails?.ProjectName}</small></td> */}
                                    <td className="" style={{width:"210px"}}><small className=" ">{item?.PostData?.PostId?.BasicDetails?.ApartmentType}</small></td>
                                    <td 
                                
                                        className="cursor-pointer "
                                        onClick={(e) => {
                                            window.open(`/post-detail/${item?.PostData?.PostId?._id}`, 'SinglePostDetail');
                                        }}
                                    >
                                        <small className="">
                                            {item?.PostData?.PostId?.LocationDetails?.ProjectName} - {item?.PostData?.PostId?.LocationDetails?.Landmark} {item?.PostData?.PostId?.LocationDetails?.City}  
                                        </small>
                                    </td>
                                    <td><small className=" ">{item?.PostData?.PostId?._id}</small></td>


                                    <td><small className={`${item?.PostData?.PostId?.PostVerify === true ? "single-user-response-active" : "single-user-response-inactive"}`}>{item?.PostData?.PostId?.PostVerify === true ? "Active" : "Inactive"}</small></td>
                                    <td><small className=" ">{item?.VisitDate ? FormatDate(item?.VisitDate) : 'N/A'} ({item?.VisitTime?.From} {item?.VisitTime?.To})</small></td>
                                    <td><small className=" ">
                                        <select
                                            className={`admin-all-response-remaks border`}
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
                    <div className="">    <table className="table table-striped">
                        <thead className={`single-user-response-table-head-container `}>
                            <tr>
                                {/* <th scope="col"> <span className="fw-normal">Project Name</span></th> */}

                                <th scope="col"> <span className="fw-normal">PROJECT NAME</span></th>
                                <th scope="col"> <span className="fw-normal">POST-ID</span></th>

                                <th scope="col"> <span className="fw-normal">PROJECT PRICE</span></th>
                                <th scope="col"> <span className="fw-normal">PROPERTY TYPE</span></th>
                                <th scope="col"><span className="fw-normal">OFFER PRICE</span></th>
                                <th scope="col"><span className="fw-normal"> OFFER DATE</span></th>
                                <th scope="col"><span className="fw-normal"> STATUS</span></th>
                            </tr>
                        </thead>
                        <tbody className="single-user-response-table-body-container">
                            {SingleUserResponseAction_Store?.offers?.slice().reverse().map((item) => {
                                return (<tr>



                                    <td style={{ maxWidth: '280px' }} className=" cursor-pointer" onClick={(e) => {

                                        window.open(`/post-detail/${item?.PostData?.PostId?._id}`, 'SinglePostDetail2')
                                    }}
                                    ><small className="single-user-response-project-name text-truncate text-nowrap overflow-hidden   d-inline-block w-100">{item?.PostData?.PostId?.LocationDetails?.ProjectName} -
                                            {item?.PostData?.PostId?.LocationDetails?.Landmark} {item?.PostData?.PostId?.LocationDetails?.Locality}</small></td>
                                            <td><small className="">{item?.PostData?.PostId?._id}</small></td>

                                    <td><small className="">{formatPrice(item?.PostData?.PostId?.PricingDetails?.ExpectedPrice)}</small></td>
                                    <td><small className="">{item?.PostData?.PostId?.BasicDetails?.ApartmentType}</small></td>
                                    <td><small className="">{formatPrice(item?.BidPrice)}</small></td>
                                    <td><small className="">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'} </small></td>
                                    <td><small className="">
                                        <select className={`admin-all-response-remaks border ` } onChange={(e) => setOfferStatus({ status: e.target.value, id: item?._id })}>
                                            <option value={item?.bidStatus?.status}>{item?.bidStatus?.status}</option>
                                            {["Made", "Accepted", "Rejected"]
                                                .filter(status => status !== item?.bidStatus?.status)
                                                .map((status) => (
                                                    
                                                    <option className={`${status === "Accepted" ?"single-user-dropdown-accepted":''} ${status === "Rejected" ?"single-user-dropdown-rejected":''} ${status === "Made" ?"single-user-dropdown-made":''}`}  key={status} value={status}   >
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
                    <div className="">    <table className="table table-striped">
                        <thead className="single-user-response-table-head-container">
                            <tr>
                            <th scope="col"> <span className="single-fresh-property-type fw-normal ps-4">PROPERTY TYPE</span></th>
                                <th scope="col"> <span className="fw-normal">PROJECT NAME</span></th>
                                <th scope="col"> <span className="fw-normal">POST-ID</span></th>
                               
                                <th scope="col"> <span className="fw-normal">LISTING STATUS</span></th>
                                <th scope="col"> <span className="fw-normal">DATE</span></th>
                            </tr>
                        </thead>
                        <tbody className="single-user-response-table-body-container">
                            {SingleUserResponseAction_Store?.posts?.slice().reverse().map((item) => {
                                return (<tr >
                                    
                                    <td  style={{ maxWidth: '160px' }}><small className=" ps-4">{item?.BasicDetails?.ApartmentType}</small></td>
                                    <td style={{ maxWidth: '260px' }} className="pe-5">
                                        <small
                                            className="single-user-response-project-name text-truncate text-nowrap overflow-hidden cursor-pointer d-inline-block w-100"
                    
                                            onClick={() => window.open(`/post-detail/${item?._id}`, 'SinglePostDetail')}
                                        >
                                            {item?.LocationDetails?.ProjectName} -
                                            {item?.LocationDetails?.Landmark}, {item?.LocationDetails?.City}
                                        </small>
                                    </td>

                                    <td><small className="">{item?._id}</small></td>
                                    <td>
                                        <small className={`ps-3 ${item.PostVerify === true? "single-user-response-active":'single-user-response-inactive'}`}>
                                            {item?.PostVerify === true ? "Active" : "Inactive"}
                                        </small>
                                    </td>
                                    <td><small className="">{item?.createAt ? FormatDate(item?.createAt) : 'N/A'}</small></td>
                                </tr>)
                            })}


                        </tbody>
                    </table></div>
                )
            }
            {
                activeTable === 4 && (
                    <div className="">    <table className="table table-striped">
                        <thead className="single-user-response-table-head-container">
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
                        <tbody className="single-user-response-table-body-container">
                            {SingleUserResponseAction_Store?.notifyData?.slice().reverse().map((item) => {

                                return (<tr>


                                    <td style={{ maxWidth: '150px' }}>
                                        <small className="single-user-response-project-name text-truncate text-nowrap overflow-hidden  d-inline-block w-100">
                                            {item?.ProjectName}</small>
                                    </td>
                                    <td><small className="">{item?.BHKType}</small></td>
                                    <td><small className="">{item?.FloorPreference}</small></td>
                                    {item?.Room.length > 0 ? <td>
                                        <span className="admin-all-response-remaks ">{"|"}{" "}
                                            {item?.Room?.map((option, index) => (
                                                <small key={index} value={option} className="">
                                                    {option}{" |"}
                                                </small>
                                            ))}
                                        </span>

                                    </td> : null}


                                    <td><small className="">{item?.createAt ? dateTimeFormatter.format(new Date(item?.createAt)) : 'N/A'}</small></td>
                                    <td><small className="">
                                        <select  className="admin-all-response-remaks border"  onChange={(e) => setNotifyStatus({ status: e.target.value, id: item?._id })}>
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
                    <div className="">    <table className="table table-striped">
                        <thead className="single-user-response-table-head-container">
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
                        <tbody className="single-user-response-table-body-container">
                            {SingleUserResponseAction_Store?.requireData?.map((item) => {
                                return (<tr>

                                    <td><small className="">{item?.PropertyType}</small></td>
                                    <td><small className=" text-truncate text-nowrap overflow-hidden  d-inline-block w-100 ">
                                        {item?.ProjectName}
                                    </small></td>


                                    <td><small>{item?.FloorPreference ? item.FloorPreference : '----'}</small></td>

                                    <td><small className="">{item?.BHKType ? item?.BHKType :'----'}</small></td>
                                    <td><small className="">{item?.Budget} {item?.unit}</small></td>
                                    <td><small className="">{item?.createAt ?
                                        FormatDateAndTime(item?.createAt)
                                        : 'N/A'}</small></td>
                                    <td><small className="">
                                        <select className={`admin-all-response-remaks border`}  onChange={(e) => setRequirementStatus({ status: e.target.value, id: item?._id })}>
                                            <option className={``} value={item?.requirementStatus?.status}>{item?.requirementStatus?.status}</option>
                                            {["Pending", "Completed"]
                                                .filter(status => status !== item?.requirementStatus?.status)
                                                .map((status) => (
                                                    <option className={`dropdown-default-background `}   key={status} value={status}   >
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