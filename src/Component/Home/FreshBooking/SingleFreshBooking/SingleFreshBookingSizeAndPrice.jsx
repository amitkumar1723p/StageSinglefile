import React from 'react';
import './SingleFreshBooking.css';
export default function SingleFreshBookingSizeAndPrice({projectPrice ,  project}) {
  const styles = `
  .custom-thead {
    background-color: blue !important;
    color: white;
  }
  .spacing-row td {
    padding: 15px !important;
  }
  table {
    border-spacing: 0 10px;
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #dee2e6;
  }
`;
  const handleRippleEffect = (e) => {
    const button = e.currentTarget;
    if (button.querySelector('.ripple')) return; // Prevent multiple ripples

    const ripple = document.createElement('span');
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const rect = button.getBoundingClientRect();
    
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };




  return (
    <>
      <div className="single-fresh-booking-chart-container bg-white d-flex py-3 justify-content-center align-items-center min-vh-80">
        <div className="container ">
          <h3 className="mb-1 mt-3   Single-fresh-Size-Price">How Much</h3>
          <h3 className=" fw-bold  mb-2 Single-fresh-Size-Price-heading " style={{color: '#1D3557'}}>{project?.projectName} Size And Price</h3>
         
<table className="single-freshbooking-price-custom-table">
  <thead>
    <tr>
      <th>UNIT TYPE</th>
      <th>UNIT SIZE</th>
      <th>UNIT PRICE</th>
    </tr>
  </thead>
  <tbody>
    {projectPrice?.map((item, index) => (
      <tr key={index}>
        <td>{item?.type}</td>
        <td>{item?.size}</td>
        <td>{item?.price} </td>
      </tr>
    ))}
  </tbody>
</table>


        </div>
      </div> 

    </>
    
  );
}