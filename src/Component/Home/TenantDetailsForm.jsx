import React, { useState } from 'react';
import './TenantDetailsForm.css';

const TenantsDetailsForm = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const handleIncrement = (setter) => {
    setter(prev => prev + 1);
  };

  const handleDecrement = (setter) => {
    setter(prev => prev > 0  ? prev - 1 : 0);
  };

  return (
    <div className="tenant-details">
      <div className="tenant-details__container">
        <div className="tenant-details__header">
          <h2 className="tenant-details__title">Owner Seeking Some More Informationgit </h2>
          <button className="tenant-details__close "  onClick={()=>{console.log("clicked")}}>&times;</button>
        </div>

        <form className="tenant-details__form">
          <div className="tenant-details__section-header">
            <h3 className="tenant-details__section-title">Personal Details</h3>
          </div>

          <div className="tenant-details__grid">
            <div className="tenant-details__field">
              <label className="tenant-details__label">First Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="tenant-details__input"
              />
            </div>
            <div className="tenant-details__field">
              <label className="tenant-details__label">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="tenant-details__input"
              />
            </div>
          </div>

          <div className="tenant-details__grid">
            <div className="tenant-details__field">
              <label className="tenant-details__label">Contact No*</label>
              <input
                type="text"
                placeholder="Contact No"
                className="tenant-details__input"
              />
            </div>
            <div className="tenant-details__field">
              <label className="tenant-details__label">Email</label>
              <input
                type="email"
                placeholder="Email Id"
                className="tenant-details__input"
              />
            </div>
          </div>

          <div className="tenant-details__counter-group">
            <label className="tenant-details__label">Family Members</label>
            <div className="tenant-details__counter-container">
              <span className="tenant-details__label">Adults</span>
              <div className="tenant-details__counter-controls">
                <button
                  type="button"
                  onClick={() => handleDecrement(setAdults)}
                  className="tenant-details__counter-button"
                >
                  −
                </button>
                <span className="tenant-details__counter-value">{adults}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement(setAdults)}
                  className="tenant-details__counter-button"
                >
                  +
                </button>
              </div>
            </div>
            <div className="tenant-details__counter-container">
              <span className="tenant-details__label">Children</span>
              <div className="tenant-details__counter-controls">
                <button
                  type="button"
                  onClick={() => handleDecrement(setChildren)}
                  className="tenant-details__counter-button"
                >
                  −
                </button>
                <span className="tenant-details__counter-value">{children}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement(setChildren)}
                  className="tenant-details__counter-button"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="tenant-details__divider"></div>

          <div className="tenant-details__section-header">
            <h3 className="tenant-details__section-title">Profession & Others</h3>
          </div>

          <div className="tenant-details__grid">
            <div className="tenant-details__field">
              <label className="tenant-details__label">Type of Work</label>
              <div className="tenant-details__radio-group">
                <label className="tenant-details__radio-label">
                  <input type="radio" name="workType" className="tenant-details__radio-input" />
                  Self Employed
                </label>
                <label className="tenant-details__radio-label">
                  <input type="radio" name="workType" className="tenant-details__radio-input" />
                  Working Professional
                </label>
              </div>
            </div>
            <div className="tenant-details__field">
              <label className="tenant-details__label">Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                className="tenant-details__input"
              />
            </div>
          </div>

          <div className="tenant-details__grid">
            <div className="tenant-details__field">
              <label className="tenant-details__label">Designation</label>
              <input
                type="text"
                placeholder="Designation"
                className="tenant-details__input"
              />
            </div>
            <div className="tenant-details__field">
              <label className="tenant-details__label">Pets</label>
              <div className="tenant-details__radio-group">
                <label className="tenant-details__radio-label">
                  <input type="radio" name="pets" className="tenant-details__radio-input" />
                  Yes
                </label>
                <label className="tenant-details__radio-label">
                  <input type="radio" name="pets" className="tenant-details__radio-input" />
                  No
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="tenant-details__submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantsDetailsForm;