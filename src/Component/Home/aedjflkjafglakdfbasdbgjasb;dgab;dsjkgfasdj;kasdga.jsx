import React from 'react'

import { useParams,useLocation } from 'react-router-dom';
export default function SingleFreshBooking() {

  const { id } = useParams();
    


  return (
    <div>
      <h2>{id}</h2>
    </div>
  )
}
