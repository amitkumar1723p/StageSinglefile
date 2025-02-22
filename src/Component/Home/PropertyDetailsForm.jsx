import React, { useState } from "react";
import "./PropertyDetailsForm.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PropertyDetailsForm() {
  const [bedroom, setBedrooms] = useState(0);
  const [park, setParking] = useState(0);
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const [sellerInformation, setSellerInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    preferredContactMode: "",
  });

  const [formData, setFormData] = useState({
    propertyType: "",
    projectName: "",
    propertySize: "",
    propertyAge: "",
    furnishingStatus: "",
    cityLocality: "",
    bedrooms: bedroom,
    parking: park,
    sellerInfo: sellerInformation,
    postedBy:medata?.user?._id || ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
  
    const config = {
      headers: {
        
        "Content-Type": "application/json" 
      },

      withCredentials: true,
    };
      try {
        const response =await axios.post(`${process.env.REACT_APP_API_URL}/get-free-estimation/save`,formData,config)
         
        if(response.data.success){
          toast.success("query is submittted !!")
          resetForm();
        }

      } catch (error) {
        console.log(error)
      }


  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSellerInfoChange(e) {
    const { name, value } = e.target;
    setSellerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormData((prev) => ({
      ...prev,
      sellerInfo: {
        ...prev.sellerInfo,
        [name]: value,
      },
    }));
  }
  function resetForm()  {
    setBedrooms(0)
    setParking(0)
    setSellerInfo({
      firstName: "",
      lastName: "",
      mobileNo: "",
      preferredContactMode: "",
    });
  
    setFormData({
      propertyType: "",
      projectName: "",
      propertySize: "",
      propertyAge: "",
      furnishingStatus: "",
      cityLocality: "",
      bedrooms: "",  // Reset to empty string or default value
      parking: "",   // Reset to empty string or default value
      sellerInfo: {
        firstName: "",
        lastName: "",
        mobileNo: "",
        preferredContactMode: "",
      },
      postedBy: medata?.user?._id || "" // Keep it as is if needed
    });
  };

  function updateBedrooms(change) {
    setBedrooms((prev) => Math.max(0, prev + change));
    setFormData((prev) => ({
      ...prev,
      bedrooms: Math.max(0, bedroom + change),
    }));
  }

  function updateParking(change) {
    setParking((prev) => Math.max(0, prev + change));
    setFormData((prev) => ({
      ...prev,
      parking: Math.max(0, park + change),
    }));
  }

  return (
    <div className="form-container-rent">
      <div className="leftContainer">
        <div className="upperSection">
          <div className="heading">
            <h2>
              Get a <span>Free</span> Property Estimate - Know Your Property's Real Value
            </h2>
          </div>
          <div className="paragraph">
            <p>
              Thinking of Selling? Get an expert-estimated value of your property in minutes. Just fill in the details,
              and our team will get back to you with a fair and transparent price estimate.
            </p>
          </div>
        </div>
        <div className="lowerSection">
          <h4>WHAT YOU WILL GET HERE</h4>
          <div className="property-Container">
            <img src="/img/PropertyDetailsForm.svg" alt="Property Details" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Property Details</h2>


        <div className="form-grid">
          <select className="input" name="propertyType" value={formData.propertyType} onChange={handleInputChange}>
            <option value="" disabled hidden>
              Property Type
            </option>
            <option>Residential</option>
            <option>Commerical</option>
            {/* <option>Type-3</option> */}
          </select>

          <input type="text" name="projectName" value={formData.projectName} placeholder="Project Name/Locality/Sector" className="input" onChange={handleInputChange} />

          <input type="text" name="propertySize" value={formData.propertySize} placeholder="Property Size" className="input" onChange={handleInputChange} />

          <select className="input" name="propertyAge" value={formData.propertyAge} onChange={handleInputChange}>
            <option value="" disabled hidden>
              Property Age
            </option>
            <option>0-5</option>
            <option>5-10</option>
            <option>10-15</option>
            <option>15-20</option>
          </select>

          <select className="input" name="furnishingStatus" value={formData.furnishingStatus} onChange={handleInputChange}>
            <option value="" disabled hidden>
              Furnishing Status
            </option>
            <option>Furnished</option>
            <option>Semi-Furnished</option>
            <option>Un-Furnished</option>

          </select>

          <input type="text" name="cityLocality" placeholder="City & Locality" value={formData.cityLocality} className="input" onChange={handleInputChange} />

          <div className="input  counter">
            <label className="bedroom-counter">Bedrooms</label>
            <button type="button" onClick={() => updateBedrooms(-1)}>-</button>
            <span>{bedroom}</span>
            <button type="button" onClick={() => updateBedrooms(1)}>+</button>
          </div>

          <div className="input counter">
            <label>Parking</label>
            <button type="button" onClick={() => updateParking(-1)}>-</button>
            <span>{park}</span>
            <button type="button" onClick={() => updateParking(1)}>+</button>
          </div>
        </div>

        <h2>Sellers Info</h2>

        <div className="form-grid">
          <input type="text" name="firstName" placeholder="First Name" value={sellerInformation.firstName} className="input" onChange={handleSellerInfoChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={sellerInformation.lastName} className="input" onChange={handleSellerInfoChange} />
          <input type="number" name="mobileNo" placeholder="Mobile No" value={sellerInformation.mobileNo} className="input" onChange={handleSellerInfoChange} required />
          <select className="input" name="preferredContactMode" value={sellerInformation.preferredContactMode} onChange={handleSellerInfoChange}>
            <option value="" disabled hidden>
              Preferred Contact Mode
            </option>
            <option>Phone</option>
            <option>Email</option>
            <option>Whatsapp</option>
          </select>
        </div>

        <button className="rent-submit-button" onClick={handleSubmit}>
          Get Free Estimate
        </button>
      </div>
    </div>
  );
}
