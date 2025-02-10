import React from 'react';
import './BrowseProperties.css';



const BrowseProperties = () => {
    return (
        <div className='BrowseProperties-Main'>
            <div className='BrowsePropertiesContainer'>
            <div className='BrowseProperties-Left'>
                <div className='BrowseProperties-Headings'>
                    <h1>Say Goodbye to </h1>
                    <h1>Brokerage <span>-</span></h1>
                    <h1>Rent Smart with</h1>
                    <h1>Property Dekho 24/7!</h1>
                </div>
                <div className='BrowseProperties-Content'>
                    Find your perfect home without paying extra. 100% Verified listings, direct owner deals, and a seamless rental experience!
                </div>
                <div className='BrowseProperties-Button-Container'>
                    <button className='BrowseProperties-Button'>Browse Properties</button>
                </div>
            </div>
            <div className='BrowseProperties-Right'>
                <img
                className='Img-One'
                src='/img/EllipseBG.png'
                />
                <img
                className='Img-Two'
                src='/img/EllipseBG.png'
                />
                <div className='OwnerListings'>
                    <div className='OwnerListings-Img'>
                        <img
                        src='/img/directOwnerListings.png'
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
                    src='/img/VerifiedProperties.png'
                    />
                </div>
                </div>
                </div>
                <div className='DocsAssistance'>
                <div className='DocsAssistance-Img'>
                    <img
                    src='/img/directOwnerListings.png'
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
    );
};

export default BrowseProperties;