import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerUploadExcelFile } from '../../Action/postAction';
import axios from 'axios';
import "./OwnerAgentExcelData.css";
import { useNavigate } from 'react-router-dom';
import { deleteExcelFile, GetAllAdminAction } from '../../Action/userAction';

const OwnerAgentExcelData = () => {
    const [file, setFile] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [selectedExcel, setSelectedeExcel] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [securityOverlay, setSecurityOverlay] = useState(false);
    const componentRef = useRef(null);
    const [contentVisible, setContentVisible] = useState(true);

    const { medata } = useSelector((state) => {
        return state.meDetails;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading: loadingGet, data: AdminData } = useSelector((state) => {
        return state.AdminData;
    });
    const fetchedAllFiles = useSelector((store) => store.OwnerAllExcelFiles.data);

    // Enhanced PrintScreen detection
    useEffect(() => {
        // Multiple approaches to detect PrintScreen
        const handlePrintScreen = () => {
            console.log("PrintScreen detected");
            setIsHidden(true);
            setSecurityOverlay(true);
            setContentVisible(false);
            
            // Keep content hidden for a longer period
            setTimeout(() => {
                setIsHidden(false);
                setSecurityOverlay(false);
                setContentVisible(true);
            }, 3000);
        };

        // Method 1: Direct key event listener
        const handleKeyDown = (e) => {
            // PrintScreen key detection (code 44)
            if (e.keyCode === 44 || e.key === 'PrintScreen') {
                handlePrintScreen();
                e.preventDefault();
                return false;
            }
            
            // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (
                e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                // Windows+Shift+S for Snipping Tool
                (e.shiftKey && e.keyCode === 83 && e.metaKey)
            ) {
                e.preventDefault();
                setSecurityOverlay(true);
                setContentVisible(false);
                setTimeout(() => {
                    setSecurityOverlay(false);
                    setContentVisible(true);
                }, 3000);
                return false;
            }
        };
        
        // Method 2: Using copy event (clipboard operations often used with screenshots)
        const handleCopy = (e) => {
            e.preventDefault();
            handlePrintScreen();
            return false;
        };
        
        // Method 3: Using paste event
        const handlePaste = (e) => {
            e.preventDefault();
            return false;
        };
        
        // Method 4: Using blur/focus to detect window switching, which often happens during screenshots
        const handleBlur = () => {
            setIsHidden(true);
            setContentVisible(false);
            setTimeout(() => {
                setIsHidden(false);
                setContentVisible(true);
            }, 1000);
        };

        // Prevent right-click context menu
        const handleContextMenu = (e) => {
            e.preventDefault();
            return false;
        };

        // Method 5: Detect changes in browser size that might indicate dev tools
        const detectDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                setSecurityOverlay(true);
                setContentVisible(false);
            } else if (securityOverlay) {
                setSecurityOverlay(false);
                setContentVisible(true);
            }
        };

        // Register all event listeners
        window.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('paste', handlePaste);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('resize', detectDevTools);

        // Method 6: Create a transparent canvas over sensitive content that gets destroyed on PrintScreen
        const createProtectiveCanvas = () => {
            if (!componentRef.current) return;
            
            const rect = componentRef.current.getBoundingClientRect();
            const canvas = document.createElement('canvas');
            canvas.id = 'protective-canvas';
            canvas.width = rect.width;
            canvas.height = rect.height;
            canvas.style.position = 'absolute';
            canvas.style.top = `${rect.top + window.scrollY}px`;
            canvas.style.left = `${rect.left}px`;
            canvas.style.zIndex = '999';
            canvas.style.pointerEvents = 'none';
            
            document.body.appendChild(canvas);
            
            // Draw on canvas to make it intercept screenshots
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'; // Nearly invisible
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            return canvas;
        };
        
        const protectiveCanvas = createProtectiveCanvas();
        
        // Set up interval to detect dev tools
        const intervalId = setInterval(detectDevTools, 1000);

        // Clean up event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('paste', handlePaste);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('resize', detectDevTools);
            clearInterval(intervalId);
            
            if (protectiveCanvas) {
                document.body.removeChild(protectiveCanvas);
            }
        };
    }, [securityOverlay]);

    // CSS protection for screenshots and recordings
    useEffect(() => {
        // Add CSS to make screenshots and recordings harder
        const style = document.createElement('style');
        style.innerHTML = `
            .protected-content {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            
            .security-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #fff;
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            
            .hidden-content {
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.1s;
            }
            
            .visible-content {
                opacity: 1;
                visibility: visible;
                transition: opacity 0.5s;
            }
            
            @media print {
                .file-handler-container {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return alert("Please select a file!");
        dispatch(OwnerUploadExcelFile(file));
    };

    useEffect(() => {
        if (!fetchedAllFiles) {
            dispatch(fetchAllOwnerFiles());
        }
    }, []);



     const { data: adminAlertData, LodingType: AlertType } = useSelector(
        (state) => {
          return state.Post;
        }
      );
      useEffect(() => {
        if (adminAlertData && ["Delete_ExcelFileRequest","OwnerAllExcelFileRequest"].includes(AlertType)) {
          if (adminAlertData.success === true) {
            // dispatch(GetDeletedPostsAction());
            dispatch(fetchAllOwnerFiles())
          }
        }
    
        // eslint-disable-next-line
      }, [adminAlertData]);

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
        }
    };

    return (
        <>
            {securityOverlay && (
                <div className="security-overlay">
                    <h2>Security Alert</h2>
                    <p>Screen capture or developer tools are not allowed on this page.</p>
                </div>
            )}
            
            <div 
                className={`file-handler-container protected-content ${contentVisible ? 'visible-content' : 'hidden-content'}`} 
                ref={componentRef}
            >
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
                        <select
                            id="cars"
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
                            <>
                                {medata?.user?.Role === "Owner" && (
                                    <option value={`Admin`}>Admin</option>
                                )}
                                <option value={`Agent`}>Agent</option>
                            </>
                        </select>
                    </div>

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

                    {selectedAdmin && selectedExcel && (
                        <button
                            className="Assing-Property-btn"
                            onClick={(e) => {
                                let confirm = window.confirm(
                                    `wants to assign`
                                );
                                if (confirm) {
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
                                    `wants to delete`
                                );
                                if (confirm) {
                                 
                                    dispatch(deleteExcelFile(selectedExcel));
                                    // if (medata.user.Role === "Owner") {
                                    //     dispatch(fetchAllOwnerFiles());
                                    // }
                                    setSelectedeExcel(null);
                                }
                            }}
                        >
                            Delete Excel
                        </button>
                    )}
                </div>

                {/* File Cards */}
                {!isHidden && (
                    <>
                        {fetchedAllFiles?.length > 0 && (
                            <div className="files-card-container">
                                {fetchedAllFiles?.map((item) => (
                                    <div className='excel-checkbox-container' key={item._id}>
                                        <input 
                                            checked={selectedExcel === item._id} 
                                            type="checkbox" 
                                            onChange={() => {
                                                if (selectedExcel === item._id) {
                                                    setSelectedeExcel(null);
                                                } else {
                                                    setSelectedeExcel(item?._id);
                                                }
                                            }} 
                                        />
                                        <div
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
                    </>
                )}
            </div>
        </>
    );
};

export default OwnerAgentExcelData;