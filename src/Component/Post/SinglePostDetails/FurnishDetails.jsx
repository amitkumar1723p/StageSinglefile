import React from 'react';
import "./FurnishDetails.css";

const furnishingData = [
  { name: "AC", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ac.svg"},
  { name: "Beds", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/bed.svg" },
  { name: "Fans", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/fan.svg" },
  { name: "Geyser", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/geyser.svg" },
  { name: "Light", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/bulb.svg" },
  { name: "ModularKitchen", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/kitchen.svg" },
  { name: "TV", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/tv.svg" },
  { name: "Wardrobe", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/wardrobe.svg" },
  { name: "Water Purifier", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/water-purifier.svg" },
  { name: "Chimney", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/chimney.svg" },
  { name: "Sofa", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/sofa.svg" },
  { name: "Exhaust Fan", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/exhaust-fan.svg" },
  { name: "Dining Table", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/dining.svg" },
  { name: "Curtains", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/curtains.svg" },
  { name: "Micro Wave", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/microwave.svg" },
  { name: "Fridge", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/fridge.svg" },
  { name: "Washing Machine", icon: "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/washing-machine.svg" },
];

const FurnishDetails = ({ furnishD }) => {
  const isUnFurnished = furnishD?.Furnishing === "Un-Furnished";
  
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
            <span className="furnish-name">{value > 0 ? (name === "ModularKitchen" ? "Modular-Kitchen" : `${value!=true ? value:""} ${name}`) : name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnishDetails;
