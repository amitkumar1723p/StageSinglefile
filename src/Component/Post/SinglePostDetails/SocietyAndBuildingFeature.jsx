import React from 'react';
import './SocietyAndBuildingFeature.css';

const propertyFeatures = {
  ClubHouse: { img: '/img/feature-club-house.svg', name: 'Club House' },
  SwimmingPool: { img: '/img/feature-swimming-pool.svg', name: 'Swimming Pool' },
  Dumbell: { img: '/img/feature-dumbell.svg', name: 'Dumbell' },
  CommunityCentre: { img: '/img/feature-community.svg', name: 'Community Center' },
  SecurutyGuard: { img: '/img/feature-guard.svg', name: 'Security Guard' },
  PipedGas: { img: '/img/feature-piped-gas.svg', name: 'Piped Gas' },
  VisitorParking: { img: '/img/feature-visitor-parking.svg', name: 'Visitor Parking' },
  Lift: { img: '/img/feature-lift.svg', name: 'Lift' },
  Park: { img: '/img/feature-park.svg', name: 'Park' },
  IntercomFacility: { img: '/img/feature-intercom-facility.svg', name: 'Intercom Facility' },
  WasteDisposal: { img: '/img/feature-waste-disposal.svg', name: 'Waste Disposal' },
  CafeteriaFoodCourt: { img: '/img/feature-cafeteria-food-court.svg', name: 'Cafeteria/Food Court' },
  ConferenceRoom: { img: '/img/feature-meeting-room.svg', name: 'Conference Room' },
  Library: { img: '/img/feature-library.svg', name: 'Library' },
  ATMs: { img: '/img/feature-atm.svg', name: 'ATMs' },
  KidsPlayArea: { img: '/img/feature-kids-play-area.svg', name: 'Kids Play Area' },
  JoggingTrack: { img: '/img/feature-jogging-track.svg', name: 'Jogging Track' },
};

const nameToKeyMap = Object.fromEntries(
  Object.entries(propertyFeatures).map(([key, { name }]) => [name, key])
);

const SocietyAndBuildingFeature = ({ feature = [] }) => (
  <div className="society-feature-parent">
    <h2 className="furnish-heading">Property Features</h2>
    <div className="society-feature-container">
      {feature.map((item, index) => {
        const key = nameToKeyMap[item];
        const data = propertyFeatures[key];
        return data ? (
          <p className="society-feature" key={index}>
            <img src={data.img} alt={data.name} /> {data.name}
          </p>
        ) : null;
      })}
    </div>
  </div>
);

export default SocietyAndBuildingFeature;