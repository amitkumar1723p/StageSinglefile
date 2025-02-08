import React from "react";
import "./CreatePostSubmitAlert.css";
import { useNavigate } from "react-router-dom";

export default function CreatePostSubmitAlert({ SetShow }) {
  const navigate = useNavigate();
  return (
    <div className="create-post-submit-alert">
      <div className="alert-header">
        <div className="alert-title-create">
          {" "}
          <img src="/img/blue-tick.svg" alt="blue-tick" />
          <h3>Post Created Successfully! </h3>{" "}
        </div>
        <button
          className="create-post-submit-alert-close-btn"
          onClick={() => {
            SetShow(false);
            navigate("/user/my-listing");
          }}
        >
          ×
        </button>
      </div>

      <p className="alert-message">
        Your post has been created successfully. Currently, your post is
        <span className="span-inactive"> inactive</span> <strong>PropertyDekho247</strong> will review it until it's
        <span className="span-inactive"> Inactive</span> . Please be patient as
        we ensure everything is in order.
        <br />
        <br />
        If you need to activate it immediately, please contact our team for
        assistance. We are here to help you with any issues or concerns
        regarding the activation process. Our support team is available to
        assist you with any questions you may have.
      </p>

      <div className="create-post-submit-alert-action-buttons">
        <button
          className="action-btn"
          onClick={() => navigate("/user/my-listing")}
        >
          My Listings
        </button>
        <button className="action-btn" onClick={() => navigate("/user")}>
          Dashboard
        </button>
      </div>
    </div>
  );
}
