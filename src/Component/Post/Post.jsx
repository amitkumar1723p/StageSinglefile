// import React from "react";
// import "./Post.css";
// import ShowPost from "./ShowLoginUserPost";
 
// import { useSelector } from "react-redux";
// import Loader from "../Loader/Loader";
// import CreatePostMain from "./CreatePost/CreatePostMain";

// export default function Post() {
//   const { loading, LodingType } = useSelector((state) => {
//
//   });

//   return (
//     <>
//       {loading ? (
//         <>
//           <div className="createpost-loadingdiv">
//             {LodingType && LodingType.DeletePostRequest && (
//               <p>Your Post is Deleted ....</p>
//             )}

//             {LodingType && LodingType.CreatePostRequest && (
//               <p>Your Post is Created .....</p>
//             )}
//             {LodingType && LodingType.UpdatePostRequest && (
//               <p>Your Post is Update .....</p>
//             )}
//             <Loader className="componentloader" />
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="PostContainer">
           
//             <CreatePostMain/>
           
          
         
        
//           </div>{" "}
//         </>
//       )}
//     </>
//   );
// }
