import React from 'react';
import './SingleFreshBooking.css';
export default function SingleFreshBookingSizeAndPrice({projectPrice ,  project}) {

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
      <div className="bg-white d-flex justify-content-center align-items-center min-vh-80">
        <div className="container">
          <h3 className="mb-3 mt-3   Single-fresh-Size-Price">How Much</h3>
          <h3 className=" fw-bold  mb-5 Single-fresh-Size-Price-heading " style={{color: '#1D3557'}}>{project?.projectName} Size And Price</h3>
          {/* <div className="Single-fresh-unit-main">


            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557'  }}>UNIT TYPE</div>
              {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.type} 
              </div>
            ))}
            </div>



            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557' }}>UNIT SIZE</div>
              {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.size} 
              </div>
            ))}
            </div>

 

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
            <div className="text-white py-1 Single-fresh-unit" style={{ backgroundColor: '#1D3557'}}>
              UNIT PRICE
            </div>
            {projectPrice?.map((projectPrice, index) => (
              <div key={index} className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">
                {projectPrice?.price} <sup>*</sup>
              </div>
            ))}
          </div>
          </div> */}
          {/* <div className="container mt-4">
      <table className="table table-bordered text-center">
        <thead className="thead-dark bg-primary">
          <tr>
            <th className='single-fresh-booking-unit'>UNIT TYPE</th>
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
    </div> */}

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