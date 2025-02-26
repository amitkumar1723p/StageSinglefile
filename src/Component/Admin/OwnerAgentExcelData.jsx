import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerAllExcelFile } from '../../Action/postAction';
import axios from 'axios';
import "./OwnerAgentExcelData.css"
import { useNavigate } from 'react-router-dom';
import { GetAllAdminAction } from '../../Action/userAction';
const OwnerAgentExcelData = () => {

    const [file, setFile] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [selectedExcel, setSelectedeExcel] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null)

    console.log(selectedExcel, selectedAdmin)
    const { medata } = useSelector((state) => {
        return state.meDetails;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading: loadingGet, data: AdminData } = useSelector((state) => {
        return state.AdminData;
    });
    const fetchedAllFiles = useSelector((store) => store.OwnerAllExcelFiles.data)
    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === "PrintScreen") {
                setIsHidden(true);
                setTimeout(() => {
                    setIsHidden(false);
                }, 2000);
            }
        };

        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return alert("Please select a file!");
        dispatch(OwnerAllExcelFile(file))
    };
    //   Fetch all files on component mount
    useEffect(() => {
        if (!fetchedAllFiles) {


            dispatch(fetchAllOwnerFiles())
        }



    }, []);


    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {

            dispatch({
                type: "AssignExecleRequest",
                payload: "AssignExecleRequest",
            });
            const AssignedData = {
                adminId: selectedAdmin,
                excelId: selectedExcel,
            };
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/excel/assign-excel`, AssignedData, {
                withCredentials: true
            });
            dispatch({
                type: "AssignExecleSucess",
                payload: data,
            });


        } catch (error) {


            if (error.response) {
                dispatch({
                    type: "AssignExeclFail",
                    payload: error.response.data,
                });
            } else {
                dispatch({
                    type: "AssignExeclFail",
                    payload: { message: error.message, success: false },
                });
            }
            //   setMessage(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="file-handler-container">
            <h2>Upload file here</h2>

            {/* File Upload Section */}
            <div className="upload-section">
                <input type="file" className='upload-excel-file-input' onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
                <button onClick={uploadFile} className="file-handler-upload-button">
                    Upload
                </button>
            </div>

            <div className="select-section-admin">


                <div>
                    {" "}
                    <select
                        id="cars"
                        onChange={(e) => {
                            if (e.target.value == "Admin") {
                                dispatch({ type: "GetAllAdminClear" });
                                dispatch(GetAllAdminAction({ AdminVerify: true }));
                            } else if (e.target.value == "Agent") {
                                dispatch({ type: "GetAllAdminClear" });
                                dispatch(GetAllAdminAction({ AgentVerify:true}));
                            } else {
                                dispatch({ type: "GetAllAdminClear" });

                                // setAssignPropertyAdmin(null);
                            }
                        }}
                        // value={}
                        className="selectAssign"
                    >
                        <option value="">Assign</option>
                        (
                        <>
                            {medata?.user?.Role == "Owner" && (
                                <option value={`Admin`}>Admin</option>
                            )}

                            <option value={`Agent`}>Agent</option>
                        </>
                        )
                    </select>
                </div>
                {/* here start */}

                {/* here end */}
                {AdminData && AdminData.success && (
                    <select
                        className="selectAssign mx-1"
                        onChange={(e) => {
                            let FindAdmin = AdminData.Admin[e.target.value];
                            if (FindAdmin) {
                                setSelectedAdmin(FindAdmin._id);
                            } else {
                                setSelectedAdmin(null);
                            }
                        }}
                    >
                        <option value="">Select One</option>
                        {AdminData.Admin.map((e, i) => {
                            return (
                                <option key={i} value={i}>
                                    {e.Name}
                                </option>
                            );
                        })}
                    </select>
                )}

                {
                    selectedAdmin && selectedExcel && <button
                        className="Assing-Property-btn"
                        onClick={(e) => {
                            let confirm = window.confirm(
                                `wants to assign`
                            );
                            if (confirm) {
                                handleSubmit(e)
                                //  dispatch(adminAssigned({ AssignedData }));
                            }
                        }}
                    >
                        Assing Excel
                    </button>
                }


                {/* Buttons to change the status */}

                {/* <button className="px-3 mx-0 bg-primary bg-opacity-10 border border-info-subtle py-1 rounded" 
                    onClick={()=>handlePropertyStatus("available")}
                    >
                    Available
                    </button> */}
                {/* Display the current status */}
            </div>

            {/* File Cards */}
            {fetchedAllFiles?.length > 0 && (
                <div className="files-card-container">
                    {fetchedAllFiles?.map((item) => (

                        <div className='excel-checkbox-container'>

                            <input checked={selectedExcel === item._id} type="checkbox" className='' onChange={() => setSelectedeExcel(item?._id)} />
                            <div
                                key={item._id}
                                className="files-card"
                                onClick={() => navigate(`/admin/excel/${item._id}`)}
                            >

                                <div className="file-icon">📊</div>
                                <div className="file-name">{item.fileName}</div>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default OwnerAgentExcelData
