import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getprojectLeadAllAction } from "../../../Action/freshProjectAction";

export function FreshProjectLead() {
    const dispatch = useDispatch()
    const { data: getAllFreshProjectLead } = useSelector((state) => {
        return state.getAllFreshProjectLead
    })
    useEffect(() => {
 
        dispatch(getprojectLeadAllAction())
    }, [])

    console.log(getAllFreshProjectLead, "jghn")
    return (
        <>
        <div>{getAllFreshProjectLead?.totalprojectLead}</div>
           <table className="table">
  <thead>
    <tr>
      <th scope="col">s.no</th>
      <th scope="col">Name</th>
      <th scope="col">Contact</th>
      <th scope="col">Date</th>
      <th scope="col">Projectname</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
    {getAllFreshProjectLead?.projectLead?.map((item,index)=>{
return(
    <tr>
    <th scope="row">{index}</th>
    <td>{item?.name}</td>
    <td>{item.contactNumber}</td>
    <td>{item.createdAt
    }</td>
     <td>{item?.projectId?.projectBasicDetail?.projectName
    }</td>
   </tr>
)
    })    }
   
  
   
  </tbody>
</table>

        </>
    )

}