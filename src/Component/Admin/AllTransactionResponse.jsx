import React from 'react';
import { useSelector } from 'react-redux';

export default function AllTransactionResponse (){
  // paid user transaction detail 
  const { data:getTransactionDetail} = useSelector((state) => {
    return state.getTransactionDetail;
  });

  return (
    <div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  {Array.isArray(getTransactionDetail?.data) &&
            getTransactionDetail?.data?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.PostId}</td>
                <td>{item.Name}</td> {/* Replace with correct field name */}
                <td>{item.Handle}</td> {/* Replace with correct field name */}
              </tr>
            ))
          }
   
  
  </tbody>
</table>
    </div>
  )
}


