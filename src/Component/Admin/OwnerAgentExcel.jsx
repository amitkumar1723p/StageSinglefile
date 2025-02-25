import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerAllExcelFile } from '../../Action/postAction';
import axios from 'axios';
import "./OwnerAgentExcelData.css"
import { useParams } from 'react-router-dom';
const OwnerAgentExcel = () => {

    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [allFiles, setAllFiles] = useState([]);
    const dispatch= useDispatch();

    const {id}=useParams("id")

    const fetchedAllFiles =useSelector((store)=>store.OwnerAllExcelFiles.data)
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

      useEffect(()=>{
        fetchSingleFileData(id)
      },[id])




    const handleCellChange = (rowIndex, columnName, value) => {
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[rowIndex][columnName] = value;
          return updatedData;
        });
      };


          // Add new editable column
    const addEditableColumn = async () => {
        if (!fileId) return alert("Please select a file first!");
        
        const columnName = prompt("Enter new column name:");
        if (!columnName) return alert("Column name cannot be empty!");
    
        try {
          const res = await axios.post(`http://localhost:5000/excel/file/${fileId}/add-column`, {
            columnName,
          });
    
          setColumns(res.data.file.columns);
          setData(res.data.file.rows);
        } catch (err) {
          console.error("Error adding column:", err);
        }
      };
    
      // Save changes
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
          });
          alert("Changes saved successfully!");
        } catch (err) {
          console.error("Error saving changes:", err);
        }
      };
  
      // Fetch single file data
    const fetchSingleFileData = async (id) => {
        try {
          const res = await axios.get(`http://localhost:5000/excel/file/${id}`);
          setColumns(res.data.columns);
          setData(res.data.rows);
          setFileId(id);
        } catch (err) {
          console.error("Error fetching file data:", err);
        }
      };
    
    
  return (
    
    <div className='file-handler-table-container'>

           {/* Add Column Button */}
           <button onClick={addEditableColumn} className="file-handler-add-button">
            Add Column
          </button>
               {/* Data Table */}
               {!isHidden && data?.length > 0 && (
            <table className="file-handler-table">
              <thead>
                <tr>
                  <th className="file-handler-table-header">Sno.</th>
                  {columns.map((col, index) => (
                    <th key={index} className="file-handler-table-header">
                      {col.name} {col.editable ? "(Editable)" : ""}
                    </th>
                  ))}
                </tr>
              </thead>
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
    
          {/* Save Button */}
          {data?.length > 0 && (
            <button onClick={saveChanges} className="file-handler-save-button">
              Save Changes
            </button>
          )}
    
    </div>
  )
}

export default OwnerAgentExcel
