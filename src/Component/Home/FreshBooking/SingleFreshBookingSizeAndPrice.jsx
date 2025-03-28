import React from 'react';
import './SingleFreshBooking.css';
export default function SingleFreshBookingSizeAndPrice() {

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
      <div className="bg-white d-flex justify-content-center align-items-center min-vh-100">
        <div className="container">
          <h3 className="mb-3 mt-3   Single-fresh-Size-Price">How Much</h3>
          <h3 className=" fw-bold  mb-5 Single-fresh-Size-Price-heading " style={{color: '#1D3557'}}>DLF Primus Size And Price</h3>
          <div className="Single-fresh-unit-main">
            {/* Unit Type Column */}

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557' , borderRadius: '32px 32px 0px 0px' }}>UNIT TYPE</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">3 BHK + S</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">3 BHK + S</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">3 BHK + S</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">3 BHK + S</div>
            </div>

            {/* Unit Size Column */}

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557' , borderRadius: '32px 32px 0px 0px' }}>UNIT SIZE</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">141 SQ.YD</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">158 SQ.YD</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">141 SQ.YD</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">158 SQ.YD</div>
            </div>

            {/* Unit Price Column */}

            <div className="col-12 col-md-4 text-center d-flex flex-column Single-Fresh-table">
              <div className=" text-white py-1 Single-fresh-unit" style={{  backgroundColor: '#1D3557' , borderRadius: '32px 32px 0px 0px' }}>UNIT PRICE</div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">2.5 Cr <sup>*</sup></div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">2.5 Cr <sup>*</sup></div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">2.5 Cr <sup>*</sup></div>
              <div className="py-3 flex-fill d-flex align-items-center justify-content-center fw-medium">2.5 Cr <sup>*</sup></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}