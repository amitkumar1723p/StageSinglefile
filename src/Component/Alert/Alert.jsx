// import React, { useEffect} from "react";
// import "./Alert.css";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Alert({
//   AlertType = "",
//   AlertMessage = "",
//   ShowAlert = true,
// }) {
//   const dispatch = useDispatch();
//  const  navigate = useNavigate()
 
//   //  console.log(AlertType , AlertMessage ,ShowAlert ,"kddk")
//   useEffect(() => {
//     if (ShowAlert === true) {
//       setTimeout(() => {
//         dispatch({ type: "ClearAlert" });
//       }, 3000); // Alert will disappear after 3 seconds
//     }
//   }, [ShowAlert, dispatch]);

//   const getIcon = (type) => {
//     switch (type) {
//       case "success":
//         return "✔";
//       case "error":
//         return "✘";
//       case "info":
//         return "ℹ️";
//       case "warning":
//         return "⚠️";
//       default:
//         return "";
//     }
//   }; 
   
// ;

//   return (
//     <>
      
//         <div className={`alertbox ${ShowAlert ? "show" : ""} ${AlertType}`}>
//           <div className="alert-content">
//             <div className="alert-icon">{getIcon(AlertType)}</div>
//             <div className="alert-message-box">              
//               <p className="alert-type">{AlertType}</p>
//               {AlertMessage}
//             </div>
//           </div>
//         </div>
       
 
       
//     </>
//   );
// }


//toast

import React, { useEffect} from "react";
import "./Alert.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Alert({
  AlertType = "",
  AlertMessage = "",
  ShowAlert = true,
}) {
  const dispatch = useDispatch();
 const  navigate = useNavigate()
 
  //  console.log(AlertType , AlertMessage ,ShowAlert ,"kddk")
  useEffect(() => {
    if (ShowAlert === true ) {
      console.log(AlertType,AlertMessage)
      if(!AlertMessage||!AlertType)return
      toast[AlertType?.toLowerCase()](AlertMessage||AlertMessage[0]?.props?.children)
      setTimeout(() => {
        dispatch({ type: "ClearAlert" });
      }, 5000); // Alert will disappear after 3 seconds
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

       
    </>
  );
}
