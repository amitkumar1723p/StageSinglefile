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



import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerUploadExcelFile, removeExcelFromAdminAction } from '../../Action/postAction';
import axios from 'axios';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"
import "./OwnerAgentExcelData.css"
import { useNavigate, useParams } from 'react-router-dom';
const OwnerAgentExcel = () => {

    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [originalColumns, setOriginalColumns] = useState([]); // To track original column names
    const [isHidden, setIsHidden] = useState(false);
    const [AssinedAdmins, setAssignedAdmins] = useState([]);
    const [allAdmins,setAllAdmins]=useState([]);
    const [filterdAdmins,setFilterAdmin]= useState([]);
    const [editingHeader, setEditingHeader] = useState(null);
    const [hasHeaderChanges, setHasHeaderChanges] = useState(false); // Flag for header changes
    const [fileName, setFileName] = useState("exported_data");
  const navigate =useNavigate();
    const dispatch= useDispatch();
    const { medata } = useSelector((state) => {
        return state.meDetails;
      });
    const {id}=useParams("id")

    // const fetchedAllFiles =useSelector((store)=>store.OwnerAllExcelFiles.data)
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


     async function getAllAdminsAgents(Keyword){
     try {
        let url;
        if (Keyword) {
          url = `${process.env.REACT_APP_API_URL}/admin-owner/admin-data?${
            Object.keys(Keyword)[0]
          }=${Keyword[Object.keys(Keyword)[0]]}`;
        } else {
          url = `/admin-owner/admin-data`;
        }
        // if(ke)
  
        const config = {
          headers: { "Content-Type": "application/json" },
  
          withCredentials: true,
        };
  
        const { data } = await axios.get(url, config);
        


        setAllAdmins((prev)=>{
            return [...prev,...data.Admin]
        })
        
     } catch (error) {
        console.log(error)
     }


      }


      const fetchSingleFileDataOwner = async (id) => {
        try {
          const res = await axios.get(`http://localhost:5000/excel/owner/file/${id}`,{withCredentials:true});
          setAssignedAdmins(res.data.admins);
          setColumns(res.data.fileData.columns);
          setOriginalColumns([...res.data.fileData.columns]); // Store original column names
          setData(res.data.fileData.rows);
          setFileId(id);
          setHasHeaderChanges(false);
        } catch (err) {
          // navigate("/admin/dashboard")
          console.error("Error fetching file data:", err);
        }
      };
    


      useEffect(()=>{
        if(medata.user.Role ==="Owner"){

          fetchSingleFileDataOwner(id)
        }else{
          fetchSingleFileData(id);

        }
        setAllAdmins([])
        getAllAdminsAgents({ AgentVerify: true })
        getAllAdminsAgents({ AdminVerify: true })
        // console.log(object)
      },[id])




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
          await axios.put(`http://localhost:5000/excel/file/${fileId}/rename-column`, change, {
            withCredentials: true
          });
        }
        
        alert(`${changes.length} column headers updated successfully!`);
        
        // Refresh data to update original columns
        fetchSingleFileData(fileId);
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
          const res = await axios.post(`http://localhost:5000/excel/file/${fileId}/add-column`, {
            columnName,
          },
        {
            withCredentials:true
        });
          setColumns(res.data.file.columns);
          setOriginalColumns(res.data.file.columns);
          setData(res.data.file.rows);
        } catch (err) {
          console.error("Error adding column:", err);
        }
      };

      useEffect(()=>{
        const agentIdsSet = new Set(AssinedAdmins.map(agent => agent.AdminId._id));

        // console.log("seeting agent  ",agentIdsSet)
        // Find common AdminIds
        const matchingAdmins = allAdmins.filter(admin => agentIdsSet.has(admin._id));
        // console.log("thi sis matchinggg ",matchingAdmins)
        setFilterAdmin(matchingAdmins)
      },[allAdmins,AssinedAdmins])
    
      // Save row changes (original functionality preserved)
      const saveChanges = async () => {
        if (!fileId) return alert("Please select a file first!");
    
        try {
          await axios.put(`http://localhost:5000/excel/file/${fileId}/update`, {
            updates: data.map((row, index) =>
              columns
                .filter((col) => col.editable)
                .map((col) => ({
                  rowIndex: index,
                  columnName: col.name,
                  newValue: row[col.name],
                }))
            ).flat(),
          },{
            withCredentials:true
          });
          alert("Cell data changes saved successfully!");
        } catch (err) {
          console.error("Error saving changes:", err);
          alert("Error saving cell changes: " + (err.response?.data?.message || err.message));
        }
      };
  
      // Fetch single file data
    const fetchSingleFileData = async (id) => {
        try {
          const res = await axios.get(`http://localhost:5000/excel/file/${id}`,{withCredentials:true});
          setAssignedAdmins(res.data.admins);
          setColumns(res.data.fileData.columns);
          setOriginalColumns([...res.data.fileData.columns]); // Store original column names
          setData(res.data.fileData.rows);
          setFileId(id);
          setHasHeaderChanges(false);
        } catch (err) {
          navigate("/admin/dashboard")
          console.error("Error fetching file data:", err);
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
    
    <div className='file-handler-table-container'>

           {/* Add Column Button */}
          {medata?.user?.Role === "Owner"&&
            <div>
                 <button onClick={addEditableColumn} className="file-handler-add-button">
             Add Column
           </button>
           <button onClick={handleDownload} className="file-handler-add-button">
             Download
           </button>


            </div>
          }
        
 
          {medata?.user?.Role === "Owner"&&
            <div className='assigned-admins-container'>
                Assigned to: {
                    filterdAdmins?.map((item)=><div className='assigned-admin-name' key={item._id}>
                        <p>{ item.Name}</p>
                        <button onClick={()=>{
                            dispatch(removeExcelFromAdminAction(item._id,id));
                                setFilterAdmin((prev)=>{

                                    const newAdmins = prev.filter((admin)=>{
                                          return  admin._id!==item._id
                                    })

                                    return newAdmins
                                })
                        }}>*</button>
                    </div>)
                }
            </div>
          }
               {/* Data Table */}
               {!isHidden && data?.length > 0 && (
            <table className="file-handler-table">
              
              
              {medata?.user?.Role === "Owner"  ?
                <thead>
                <tr>
                  <th className="file-handler-table-header">Sno.</th>
                  {columns.map((col, index) => (
                    <th 
                      key={index} 
                      className={`file-handler-table-header ${col.editable ? "editable-header" : ""} ${
                        col.name !== originalColumns[index]?.name ? "modified-header" : ""
                      }`}
                      onClick={() => handleHeaderClick(index)}
                    >
                      {editingHeader === index ? (
                        <input 
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
              </thead> :   <thead>
                 <tr>
                   <th className="file-handler-table-header">Sno.</th>
                   {columns.map((col, index) => (
                    <th key={index} className="file-handler-table-header">
                      {col.name} 
                    </th>
                  ))}
                </tr>
              </thead>}
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="file-handler-table-data">{rowIndex + 1}</td>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="file-handler-table-data">
                        {col.editable ? (
                          <input
                            type="text"
                            value={row[col.name]}
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
          )}
   
          {/* Save Buttons Container */}
          {data?.length > 0 && (
            <div className="file-handler-buttons-container">
              {/* Save Row Data Button (Original) */}
              <button onClick={saveChanges} className="file-handler-save-button">
                Save Cell Changes
              </button>
              
              {/* Save Headers Button (New) */}
              {medata?.user?.Role === "Owner" && hasHeaderChanges && (
                <button onClick={saveHeaderChanges} className="file-handler-save-headers-button">
                  Save Column Headers
                </button>
              )}
            </div>
          )}
    
    </div>
  )
}

export default OwnerAgentExcel