// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllOwnerFiles, OwnerUploadExcelFile, removeExcelFromAdminAction } from '../../Action/postAction';
// import axios from 'axios';
// import "./OwnerAgentExcelData.css"
// import { useParams } from 'react-router-dom';
// const OwnerAgentExcel = () => {

//     const [file, setFile] = useState(null);
//     const [fileId, setFileId] = useState(null);
//     const [data, setData] = useState([]);
//     const [columns, setColumns] = useState([]);
//     const [isHidden, setIsHidden] = useState(false);
//     const [AssinedAdmins, setAssignedAdmins] = useState([]);
//     const [allAdmins,setAllAdmins]=useState([]);
//     const [filterdAdmins,setFilterAdmin]= useState([])

//     const dispatch= useDispatch();
//     const { medata } = useSelector((state) => {
//         return state.meDetails;
//       });
//     const {id}=useParams("id")
// console.log(allAdmins)
//     const fetchedAllFiles =useSelector((store)=>store.OwnerAllExcelFiles.data)
//     useEffect(() => {
//         const handleKeyUp = (event) => {
//           if (event.key === "PrintScreen") {
//             setIsHidden(true);
//             setTimeout(() => {
//               setIsHidden(false);
//             }, 2000);
//           }
//         };

//         document.addEventListener("keyup", handleKeyUp);
//         return () => {
//           document.removeEventListener("keyup", handleKeyUp);
//         };
//       }, []);


//      async function getAllAdminsAgents(Keyword){
//      try {
//         let url;
//         if (Keyword) {
//           url = `${process.env.REACT_APP_API_URL}/admin-owner/admin-data?${
//             Object.keys(Keyword)[0]
//           }=${Keyword[Object.keys(Keyword)[0]]}`;
//         } else {
//           url = `/admin-owner/admin-data`;
//         }
//         // if(ke)

//         const config = {
//           headers: { "Content-Type": "application/json" },

//           withCredentials: true,
//         };

//         const { data } = await axios.get(url, config);



//         setAllAdmins((prev)=>{
//             return [...prev,...data.Admin]
//         })

//      } catch (error) {
//         console.log(error)
//      }


//       }


//       useEffect(()=>{
//         fetchSingleFileData(id);
//         setAllAdmins([])
//         getAllAdminsAgents({ AgentVerify: true })
//         getAllAdminsAgents({ AdminVerify: true })
//         // console.log(object)
//       },[id])




//     const handleCellChange = (rowIndex, columnName, value) => {
//         setData((prevData) => {
//           const updatedData = [...prevData];
//           updatedData[rowIndex][columnName] = value;
//           return updatedData;
//         });
//       };


//           // Add new editable column
//     const addEditableColumn = async () => {
//         if (!fileId) return alert("Please select a file first!");

//         const columnName = prompt("Enter new column name:");
//         if (!columnName) return alert("Column name cannot be empty!");

//         try {
//           const res = await axios.post(`http://localhost:5000/excel/file/${fileId}/add-column`, {
//             columnName,
//           });
//           setColumns(res.data.file.columns);
//           setData(res.data.file.rows);
//         } catch (err) {
//           console.error("Error adding column:", err);
//         }
//       };

//       useEffect(()=>{
//         const agentIdsSet = new Set(AssinedAdmins.map(agent => agent.AdminId._id));

//         console.log("seeting agent  ",agentIdsSet)
//         // Find common AdminIds
//         const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));
//         console.log("thi sis matchinggg ",matchingAdmins)
//         setFilterAdmin(matchingAdmins)
//       },[allAdmins,AssinedAdmins])

//       // Save changes
//       const saveChanges = async () => {
//         if (!fileId) return alert("Please select a file first!");

//         try {
//           await axios.put(`http://localhost:5000/excel/file/${fileId}/update`, {
//             updates: data.map((row, index) =>
//               columns
//                 .filter((col) => col.editable)
//                 .map((col) => ({
//                   rowIndex: index,
//                   columnName: col.name,
//                   newValue: row[col.name],
//                 }))
//             ).flat(),
//           },{
//             withCredentials:true
//           });
//           alert("Changes saved successfully!");
//         } catch (err) {
//           console.error("Error saving changes:", err);
//         }
//       };

