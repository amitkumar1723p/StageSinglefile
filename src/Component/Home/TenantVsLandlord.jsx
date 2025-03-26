import React from 'react'
import { useState } from 'react'
import './TenantVsLandLord.css'
import Tenant from './Tenant'
import LandLord from './LandLord'
import BrowseProperties from './BrowseProperties'
import PropertyDetailsForm from './PropertyDetailsForm'
import RentAgreement from './RentAgreement'
import VerifiedComponent from './VerifiedComponent'
import RentalBanner from './RentalBanner'

export default function TenantVsLandlord() {


    const [tenantORlandlord, settenantORlandlord] =useState('Tenant');

   const handleTenantvsLandlord =(e)=>{
    if(e.target.value === 'Tenant'){
       settenantORlandlord("Tenant")
    }else{
       settenantORlandlord("LandLord")
    }
   }


  return (
    <>
    <div className='tenant-vs-landlord-main-container'>
     <div className='tenant-vs-landlord-headings'>
        <h2 className='tenant-vs-landlord-heading'>
        Renting Made Simple—Find or List your Property-<span>Free</span>
        </h2>
        <p>Tenants and landlords can connect directly—no commissions, no hassles. Post a property or find your next home with ease. Need a rent agreement? Get doorstep delivery for ₹1999.</p>
     </div>
     <div className='tenant-vs-landlord-button-container'>
        
        <button className={`tenant-vs-landlord-button ${tenantORlandlord == "Tenant"? 'tenant-vs-landlord-active':''  } `} value={'Tenant'} onClick={handleTenantvsLandlord}>Tenant</button>
        <button className={`tenant-vs-landlord-button  ${tenantORlandlord == "LandLord"? 'tenant-vs-landlord-active':''  }`} value={'Landlord'} onClick={handleTenantvsLandlord} >LandLord</button>
     </div>
    </div>

    {tenantORlandlord ==="Tenant" && (
        <div>
          <Tenant/>
          <BrowseProperties />
          {/* <PropertyDetailsForm /> */}
          {/* <RentAgreement /> */}
          {/* <RentalBanner /> */}
          {/* <VerifiedComponent /> */}
        </div>
    )}
    {tenantORlandlord === "LandLord" && (
        <div>

          <LandLord/>
          <BrowseProperties />
          {/* <PropertyDetailsForm /> */}
          {/* <RentAgreement /> */}
          {/* <RentalBanner /> */}
          {/* <VerifiedComponent /> */}
        </div>
    ) }

    </>
  )
}
