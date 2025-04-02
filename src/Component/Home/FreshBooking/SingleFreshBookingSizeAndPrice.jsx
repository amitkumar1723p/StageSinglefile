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
      {/* <div className="bg-white d-flex justify-content-center align-items-center min-vh-80">
        <div className="container">
          <h3 className="mb-3 mt-3   Single-fresh-Size-Price">How Much</h3>
          <h3 className=" fw-bold  mb-5 Single-fresh-Size-Price-heading " style={{color: '#1D3557'}}>{project?.projectName} Size And Price</h3>
          <div className="Single-fresh-unit-main">
            Unit Type Column

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557' , borderRadius: '32px 32px 0px 0px' }}>UNIT TYPE</div>
              {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.type} 
              </div>
            ))}
            </div>

            Unit Size Column

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{backgroundColor: '#1D3557' , borderRadius: '32px 32px 0px 0px' }}>UNIT SIZE</div>
              {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.size} 
              </div>
            ))}
            </div>

            Unit Price Column

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
            <div className="text-white py-1 Single-fresh-unit" style={{ backgroundColor: '#1D3557', borderRadius: '32px 32px 0px 0px' }}>
              UNIT PRICE
            </div>
            {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.price} <sup>*</sup>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div> */}
 <div className="container mt-4">
      <table className="table table-bordered text-center">
        <thead className="thead-dark bg-primary">
          <tr>
            <th className='single-fresh-booking-unit'>Unit Type</th>
            <th>Unit Size</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="spacing-row">
            <td>3 BHK + S</td>
            <td>2950 SQ.FT</td>
            <td>Call for Price</td>
          </tr>
          <tr className="spacing-row">
            <td>3 BHK + S</td>
            <td>3150 SQ.FT</td>
            <td>Call for Price</td>
          </tr>
          <tr className="spacing-row">
            <td>4 BHK + S</td>
            <td>3850 SQ.FT</td>
            <td>Call for Price</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    </>
    
  );
}