import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerUploadExcelFile } from '../../Action/postAction';
import axios from 'axios';
import "./OwnerAgentExcelData.css";
import { useNavigate } from 'react-router-dom';
import { deleteExcelFile, GetAllAdminAction } from '../../Action/userAction';
import { toast } from 'react-toastify';

const OwnerAgentExcelData = () => {
    const [file, setFile] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [selectedExcel, setSelectedeExcel] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [securityOverlay, setSecurityOverlay] = useState(false);
    const componentRef = useRef(null);
    const uploadToastId = useRef(null);
    const fileInputRef = useRef(null); // ✅ ADDED: ref to control input field

    const { medata } = useSelector((state) => state.meDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading: loadingGet, data: AdminData } = useSelector((state) => state.AdminData);
    const fetchedAllFiles = useSelector((store) => store.OwnerAllExcelFiles.data);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = () => {
        if (!file) return alert("Please select a file!");
        dispatch(OwnerUploadExcelFile(file));
    };

    useEffect(() => {
        if (!fetchedAllFiles) {
            dispatch(fetchAllOwnerFiles());
        }
    }, []);

    const { data: adminAlertData, LodingType: AlertType, loading: AlertLoading } = useSelector((state) => state.Post);

    useEffect(() => {
        if (adminAlertData && ["Delete_ExcelFileRequest", "OwnerAllExcelFileRequest"].includes(AlertType)) {
            if (adminAlertData.success === true) {
                dispatch(fetchAllOwnerFiles());
            }
        }

        if (["OwnerAllExcelFileRequest"].includes(AlertType)) {
            if (AlertLoading && !uploadToastId.current) {
                uploadToastId.current = toast.loading("Uploading file...");
            }

            if (!AlertLoading && uploadToastId.current) {
                toast.update(uploadToastId.current, {
                    render: "File uploaded successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });

                setFile(null); // ✅ Clear file from state
                if (fileInputRef.current) fileInputRef.current.value = ''; // ✅ Clear input field manually

                uploadToastId.current = null;
            }
        }
        // eslint-disable-next-line
    }, [adminAlertData, AlertLoading]);

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            dispatch({ type: "AssignExecleRequest", payload: "AssignExecleRequest" });

            const AssignedData = {
                adminId: selectedAdmin,
                excelId: selectedExcel,
            };

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/excel/assign-excel`, AssignedData, {
                withCredentials: true
            });

            dispatch({ type: "AssignExecleSucess", payload: data });
        } catch (error) {
            const errorPayload = error.response
                ? error.response.data
                : { message: error.message, success: false };

            dispatch({ type: "AssignExeclFail", payload: errorPayload });
        }
    };

    return (
        <div className={`file-handler-container protected-content`}>
            <h2>Upload file here</h2>

            {/* File Upload Section */}
            <div className="upload-section">
                <input
                    type="file"
                    className='upload-excel-file-input'
                    onChange={handleFileChange}
                    accept=".xlsx,.xls,.csv"
                    ref={fileInputRef} // ✅ Connect ref to input
                />
                <button onClick={uploadFile} className="file-handler-upload-button">
                    Upload
                </button>
            </div>

            {/* Admin/Agent Selection */}
            <div className="select-section-admin">
                <div>
                    <select
                        onChange={(e) => {
                            if (e.target.value === "Admin") {
                                dispatch({ type: "GetAllAdminClear" });
                                dispatch(GetAllAdminAction({ AdminVerify: true }));
                            } else if (e.target.value === "Agent") {
                                dispatch({ type: "GetAllAdminClear" });
                                dispatch(GetAllAdminAction({ AgentVerify: true }));
                            } else {
                                dispatch({ type: "GetAllAdminClear" });
                            }
                        }}
                        className="selectAssign"
                    >
                        <option value="">Assign</option>
                        {medata?.user?.Role === "Owner" && <option value="Admin">Admin</option>}
                        <option value="Agent">Agent</option>
                    </select>
                </div>

                {AdminData && AdminData.success && (
                    <select
                        className="selectAssign mx-1"
                        onChange={(e) => {
                            const FindAdmin = AdminData.Admin[e.target.value];
                            setSelectedAdmin(FindAdmin ? FindAdmin._id : null);
                        }}
                    >
                        <option value="">Select One</option>
                        {AdminData.Admin.map((e, i) => (
                            <option key={i} value={i}>{e.Name}</option>
                        ))}
                    </select>
                )}

                {selectedAdmin && selectedExcel && (
                    <button
                        className="Assing-Property-btn"
                        onClick={(e) => {
                            if (window.confirm(`Do you want to assign?`)) {
                                handleSubmit(e);
                            }
                        }}
                    >
                        Assign Excel
                    </button>
                )}

                {selectedExcel && (
                <button
                className="delete-Property-btn"
                onClick={(e) => {
                    let confirm = window.confirm(
                       "wants to delete"
                    );
                  

                    if (confirm) {
                        dispatch(deleteExcelFile(selectedExcel));
                        setSelectedeExcel(null);
                        // if (medata.user.Role === "Owner") {
                        //     dispatch(fetchAllOwnerFiles());
                        // }
                    }
                }}
            >
                Delete Excel
            </button>
                )}
            </div>

            {/* File Cards */}
            {!isHidden && (
                <div className="files-card-container-parent">
                    {fetchedAllFiles?.length > 0 ? (
                        <div className="files-card-container">
                            {fetchedAllFiles.map((item) => (
                                <div className='excel-checkbox-container' key={item._id}>
                                    <input
                                        checked={selectedExcel === item._id}
                                        type="checkbox"
                                        onChange={() => {
                                            setSelectedeExcel(prev => prev === item._id ? null : item._id);
                                        }}
                                    />
                                    <div
                                        className="files-card"
                                        onClick={() => navigate(`/excel/${item._id}`)}
                                    >
                                        <div className="file-icon">📊</div>
                                        <div className="file-name">{item.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='no-excel-found'>
                            <p>Sorry no excel found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OwnerAgentExcelData;
