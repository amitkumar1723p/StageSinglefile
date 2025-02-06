import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNotFound.css'; // Import the plain CSS file

const PageNotFound = () => {
  const scrollHorizontal = () => {
    console.log("hiii");
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="PageNotFound-container">
      <div className="PageNotFound-content">
        <p className="PageNotFound-heading">404</p>
        <h1 className="PageNotFound-subheading">Page not found</h1>
        <p className="PageNotFound-description">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="PageNotFound-actions">
          <NavLink to="/" className="PageNotFound-homeButton">
            Go back to home
          </NavLink>
          <button onClick={scrollHorizontal} className="PageNotFound-supportButton">
            Contact Support !
          </button>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
