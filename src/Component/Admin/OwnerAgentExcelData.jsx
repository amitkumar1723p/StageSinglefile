import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOwnerFiles, OwnerAllExcelFile } from '../../Action/postAction';
import axios from 'axios';
import "./OwnerAgentExcelData.css"
import { useNavigate } from 'react-router-dom';
const OwnerAgentExcelData = () => {

    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [allFiles, setAllFiles] = useState([]);
    const dispatch= useDispatch();
    const navigate = useNavigate();
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
    
      const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };
      
      const uploadFile = async () => {
        if (!file) return alert("Please select a file!");
                dispatch(OwnerAllExcelFile(file))
      };
    //   Fetch all files on component mount
      useEffect(() => {
        if(!fetchedAllFiles){

            console.log("called")
            dispatch(fetchAllOwnerFiles())
        }
            
        
        setAllFiles(fetchedAllFiles)
      }, []);


    
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
    
          {/* File Cards */}
          {fetchedAllFiles?.length > 0 && (
            <div className="files-card-container">
              {fetchedAllFiles?.map((item) => (
                <div
                  key={item._id}
                  className="files-card"
                  onClick={() => navigate(`/admin/excel/${item._id}`)}
                >
                  <div className="file-icon">📊</div>
                  <div className="file-name">{item.fileName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default OwnerAgentExcelData
