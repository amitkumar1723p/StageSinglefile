import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateConatctRemarkAction, viewAllContactForm } from "../../Action/userAction";

export default function Contactus() {
  const dispatch = useDispatch()
  const [remark, setRemark] = useState()
  const { data: viewAllContactFormReducer, loading } = useSelector((state) => {
    return state.viewAllContactFormReducer;
  });
  useEffect(() => {
    dispatch(viewAllContactForm())
  }, [])

  useEffect(() => {

    if (remark) {
      dispatch(updateConatctRemarkAction(
        { VisitStatus: remark?.status },
        remark?.id
      ))
    }
  }, [remark])



  return (
    <>

      <div className="">
        <table className="table table-bordered border-primary table-hover">
          <thead className="">
            <tr>
              <th scope="col" className="table-primary">S.No</th>
              <th scope="col" className="table-primary">Name</th>
              <th scope="col" className="table-primary">Contact</th>
              <th scope="col" className="table-primary">Email</th>
              <th scope="col" className="table-primary">Message</th>
              <th scope="col" className="table-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {viewAllContactFormReducer?.data?.map((item, index) => (
              <tr key={item.id}>
                <th scope="row" className="fw-normal">{index + 1}</th>
                <td className="fw-light">{item.firstName}</td>

                <td className="fw-light">{item.phoneNumber}</td>
                <td className="fw-light">{item.email}</td>
                <td className="" style={{ fontSize: '12px' }}>{item.message}</td>

                <td>
                  <select onChange={(e) => setRemark({ status: e.target.value, id: item?._id })}>
                  <option  value={item?.remark?.status}>
                         {item?.remark?.status}
                        </option>
                    {['Pending', 'Completed']
                      .filter((status) => status !== item?.remark?.status)
                      .map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </>
  )
}