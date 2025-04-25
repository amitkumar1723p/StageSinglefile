import React, { useState } from "react";

export default function OneImage({ ImageUrl }) {
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const handleMouseMove = (e) => {
   
    const { left, top, width, height } = e.target.getBoundingClientRect();
     
     
    const x = ((e.clientX - left) / width) * 100; // X percentage
    const y = ((e.clientY - top) / height) * 100; // Y percentage
    setTransformOrigin(`${x}% ${y}%`);
 
  };
  const handleZoomIn = () =>
    setScale((prevScale) => Math.min(prevScale + 0.5, 3)); // Limit max zoom to 3x
  const handleZoomOut = () =>
    setScale((prevScale) => Math.max(prevScale - 0.5, 1));
 
  const handleWheel = (event) => {
    event.preventDefault();
    
    // Determine the scale adjustment
    const scaleAmount = 0.3; // Adjust scale in small increments
    let newScale = scale;

    if (event.deltaY < 0) {
      // Zoom in
      newScale += scaleAmount;
    } else if (event.deltaY > 0 && scale > scaleAmount) {
      // Zoom out, prevent scale going below 1 (optional)
      newScale -= scaleAmount;
    }

    // Set the new scale
    setScale(newScale);
  };


return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '20px' }}>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div style={{ overflow: 'hidden', display: 'inline-block' }}>
        <img
                      loading="lazy"
          src={ImageUrl}
          alt="Zoomable"
 
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          style={{
            transformOrigin: transformOrigin,
            transform: `scale(${scale})`,
            transition: 'transform 0.3s ease, transform-origin 0.3s ease',
          }}
        />
      </div>
    </div>
  );

}
