import React from "react";
import "./ProjectsGrid.css"; // Importing the CSS file

const ProjectsGrid = () => {
  return (
    <>
      <div className="notice">
        <span>Projects</span>
      </div>
      <div className="main-wrapper">
        <div className="grid">
          <div className="box houses-apartments">
            <img src="/img/g1.jpg" alt="Houses and Apartments" />
            <span>New Gurgaon</span>
          </div>
          <div className="box commercial-properties">
            <img src="/img/hero-img.jpg" alt="Commercial Properties" />
            <span>Sohna</span>
          </div>
          <div className="box industrial-properties">
            <img
              src="/img/Krisumi Waterfall Residences.jpg"
              alt="Industrial Properties"
            />
            <span>Ext Road</span>
          </div>
          <div className="box other-properties">
            <img src="/img/g1.jpg" alt="Other Properties" />
            <span>Dwarka</span>
          </div>
          <div className="box land-plots">
            <img src="/img/hero-img.jpg" alt="Land and Plots" />
            <span>SPR</span>
          </div>
          <div className="box commercial-properties">
            <img src="/img/hero-img.jpg" alt="Commercial Properties" />
            <span>Sohna</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsGrid;
