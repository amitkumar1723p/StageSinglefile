import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./BuyingSellingTenant.css";

const BuyingSellingTenant = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({ width: 0, left: 0, height: 0, top: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current?.children[activeIndex]) {
        const activeButton = containerRef.current.querySelector(`button:nth-child(${activeIndex + 2})`);
        if (activeButton) {
          const buttonRect = activeButton.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          setPosition({
            width: buttonRect.width,
            height: buttonRect.height,
            left: activeButton.offsetLeft,
            top: activeButton.offsetTop
          });
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex]);

  return (
    <div 
      ref={containerRef} 
      className="AnimatedNav-container"
    >
      <motion.div
        className="AnimatedNav-slider"
        animate={{ 
          width: position.width,
          height: position.height,
          left: position.left,
          top: position.top
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        key="seller"
        onClick={() => setActiveIndex(0)}
        className={`AnimatedNav-button ${activeIndex === 0 ? 'AnimatedNav-button--active' : ''}`}
      >
        seller
      </button>
      <button
        key="buyer"
        onClick={() => setActiveIndex(1)}
        className={`search-tab-ing AnimatedNav-button ${activeIndex === 1 ? 'AnimatedNav-button--active' : ''}`}
      >
        buyer
      </button>
      <button
        key="tenant"
        onClick={() => setActiveIndex(2)}
        className={`AnimatedNav-button ${activeIndex === 2 ? 'AnimatedNav-button--active' : ''}`}
      >
        tenant
      </button>
    </div>
  );
};

export default BuyingSellingTenant;