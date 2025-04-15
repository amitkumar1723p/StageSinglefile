import { useDispatch, useSelector } from 'react-redux';
import './FreshBookingForm'
import { useEffect, useState } from 'react';
import { getAllFreshProjectAction } from '../../../Action/freshProjectAction';
export function FreshProjectFilter() {

    const dispatch = useDispatch()

    const [projectName, setProjectName] = useState();
    const [type, setType] = useState()
    const [Adtype, setTAdtype] = useState()
    const [projectStatus, setProjectStatus] = useState()
    const [address, setAddress] = useState()
const[searchText,setSearchText]=useState()

    const { data: allFreshProjectData } = useSelector((state) => {
        return state.allFreshProjectData;
    });
    const allFreshBooking = allFreshProjectData?.projectData || [];

    useEffect(() => {
        
        dispatch(getAllFreshProjectAction({RouteType:"AdminRoutes"}))
    }, [])

    // filter function
    useEffect(() => {
        dispatch(getAllFreshProjectAction({projectName, type, Adtype, projectStatus, address,searchText ,RouteType:"AdminRoutes"}))
    }, [projectName, type, Adtype, projectStatus, address,searchText])

    // console.log(projectName,type,Adtype,projectStatus,address)


    return (
        <>

            <div className="conatiner">
                <div className=" mb-3  d-flex shadow-sm" style={{ width: "80%", height: "80px" }}>
                    <div className="col-2 ">
                        <select className="form-select-viewAll form-select-lg mb-3" onChange={(e) => setProjectName(e.target.value)} value={projectName}>
                            <option selected="" className="" value="">Project Name</option>
                            {allFreshBooking?.map((item, index) => (
                                <option value={item?.projectBasicDetail?.projectName} >{item?.projectBasicDetail?.projectName}
                                </option>

                            ))}


                        </select>
                        {
                            projectName ? <div className="">
                                <small className='fw-light ' onClick={() => setProjectName()}>{projectName}

                                    <span className='text-danger fw-bold'>&times;</span>
                                </small>
                            </div> : null
                        }

                    </div>
                    <div className="col-1">
                        <select
                            className="form-select-viewAll form-select-lg mb-3"
                            aria-label="Large select example"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option selected="" value={""}>Type</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>

                        </select>
                        {
                            type ? <div className="">
                                <small className='fw-light ' onClick={() => setType()}>{type}

                                    <span className='text-danger fw-bold'>&times;</span>
                                </small>
                            </div> : null
                        }
                    </div>
                    <div className="col-2"><select
                        className="form-select-viewAll form-select-lg mb-3"
                        aria-label="Large select example"
                        onChange={(e) => setTAdtype(e.target.value)}
                    >

                        <option selected="" value={""}>Ad Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Residential Flats">Residential Flats</option>
                        <option value="Plot/land">Plot/land</option>
                        <option value="Villa">Villa</option>
                        <option value="Farm House">Farm House</option>
                        <option value="Independent Floors">Independent Floors</option>

                    </select>
                        {
                            Adtype ? <div className="">
                                <small className='fw-light ' onClick={() => setTAdtype()}>
                                    {Adtype}
                                    <span className='text-danger fw-bold'>&times;</span>
                                </small>
                            </div> : null
                        }
                    </div>
                    <div className="col-2">
                        <select
                            className="form-select-viewAll form-select-lg mb-3"
                            aria-label="Large select example"
                            onChange={(e) => setProjectStatus(e.target.value)}
                        >
                            <option selected="" value={""}>ProjectStatus</option>
                            <option value="Ready to Move">Ready to Move</option>
                            <option value="Under Construction">Under Construction</option>
                            <option value="New Launch">New Launch</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                        {
                            projectStatus ? <div className="">
                                <small className='fw-light ' onClick={() => setProjectStatus()}>
                                    {projectStatus}
                                    <span className='text-danger fw-bold'>&times;</span>
                                </small>
                            </div> : null
                        }
                    </div>
                    <div className="col-2">
                        <select
                            className="form-select-viewAll form-select-lg mb-3"
                            aria-label="Large select example"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        >
                            <option selected="" value={""}>Address</option>
                            {allFreshBooking?.map((item, index) => (
                                <option key={index} value={`${item?.projectBasicDetail?.locality || 'N/A'},${item?.projectBasicDetail?.projectCity || 'N/A'}`}>
                                    {item?.projectBasicDetail?.locality || 'N/A'}, {item?.projectBasicDetail?.projectCity || 'N/A'}
                                </option>


                            ))}


                        </select>
                        {
                            address ? <div className="">
                                <small className='fw-light ' onClick={() => setAddress()}>
                                    {address}
                                    <span className='text-danger fw-bold'>&times;</span>
                                </small>
                            </div> : null
                        }
                    </div>
                    <div className="col--3"></div>
                    <div className="d-flex h-50">
                        <input type="text" placeholder='e.g:Dlf The Primus' className='my-2 form-select-viewAll ' 
                        onChange={(e)=>setSearchText(e.target.value)}  value={searchText}/>
                        <button className='my-2 border-0 bg-body'><span className='mt-1'>Search</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}