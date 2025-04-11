import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getprojectLeadAllAction, updateProjectLeadAction } from "../../../Action/freshProjectAction";

export function FreshProjectLead() {
  const dispatch = useDispatch()
  const [tarckNewLead, setTrackNewLead] = useState(0)
  const [remark,setRemark]=useState()
  const { data: getAllFreshProjectLead } = useSelector((state) => {
    return state.getAllFreshProjectLead
  })
  useEffect(() => {
    dispatch(getprojectLeadAllAction())
  }, [])
  // remark updated
  useEffect(()=>{
    const id=getAllFreshProjectLead?.projectLead[remark?.id]?._id
  
dispatch(updateProjectLeadAction(id,remark?.remark))
  },[remark])

  // store value inside the localStorage
  useEffect(() => {
    if (getAllFreshProjectLead) {
      const newLength = getAllFreshProjectLead?.projectLead?.length;
      const oldLength = parseInt(localStorage.getItem("newLength")) || 0;

      if (newLength > oldLength) {
        const newLeads = newLength - oldLength;
        setTrackNewLead(newLeads);


        localStorage.setItem('newLength', newLength.toString());
      }
    }
  }, [getAllFreshProjectLead]);

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
            <th scope="col">Remark</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {getAllFreshProjectLead?.projectLead?.map((item, index) => {

            return (
              <tr>
                <th scope="row">{index}</th>
                <td>{item?.name} {tarckNewLead - (index + 1) >= 0 && <sup className="text-success">new</sup>}</td>
                <td>{item.contactNumber}</td>
                <td>{item.createdAt
                }</td>
                <td>{item?.projectId?.projectBasicDetail?.projectName
                }</td>
                <td>
                <select
  className="px-2"
  value={remark}
  onChange={(e) => setRemark({ remark: e.target.value, id:index })}
>
  <option value={item?.remark}>{item?.remark}</option>
  <option value="deal">deal</option>
</select>

                </td>
              </tr>
            )
          })}



        </tbody>
      </table>

    </>
  )

}