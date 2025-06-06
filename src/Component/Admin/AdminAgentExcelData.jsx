
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAdminFiles, fetchAllAgentFiles, fetchAllOwnerFiles } from '../../Action/postAction';
import { useNavigate } from 'react-router-dom';

const AdminAgentExcelData = () => {
  const dispatch = useDispatch();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  // if()

    const {data} = useSelector((store)=>store.OwnerAllExcelFiles)
    const navigate = useNavigate();
 const {data:AdminAllExcelFilesData} = useSelector((state) => {
  return state.AdminAllExcelFiles}
);
const {data:AgentAllExcelFilesData} = useSelector((state) => {
  return state.AdminAllExcelFiles}
);
    const fetchedAllFiles=data || AdminAllExcelFilesData?.assignedExcels ||AgentAllExcelFilesData?.assignedExcels
// console.log("this is fetche ",fetchedAllFiles)
  useEffect(() => {
    if (!fetchedAllFiles) {

      // console.log("called")
      dispatch(fetchAllAdminFiles())
      dispatch(fetchAllAgentFiles())
    }



  }, []);






  return (
    <div className=''>

      {fetchedAllFiles?.length > 0 && (
        <div className="files-card-container">
          {fetchedAllFiles?.map((item) => (

            <div className='excel-checkbox-container'>

              {
                // false && <input checked={selectedExcel===item._id} type="checkbox" className='' onChange={()=>setSelectedeExcel(item?._id)}/>
              }
              <div
                key={item._id}
                className="files-card"
                onClick={() => navigate(`/excel/${item?.ExcelId?._id}`)}
              >

                <div className="file-icon"><img loading="lazy" src="/img/excel_icon.svg" alt="excel_icon" /></div>
                <div className="file-name"><small>{item?.ExcelId?.name}  </small> </div>
              </div>
            </div>

          ))}
        </div>
      )}


      {!fetchedAllFiles && <div>No assigned excel found</div>}
    </div>
  )
}

export default AdminAgentExcelData
