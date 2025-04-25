import React from 'react';
import './BrowseProperties.css';
import { Link, } from "react-router-dom";



const BrowseProperties = () => {
    return (
        <div className='BrowseProperties-Main'>
            <div className='BrowsePropertiesContainer'>
            <div className='BrowseProperties-Left'>
                <div className='BrowseProperties-Headings'>
                    <h2>Say Goodbye to  <span className='span-name-rent'> Hefty-Brokerage </span> </h2>
                    <h2></h2>
                    <h2>Rent Smart with <span className='span-name-rent'>   PropertyDekho247! </span></h2>
                    <h2></h2>
                </div>
                <div className='BrowseProperties-Content'>
                Find your perfect rental home with 100% verified listings, Connect property owner's directly. PropertyDekho247 offers a wide range of properties at competitive prices and free from misleading and fake listings. Enjoy a simple, transparent process with fully verified listings for a stress-free rental experience.
                </div>
                <div className='BrowseProperties-Button-Container'>
                   <Link to="/all-post/Rent" >  <button className='BrowseProperties-Button'>Browse Properties</button></Link>
                </div>

            </div>
            <div className='BrowseProperties-Right'>
                <img
                loading="lazy"
                className='Img-One'
                src='/img/EllipseBG.png'
                />
                <img
                loading="lazy"
                className='Img-Two'
                src='/img/EllipseBG.png'
                />
             <div className='BrowseProperties-Right-parent'>
             <div className='OwnerListings'>
                    <div className='OwnerListings-Img'>
                        <img
                        loading="lazy"
                        src='https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/directOwnerListings.png'
                        />
                    </div>
                    <div className='OwnerListings-Content'>
                        <h3>Direct Owner Listings</h3>
                        <p>No middle men, connect directly with property owners</p>
                    </div>
                </div>
                <div className='VerifiedProperties'>
                <div className='VerifiedPropertiesContainer'>
                
                <div className='VerifiedProperties-Content'>
                    <h3>Verified & Trusted Properties</h3>
                    <p>Authencity and relaibility.</p>
                </div>
                <div className='VerifiedProperties-Img'>
                    <img
                    loading="lazy"
                    src='https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/VerifiedProperties.png'
                    />
                </div>
                </div>
                </div>
                <div className='DocsAssistance'>
                <div className='DocsAssistance-Img'>
                    <img
                    loading="lazy"
                    src='https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/DocsAssistance.png'
                    />

                </div>
                <div className='DocsAssistance-Content'>
                <h3>Documents Assistance</h3>
                <p>Rent Agreement and Police Verification.</p>
                </div>
                </div>
             </div>

            </div>
            </div>
        </div>
    );
};

export default BrowseProperties;