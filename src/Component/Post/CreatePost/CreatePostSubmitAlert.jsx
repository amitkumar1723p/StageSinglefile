import React from "react";
import "./CreatePostSubmitAlert.css";
import { useNavigate } from "react-router-dom";

export default function CreatePostSubmitAlert({ SetShow }) {
  const navigate = useNavigate();
  return (
    <div className="create-post-submit-alert">
      <strong>Post Created Successfully!</strong>
      <p>Your post will be live once it is activated.</p>
      <button
        className="create-post-submit-alert-close-btn"
        onClick={() => {
          SetShow(false);
          navigate("/user/my-listing");
        }}
      >
        ×
      </button>
      <div>
        {/* <button onClick={()=>{navigate('/user')}}>Dashboard</button>
        <button onClick={()=>{ navigate('/user/my-listing')}}> My Listing</button> */}
      </div>
      <div className="create-post-submit-alert-action-buttons">
        <button
          className=""
          onClick={() => {
            navigate("/user/my-listing");
          }}
        >
          My Lising
        </button>
        <button
          className=""
          onClick={() => {
            navigate("/user");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
