import React from 'react';
import "./FurnishDetails.css";

const furnishingData = [
  { name: "AC", icon: "/img/ac.svg" },
  { name: "Beds", icon: "/img/bed.svg" },
  { name: "Fans", icon: "/img/fan.svg" },
  { name: "Geyser", icon: "/img/geyser.svg" },
  { name: "Light", icon: "/img/bulb.svg" },
  { name: "ModularKitchen", icon: "/img/kitchen.svg" },
  { name: "TV", icon: "/img/tv.svg" },
  { name: "Wardrobe", icon: "/img/wardrobe.svg" },
  { name: "WaterPurifier", icon: "/img/water-purifier.svg" },
  { name: "Chimney", icon: "/img/chimney.svg" },
  { name: "Sofa", icon: "/img/sofa.svg" },
  { name: "ExhaustFan", icon: "/img/exhaust-fan.svg" },
  { name: "DiningTable", icon: "/img/dining.svg" },
  { name: "Curtains", icon: "/img/curtains.svg" },
  { name: "MicroWave", icon: "/img/microwave.svg" },
  { name: "Fridge", icon: "/img/fridge.svg" },
  { name: "WashingMachine", icon: "/img/washing-machine.svg" },
];

const FurnishDetails = ({ furnishD }) => {
  const isUnFurnished = furnishD.Furnishing === "Un-Furnished";
  
  const items = furnishingData.map((item) => ({
    ...item,
    value: isUnFurnished ? 0 : furnishD?.FurnishingOption?.[item.name] || 0,
  }));

  const availableItems = items.filter((item) => item.value > 0);
  const unavailableItems = items.filter((item) => item.value === 0);

  return (
    <div className="furnish-details">
      <h2 className="furnish-heading">Furnishing Details</h2>
      <div className='furnish-dummy-line'></div>
      <div className="furnish-container">
        {[...availableItems, ...unavailableItems].map(({ name, value, icon }) => (
          <div key={name} className={`furnish-item ${value > 0 ? "available" : "unavailable"}`}>
            <img src={icon} alt={name} className="furnish-icon" />
            <span className="furnish-name">{value > 0 ? (name === "ModularKitchen" ? "Modular-Kitchen" : `${value} ${name}`) : name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnishDetails;
