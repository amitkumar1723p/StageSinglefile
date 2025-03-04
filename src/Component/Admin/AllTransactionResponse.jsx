import React from 'react';
import { useSelector } from 'react-redux';

export default function AllTransactionResponse() {
  // paid user transaction detail 
  const { data: getTransactionDetail } = useSelector((state) => {
    return state.getTransactionDetail;
  });

  return (
    <div>
      <table class="table">
        <thead>
          <tr className='border'>
            <th scope="col" className="text-primary col-1 border-end">Name</th>
            <th scope="col" className="text-primary col-1 border-end">Contact</th>
            <th scope="col" className="text-primary col-1 border-end">Email</th>
            <th scope="col" className="text-primary col-1 border-end">Post Id</th>
            <th scope="col" className="text-primary col-1 border-end">Pay Id</th>
            <th scope="col" className="text-primary col-1 border-end">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(getTransactionDetail?.data) &&
            getTransactionDetail?.data?.map((item, index) => (
              <tr key={index} className='border-start'>

                <td className="text-light-emphasis border-end"><small>{item?.userId?.Name}</small></td>
                <td className="text-light-emphasis border-end"><small>{item?.userId?.ContactNumber}</small></td>
                <td className="text-light-emphasis border-end"><small>{item?.userId?.email}</small></td>
                <td className="text-light-emphasis border-end"><small>{item?.PostId}</small></td>
                <td className="text-light-emphasis border-end"><small>{item?.razorpayPaymentId}</small></td>
                <td className="text-light-emphasis border-end">
                  <small>
                    {item?.createdAt
                      ? new Date(item?.createdAt).toLocaleDateString("en-GB") +
                      " , " +
                      new Date(item?.createdAt)
                        .toLocaleTimeString("en-GB", { hour12: false })
                        .slice(0, 5)
                      : "..."}
                  </small>
                </td>

                {/* Replace with correct field name */}

              </tr>
            ))
          }


        </tbody>
      </table>
    </div>
  )
}


