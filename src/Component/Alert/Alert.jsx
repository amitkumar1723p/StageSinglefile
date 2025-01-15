import React, { useEffect} from "react";
import "./Alert.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Alert({
  AlertType = "",
  AlertMessage = "",
  ShowAlert = true,
}) {
  const dispatch = useDispatch();
 const  navigate = useNavigate()
 
  useEffect(() => {
    if (ShowAlert === true) {
      setTimeout(() => {
        dispatch({ type: "ClearAlert" });
      }, 3000); // Alert will disappear after 4 seconds
    }
  }, [ShowAlert, dispatch]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✔";
      case "error":
        return "✘";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      default:
        return "";
    }
  }; 
   
 ;

  return (
    <>
      
        <div className={`alertbox ${ShowAlert ? "show" : ""} ${AlertType}`}>
          <div className="alert-content">
            <div className="alert-icon">{getIcon(AlertType)}</div>
            <div className="alert-message">
              <p className="alert-type">{AlertType}</p>
              {AlertMessage}
            </div>
          </div>
        </div>
       
 
       
    </>
  );
}