//       // Fetch single file data
//     const fetchSingleFileData = async (id) => {
//         try {
//           const res = await axios.get(`http://localhost:5000/excel/file/${id}`);
//         //   console.log(res)
//           setAssignedAdmins(res.data.admins)
//           setColumns(res.data.fileData.columns);
//           setData(res.data.fileData.rows);
//           setFileId(id);
//         } catch (err) {
//           console.error("Error fetching file data:", err);
//         }
//       };



//   return (

//     <div className='file-handler-table-container'>

//            {/* Add Column Button */}
//           {medata?.user?.Role === "Owner"&&
//              <button onClick={addEditableColumn} className="file-handler-add-button">
//              Add Column
//            </button>
//           }

//           {medata?.user?.Role === "Owner"&&
//             <div className='assigned-admins-container'>
//                 Assigned to: {
//                     filterdAdmins?.map((item)=><div  className='assigned-admin-name'>
//                         <p key={item._id}>{ item.Name}</p>
//                         <button onClick={()=>{
//                             dispatch(removeExcelFromAdminAction(item._id,id));
//                                 setFilterAdmin((prev)=>{

//                                     const newAdmins = prev.filter((admin)=>{
//                                           return  admin._id!==item._id
//                                     })

//                                     return newAdmins
//                                 })
//                         }}>*</button>
//                     </div>)
//                 }
//             </div>
//           }
//                {/* Data Table */}
//                {!isHidden && data?.length > 0 && (
//             <table className="file-handler-table">
//               <thead>
//                 <tr>
//                   <th className="file-handler-table-header">Sno.</th>
//                   {columns.map((col, index) => (
//                     <th key={index} className="file-handler-table-header">
//                       {col.name} {col.editable ? "(Editable)" : ""}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     <td className="file-handler-table-data">{rowIndex + 1}</td>
//                     {columns.map((col, colIndex) => (
//                       <td key={colIndex} className="file-handler-table-data">
//                         {col.editable ? (
//                           <input
//                             type="text"
//                             value={row[col.name]}
//                             onChange={(e) =>
//                               handleCellChange(rowIndex, col.name, e.target.value)
//                             }
//                           />
//                         ) : (
//                           row[col.name]
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {/* Save Button */}
//           {data?.length > 0 && (
//             <button onClick={saveChanges} className="file-handler-save-button">
//               Save Changes
//             </button>
//           )}

//     </div>
//   )
// }

// export default OwnerAgentExcel


import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeExcelFromAdminAction } from '../../Action/postAction';
import axios from 'axios';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"
import "./OwnerAgentExcelData.css"
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client'; // Import Socket.io client

