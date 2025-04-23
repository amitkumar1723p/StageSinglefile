import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Import the regular CSS file

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  let startX = 0; // To track swipe start position

  const location = useLocation();
  const handleSwipe = (event) => {
    if (event.type === "touchstart") {
      startX = event.touches[0].clientX;
    } else if (event.type === "touchmove") {
      const diffX = event.touches[0].clientX - startX;
      if (diffX > 50) {
        setIsOpen(true); // Open sidebar on swipe
      }
    }
  };
  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
      {/* Sidebar */}
      <aside
        className={`sidebar-profile ${isOpen ? "open" : ""}`}
        onTouchStart={handleSwipe}
        onTouchMove={handleSwipe}
      >
        <div className="logo"></div>
      
      </aside>
    </>
  );
}

export default Sidebar;