const OwnerAgentExcel = () => {
  const [fileId, setFileId] = useState(null);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Track original data for comparison
  const [columns, setColumns] = useState([]);
  const [originalColumns, setOriginalColumns] = useState([]); // To track original column names
  const [isHidden, setIsHidden] = useState(false);
  const [AssinedAdmins, setAssignedAdmins] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [filterdAdmins, setFilterAdmin] = useState([]);
  const [editingHeader, setEditingHeader] = useState(null);
  const [hasHeaderChanges, setHasHeaderChanges] = useState(false); // Flag for header changes
  const [fileName, setFileName] = useState("exported_data");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { id } = useParams("id")
 
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent Developer Tools
      if (
        event.key === "F12" || // F12 Key
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") || // Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") || // Ctrl + Shift + J
        (event.ctrlKey && event.key.toLowerCase() === "u") // Ctrl + U (View Source) 
        ||  (event.shiftKey && event.metaKey )
      ) {
        event.preventDefault();
    
        setIsHidden(true);
  
        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }

      // Prevent Printing (Ctrl + P)
      if (event.ctrlKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
          setIsHidden(true);
    
          // alert("Screenshot detected! Your activity is being monitored.");
  
          setTimeout(() => {
            setIsHidden(false);
          }, 2000); // Restore UI after 2 seconds
      }

      // Prevent Snipping Tool (Win + Shift + S)
      if (event.shiftKey && event.metaKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setIsHidden(true);
  
        // alert("Screenshot detected! Your activity is being monitored.");

        setTimeout(() => {
          setIsHidden(false);
        }, 2000); // Restore UI after 2 seconds
      }
    };

    const handlePrintScreen = (event) => {
      if (event.key === "PrintScreen") {
        event.preventDefault();
          setIsHidden(true);
    
          // alert("Screenshot detected! Your activity is being monitored.");
  
          setTimeout(() => {
            setIsHidden(false);
          }, 2000); // Restore UI after 2 seconds
      }
    };

    const handleRightClick = (event) => {
      event.preventDefault();
      alert("Right-click is disabled!");
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handlePrintScreen);
    document.addEventListener("contextmenu", handleRightClick);

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handlePrintScreen);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  async function getAllAdminsAgents(Keyword) {
    try {
      let url;
      if (Keyword) {
        url = `${process.env.REACT_APP_API_URL}/admin-owner/admin-data?${Object.keys(Keyword)[0]
          }=${Keyword[Object.keys(Keyword)[0]]}`;
      } else {
        url = `/admin-owner/admin-data`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      setAllAdmins((prev) => {
        return [...prev, ...data.Admin]
      })

    } catch (error) {
      console.log(error)
    }
  }

  const fetchSingleFileDataOwner = async (id) => {
  
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/excel/owner/file/${id}`, { withCredentials: true });
      setAssignedAdmins(res.data.admins);
      setColumns(res.data.fileData.columns);
      setOriginalColumns([...res.data.fileData.columns]); // Store original column names
      setData(res.data.fileData.rows);
      // Create a deep copy of the original data for comparison
      setOriginalData(JSON.parse(JSON.stringify(res.data.fileData.rows)));
      setFileId(id);
      setHasHeaderChanges(false);
    } catch (err) {
      console.error("Error fetching file data:", err);
    }
  };

  const fetchSingleFileData = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/excel/file/${id}`, { withCredentials: true });
      setAssignedAdmins(res.data.admins);
      setColumns(res.data.fileData.columns);
      setOriginalColumns([...res.data.fileData.columns]); // Store original column names
      setData(res.data.fileData.rows);
      // Create a deep copy of the original data for comparison
      setOriginalData(JSON.parse(JSON.stringify(res.data.fileData.rows)));
      setFileId(id);
      setHasHeaderChanges(false);
    } catch (err) {
      navigate("/admin/dashboard")
      console.error("Error fetching file data:", err);
    }
  };

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL);
    
    // Join spreadsheet room
    socketRef.current.emit('joinSpreadsheet', id);
    
      fetchSingleFileDataOwner(id)
    
    setAllAdmins([])
    getAllAdminsAgents({ AgentVerify: true })
    getAllAdminsAgents({ AdminVerify: true })
  }, [id])

  const handleCellChange = (rowIndex, columnName, value) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex][columnName] = value;
      return updatedData;
    });
  };

  // Handle header cell click to start editing
  const handleHeaderClick = (colIndex) => {
    if (columns[colIndex].editable && medata?.user?.Role === "Owner") {
      setEditingHeader(colIndex);
    }
  };

  // Handle header name change
  const handleHeaderChange = (colIndex, newName) => {
    if (!columns[colIndex].editable) return;

    setColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      updatedColumns[colIndex] = { ...updatedColumns[colIndex], name: newName };
      return updatedColumns;
    });

    // Update all row data with the new column name
    setData(prevData => {
      return prevData.map(row => {
        const newRow = { ...row };
        newRow[newName] = row[originalColumns[colIndex].name];
        if (newName !== originalColumns[colIndex].name) {
          delete newRow[originalColumns[colIndex].name];
        }
        return newRow;
      });
    });

    // Set flag to indicate headers have changed
    setHasHeaderChanges(true);
  };

  // Finish editing header
  const finishEditingHeader = () => {
    setEditingHeader(null);
  };

  // Save header changes to the database
  const saveHeaderChanges = async () => {
    if (!fileId) return alert("Please select a file first!");

    // Compare current columns with original columns to find changes
    const changes = columns.map((col, index) => {
      if (col.name !== originalColumns[index].name && col.editable) {
        return {
          oldColumnName: originalColumns[index].name,
          newColumnName: col.name
        };
      }
      return null;
    }).filter(change => change !== null);

    if (changes.length === 0) {
      alert("No header changes to save.");
      return;
    }

    try {
      // Save each header change one by one
      for (const change of changes) {
        await axios.put(`${process.env.REACT_APP_API_URL}/excel/file/${fileId}/rename-column`, change, {
          withCredentials: true
        });
      }

      alert(`${changes.length} column headers updated successfully!`);

      // Refresh data to update original columns
      if(medata.user.Role==="Owner")
      {
        fetchSingleFileDataOwner(fileId)
      }else{
        fetchSingleFileData(fileId);
      }
      setHasHeaderChanges(false);
    } catch (err) {
      console.error("Error saving header changes:", err);
      alert("Error saving header changes: " + (err.response?.data?.message || err.message));
    }
  };

  // Add new editable column
  const addEditableColumn = async () => {
    if (!fileId) return alert("Please select a file first!");

    const columnName = prompt("Enter new column name:");
    if (!columnName) return alert("Column name cannot be empty!");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/excel/file/${fileId}/add-column`, {
        columnName,
      },
      {
        withCredentials: true
      });
      setColumns(res.data.file.columns);
      setOriginalColumns(res.data.file.columns);
      setData(res.data.file.rows);
      setOriginalData(JSON.parse(JSON.stringify(res.data.file.rows))); // Update originalData too
    } catch (err) {
      console.error("Error adding column:", err);
    }
  };

  useEffect(() => {
    const agentIdsSet = new Set(AssinedAdmins.map(agent => agent.AdminId._id));
   
    // Find common AdminIds
    const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));
    
    setFilterAdmin(matchingAdmins)
  }, [allAdmins, AssinedAdmins])

  // Updated saveChanges function to only send actual changes
  const saveChanges = async () => {
    if (!fileId) return alert("Please select a file first!");

    try {
      // Create updates array to track changed values only
      const updates = [];

      // Compare current data with original data to find changes
      data.forEach((row, rowIndex) => {
        if (rowIndex < originalData.length) { // For existing rows
          columns.forEach((col) => {
            const columnName = col.name;
            // Check if the column exists in the original data
            const originalValue = originalData[rowIndex][columnName];
            const currentValue = row[columnName];
            
            // Only add to updates if value has changed
            if (currentValue !== originalValue) {
              updates.push({
                rowIndex,
                columnName,
                newValue: currentValue || ""
              });
            }
          });
        } else { // For newly added rows
          columns.forEach((col) => {
            const columnName = col.name;
            if (row[columnName] !== undefined) {
              updates.push({
                rowIndex,
                columnName,
                newValue: row[columnName] || ""
              });
            }
          });
        }
      });

      if (updates.length === 0) {
        alert("No changes detected.");
        return;
      }

      

      // Send update request to backend
      await axios.put(
        `${process.env.REACT_APP_API_URL}/excel/file/${fileId}/update`,
        { updates },
        { withCredentials: true }
      );

      // Update originalData to match current data after successful save
      setOriginalData(JSON.parse(JSON.stringify(data)));
      
      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Error saving changes: " + (err.response?.data?.message || err.message));
    }
  };

  //downloadfile
  function handleDownload() {
    if (columns.length === 0 || data.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Extract column names
    const columnNames = columns.map(col => col.name);

    // Convert object-based rows into array-based rows
    const rowData = data.map(row => columnNames.map(col => row[col] || ""));

    // Create a worksheet with column headers and row data
    const worksheet = XLSX.utils.aoa_to_sheet([columnNames, ...rowData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate an Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  }

  return (
    <div className='file-handler-table-container' style={{ userSelect: "none" }}>
      {/* Add Column Button */}
      {medata?.user?.Role === "Owner" &&
        <div>
          <button onClick={addEditableColumn} className="file-handler-add-button">
            Add Column
          </button>
          <button onClick={handleDownload} className="file-handler-add-button">
            Download
          </button>
        </div>
      }

      {medata?.user?.Role === "Owner" &&
        <div className='assigned-admins-container'>
          Assigned to: {
            filterdAdmins?.map((item) => <div className='assigned-admin-name' key={item._id}>
              <p>{item.Name}</p>
              <button onClick={() => {
                dispatch(removeExcelFromAdminAction(item._id, id));
                setFilterAdmin((prev) => {
                  const newAdmins = prev.filter((admin) => {
                    return admin._id !== item._id
                  })
                  return newAdmins
                })
              }}>X</button>
            </div>)
          }
        </div>
      }

      <button onClick={saveChanges} className="file-handler-save-button">
        Save Changes
      </button>
      
      {data?.length > 0 && (
        <div className="file-handler-buttons-container">
          {/* Save Headers Button (New) */}
          {medata?.user?.Role === "Owner" && hasHeaderChanges && (
            <button onClick={saveHeaderChanges} className="file-handler-save-headers-button">
              Save Column Headers
            </button>
          )}
        </div>
      )}
      
      {/* Data Table */}
      {!isHidden && data?.length > 0 && (
        <div className='owner-excel-table-container'>
          <table className="file-handler-table">
            {medata?.user?.Role === "Owner" ?
              <thead>
                <tr>
                  <th className="file-handler-table-header">Sno.</th>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={`file-handler-table-header ${col.editable ? "editable-header" : ""} ${col.name !== originalColumns[index]?.name ? "modified-header" : ""}`}
                      onClick={() => handleHeaderClick(index)}
                    >
                      {editingHeader === index ? (
                        <input
                        className={`file-handle-table-input`}
                          type="text"
                          value={col.name}
                          onChange={(e) => handleHeaderChange(index, e.target.value)}
                          onBlur={() => finishEditingHeader()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              finishEditingHeader();
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <>
                          {col.name}
                          {col.editable && medata?.user?.Role === "Owner" && (
                            <span className="header-edit-icon"> ✎</span>
                          )}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead> : 
              <thead>
                <tr>
                  <th className="file-handler-table-header">Sno.</th>
                  {columns.map((col, index) => (
                    <th key={index} className="file-handler-table-header">
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
            }
            <tbody className='tbody'>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="file-handler-table-data">{rowIndex + 1}</td>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="file-handler-table-data">
                      {col.editable ? (
                        <input
                          type="text"
                          value={row[col.name] || ""}
                          onChange={(e) =>
                            handleCellChange(rowIndex, col.name, e.target.value)
                          }
                        />
                      ) : (
                        row[col.name]
                      )}
                      
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OwnerAgentExcel





// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeExcelFromAdminAction } from '../../Action/postAction';
// import axios from 'axios';
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import "./OwnerAgentExcelData.css";
// import { useNavigate, useParams } from 'react-router-dom';
// import { FixedSizeList as List } from 'react-window';

// const OwnerAgentExcel = () => {
//   // State variables
//   const [fileId, setFileId] = useState(null);
//   const [data, setData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [originalColumns, setOriginalColumns] = useState([]);
//   const [isHidden, setIsHidden] = useState(false);
//   const [assignedAdmins, setAssignedAdmins] = useState([]);
//   const [allAdmins, setAllAdmins] = useState([]);
//   const [filteredAdmins, setFilteredAdmins] = useState([]);
//   const [editingHeader, setEditingHeader] = useState(null);
//   const [hasHeaderChanges, setHasHeaderChanges] = useState(false);
//   const [fileName, setFileName] = useState("exported_data");
//   const [loading, setLoading] = useState(false);
//   const [changedCells, setChangedCells] = useState({});
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { medata } = useSelector((state) => state.meDetails);
//   const { id } = useParams();

//   // Security measures for screenshots and browser tools
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (
//         event.key === "F12" || 
//         (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") || 
//         (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") || 
//         (event.ctrlKey && event.key.toLowerCase() === "u") ||
//         (event.shiftKey && event.metaKey)
//       ) {
//         event.preventDefault();
//         setIsHidden(true);
//         setTimeout(() => {
//           setIsHidden(false);
//         }, 2000);
//       }

//       if (event.ctrlKey && event.key.toLowerCase() === "p") {
//         event.preventDefault();
//         setIsHidden(true);
//         setTimeout(() => {
//           setIsHidden(false);
//         }, 2000);
//       }

//       if (event.shiftKey && event.metaKey && event.key.toLowerCase() === "s") {
//         event.preventDefault();
//         setIsHidden(true);
//         setTimeout(() => {
//           setIsHidden(false);
//         }, 2000);
//       }
//     };

//     const handlePrintScreen = (event) => {
//       if (event.key === "PrintScreen") {
//         event.preventDefault();
//         setIsHidden(true);
//         setTimeout(() => {
//           setIsHidden(false);
//         }, 2000);
//       }
//     };

//     const handleRightClick = (event) => {
//       event.preventDefault();
//       alert("Right-click is disabled!");
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("keyup", handlePrintScreen);
//     document.addEventListener("contextmenu", handleRightClick);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.removeEventListener("keyup", handlePrintScreen);
//       document.removeEventListener("contextmenu", handleRightClick);
//     };
//   }, []);

//   // Fetch admin data
//   async function getAllAdminsAgents(keyword) {
//     try {
//       let url;
//       if (keyword) {
//         url = `${process.env.REACT_APP_API_URL}/admin-owner/admin-data?${
//           Object.keys(keyword)[0]
//         }=${keyword[Object.keys(keyword)[0]]}`;
//       } else {
//         url = `/admin-owner/admin-data`;
//       }

//       const config = {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       };

//       const { data } = await axios.get(url, config);

//       setAllAdmins((prev) => {
//         return [...prev, ...data.Admin];
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // Fetch file data with optimized loading
//   const fetchSingleFileData = async (id) => {
//     try {
//       setLoading(true);
//       const endpoint = medata?.user?.Role === "Owner"
//         ? `${process.env.REACT_APP_API_URL}/excel/owner/file/${id}`
//         : `${process.env.REACT_APP_API_URL}/excel/file/${id}`;
      
//       const res = await axios.get(endpoint, { withCredentials: true });
      
//       setAssignedAdmins(res.data.admins || []);
      
//       // Process the data in small batches to prevent UI freezing
//       const processDataInBatches = () => {
//         // Create columns first
//         setColumns(res.data.fileData.columns);
//         setOriginalColumns([...res.data.fileData.columns]);
        
//         // Process rows in batches
//         const batchSize = 500;
//         const rows = res.data.fileData.rows;
//         const totalRows = rows.length;
        
//         // Create a function to process data in chunks
//         const processChunk = (startIndex) => {
//           return new Promise(resolve => {
//             setTimeout(() => {
//               const endIndex = Math.min(startIndex + batchSize, totalRows);
              
//               setData(prevData => {
//                 const newData = [...prevData];
//                 for (let i = startIndex; i < endIndex; i++) {
//                   newData[i] = rows[i];
//                 }
//                 return newData;
//               });
              
//               if (endIndex < totalRows) {
//                 processChunk(endIndex).then(resolve);
//               } else {
//                 resolve();
//               }
//             }, 0);
//           });
//         };
        
//         // Start processing from index 0
//         return processChunk(0).then(() => {
//           // Make a deep copy for comparison after all chunks are processed
//           setOriginalData(JSON.parse(JSON.stringify(rows)));
//           setFileId(id);
//           setHasHeaderChanges(false);
//           setLoading(false);
//         });
//       };
      
//       processDataInBatches();
//     } catch (err) {
//       setLoading(false);
//       console.error("Error fetching file data:", err);
//       if (medata?.user?.Role !== "Owner") {
//         navigate("/admin/dashboard");
//       }
//     }
//   };

//   useEffect(() => {
//     setAllAdmins([]);
//     getAllAdminsAgents({ AgentVerify: true });
//     getAllAdminsAgents({ AdminVerify: true });
    
//     if (id) {
//       fetchSingleFileData(id);
//     }
//   }, [id]);

//   useEffect(() => {
//     const agentIdsSet = new Set(assignedAdmins.map(agent => agent.AdminId._id));
//     const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));
//     setFilteredAdmins(matchingAdmins);
//   }, [allAdmins, assignedAdmins]);

//   // Handle cell changes more efficiently by only tracking what changed
//   const handleCellChange = (rowIndex, columnName, value) => {
//     // Track changes in changedCells
//     setChangedCells(prev => ({
//       ...prev,
//       [`${rowIndex}-${columnName}`]: { rowIndex, columnName, newValue: value }
//     }));
    
//     // Update visible data
//     setData(prevData => {
//       const updatedData = [...prevData];
//       updatedData[rowIndex][columnName] = value;
//       return updatedData;
//     });
//   };

//   // Handle header click for editing
//   const handleHeaderClick = (colIndex) => {
//     if (columns[colIndex].editable && medata?.user?.Role === "Owner") {
//       setEditingHeader(colIndex);
//     }
//   };

//   // Handle header name change
//   const handleHeaderChange = (colIndex, newName) => {
//     if (!columns[colIndex].editable) return;
    
//     setColumns(prevColumns => {
//       const updatedColumns = [...prevColumns];
//       updatedColumns[colIndex] = { ...updatedColumns[colIndex], name: newName };
//       return updatedColumns;
//     });
    
//     setHasHeaderChanges(true);
//   };

//   // Finish editing header
//   const finishEditingHeader = () => {
//     setEditingHeader(null);
//   };

//   // Save header changes
//   const saveHeaderChanges = async () => {
//     if (!fileId) return alert("Please select a file first!");

//     const changes = columns.map((col, index) => {
//       if (col.name !== originalColumns[index].name && col.editable) {
//         return {
//           oldColumnName: originalColumns[index].name,
//           newColumnName: col.name
//         };
//       }
//       return null;
//     }).filter(change => change !== null);

//     if (changes.length === 0) {
//       alert("No header changes to save.");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Save each header change
//       for (const change of changes) {
//         await axios.put(
//           `${process.env.REACT_APP_API_URL}/excel/file/${fileId}/rename-column`, 
//           change, 
//           { withCredentials: true }
//         );
//       }

//       alert(`${changes.length} column headers updated successfully!`);
      
//       // Refresh data
//       fetchSingleFileData(fileId);
//     } catch (err) {
//       setLoading(false);
//       console.error("Error saving header changes:", err);
//       alert("Error saving header changes: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Add new editable column
//   const addEditableColumn = async () => {
//     if (!fileId) return alert("Please select a file first!");

//     const columnName = prompt("Enter new column name:");
//     if (!columnName) return alert("Column name cannot be empty!");

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/excel/file/${fileId}/add-column`,
//         { columnName },
//         { withCredentials: true }
//       );
      
//       // Refresh data
//       fetchSingleFileData(fileId);
//     } catch (err) {
//       setLoading(false);
//       console.error("Error adding column:", err);
//       alert("Error adding column: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Save changes with optimized approach
//   const saveChanges = async () => {
//     if (!fileId) return alert("Please select a file first!");

//     try {
//       const updates = Object.values(changedCells);
      
//       if (updates.length === 0) {
//         alert("No changes detected.");
//         return;
//       }

//       setLoading(true);
      
//       // Process updates in batches to avoid timeouts
//       const batchSize = 200;
//       let successCount = 0;
      
//       for (let i = 0; i < updates.length; i += batchSize) {
//         const batch = updates.slice(i, i + batchSize);
        
//         await axios.put(
//           `${process.env.REACT_APP_API_URL}/excel/file/${fileId}/update`,
//           { updates: batch },
//           { withCredentials: true }
//         );
        
//         successCount += batch.length;
        
//         // Update progress
//         if (i + batchSize < updates.length) {
//           // Optional: Update a progress indicator here
//         }
//       }
      
//       // Clear changed cells after saving
//       setChangedCells({});
      
//       // Update originalData to match current data
//       setOriginalData(JSON.parse(JSON.stringify(data)));
      
//       setLoading(false);
//       alert(`${successCount} changes saved successfully!`);
//     } catch (err) {
//       setLoading(false);
//       console.error("Error saving changes:", err);
//       alert("Error saving changes: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // Download file
//   const handleDownload = () => {
//     if (columns.length === 0 || data.length === 0) {
//       alert("No data available to download.");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Extract column names
//       const columnNames = columns.map(col => col.name);

//       // Convert object-based rows into array-based rows in batches
//       const workbook = XLSX.utils.book_new();
//       let worksheet;
      
//       // Process data in chunks for large datasets
//       const batchSize = 1000;
//       const totalRows = data.length;
      
//       // First create the worksheet with headers
//       worksheet = XLSX.utils.aoa_to_sheet([columnNames]);
      
//       // Then add data in batches
//       for (let i = 0; i < totalRows; i += batchSize) {
//         const endIdx = Math.min(i + batchSize, totalRows);
//         const rowBatch = [];
        
//         // Process each row in this batch
//         for (let j = i; j < endIdx; j++) {
//           rowBatch.push(columnNames.map(col => data[j][col] || ""));
//         }
        
//         // Append batch to worksheet
//         XLSX.utils.sheet_add_aoa(worksheet, rowBatch, { origin: { r: i + 1, c: 0 } });
//       }
      
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//       // Generate Excel file and trigger download
//       const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//       const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//       saveAs(blob, `${fileName}.xlsx`);
      
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error("Error downloading file:", error);
//       alert("Error generating Excel file: " + error.message);
//     }
//   };

//   // Row renderer for virtualized list
//   const Row = ({ index, style }) => {
//     const rowData = data[index];
//     if (!rowData) return null;
    
//     return (
//       <div className="virtualized-row" style={style}>
//         <div className="cell sno-cell">{index + 1}</div>
//         {columns.map((col, colIndex) => (
//           <div className="cell data-cell" key={colIndex}>
//             {col.editable ? (
//               <input
//                 type="text"
//                 className="cell-input"
//                 value={rowData[col.name] || ""}
//                 onChange={(e) => handleCellChange(index, col.name, e.target.value)}
//               />
//             ) : (
//               rowData[col.name] || ""
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Get table height for virtualized list
//   const tableHeight = Math.min(window.innerHeight * 0.7, 600);

//   return (
//     <div className='file-handler-table-container' style={{ userSelect: "none" }}>
//       {/* Action buttons */}
//       {medata?.user?.Role === "Owner" && (
//         <div className="file-handler-actions">
//           <button 
//             onClick={addEditableColumn} 
//             className="file-handler-add-button"
//             disabled={loading}
//           >
//             Add Column
//           </button>
//           <button 
//             onClick={handleDownload} 
//             className="file-handler-add-button"
//             disabled={loading}
//           >
//             Download
//           </button>
//           <input
//             type="text"
//             placeholder="File name for download"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//             className="file-name-input"
//           />
//         </div>
//       )}

//       {/* Assigned admins section */}
//       {medata?.user?.Role === "Owner" && (
//         <div className='assigned-admins-container'>
//           Assigned to: {
//             filteredAdmins?.map((item) => (
//               <div className='assigned-admin-name' key={item._id}>
//                 <p>{item.Name}</p>
//                 <button 
//                   onClick={() => {
//                     dispatch(removeExcelFromAdminAction(item._id, id));
//                     setFilteredAdmins((prev) => {
//                       return prev.filter((admin) => admin._id !== item._id);
//                     });
//                   }}
//                   disabled={loading}
//                 >
//                   X
//                 </button>
//               </div>
//             ))
//           }
//         </div>
//       )}

//       {/* Save buttons */}
//       <div className="file-handler-buttons-container">
//         <button 
//           onClick={saveChanges} 
//           className="file-handler-save-button"
//           disabled={Object.keys(changedCells).length === 0 || loading}
//         >
//           Save Changes {Object.keys(changedCells).length > 0 && `(${Object.keys(changedCells).length})`}
//         </button>
        
//         {medata?.user?.Role === "Owner" && hasHeaderChanges && (
//           <button 
//             onClick={saveHeaderChanges} 
//             className="file-handler-save-headers-button"
//             disabled={loading}
//           >
//             Save Column Headers
//           </button>
//         )}
//       </div>
      
//       {/* Loading indicator */}
//       {loading && (
//         <div className="loading-indicator">
//           Loading data... {data.length > 0 && `(${data.length} rows loaded)`}
//         </div>
//       )}
      
//       {/* Data Table with virtualization */}
//       {!isHidden && columns.length > 0 && (
//         <div className='owner-excel-table-container'>
//           {/* Header row */}
//           <div className="virtualized-table-header">
//             <div className="header-cell sno-header">Sno.</div>
//             {columns.map((col, index) => (
//               <div
//                 key={index}
//                 className={`header-cell ${col.editable ? "editable-header" : ""} ${
//                   col.name !== originalColumns[index]?.name ? "modified-header" : ""
//                 }`}
//                 onClick={() => handleHeaderClick(index)}
//               >
//                 {editingHeader === index ? (
//                   <input
//                     className="header-input"
//                     type="text"
//                     value={col.name}
//                     onChange={(e) => handleHeaderChange(index, e.target.value)}
//                     onBlur={finishEditingHeader}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {
//                         finishEditingHeader();
//                       }
//                     }}
//                     autoFocus
//                   />
//                 ) : (
//                   <>
//                     {col.name}
//                     {col.editable && medata?.user?.Role === "Owner" && (
//                       <span className="header-edit-icon"> ✎</span>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {/* Virtualized rows */}
//           <List
//             height={tableHeight}
//             itemCount={data.length}
//             itemSize={60}
//             width="100%"
//             className="virtualized-table-body"
//             overscanCount={20} // Render more rows outside viewport for smoother scrolling
//           >
//             {Row}
//           </List>
//         </div>
//       )}
      
//       {/* Row count display */}
//       {data.length > 0 && (
//         <div className="row-count">
//           Total rows: {data.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerAgentExcel;