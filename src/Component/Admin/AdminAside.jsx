import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function AdminAside() {
  const { medata } = useSelector((state) => state.meDetails);
  const location = useLocation();

  return (
    <div className="flex bg-red-20 p-4 gap-3">
      <aside className="sticky top-[82px] bg-white text-black p-4 w-[200px] h-full border-b-[5px] rounded-lg outline outline-[#fbfbfb]">
        <div className="mb-4 text-2xl font-semibold text-[var(--main-light-clr)]">Dashboard</div>
        <div className="flex flex-col space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex gap-2 py-2 text-left text-sm px-1 rounded-md transition-all ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-[var(--main-light-hover-clr)] hover:text-white"
              }`
            }
          >
            <img
              src="/img/Dashboard.svg"
              alt="Dashboard Icon"
              className={`transition-all ${location.pathname === "/admin/dashboard" ? "invert brightness-0" : ""}`}
            />
            Dashboard
          </NavLink>

          {medata?.IsAuthenticated &&
            medata.user.Role === "Owner" &&
            medata.user.OwnerVerify && (
              <>
                <NavLink
                  to="/admin/agent/dashboard?Role=Admin"
                  className={({ isActive }) =>
                    `flex gap-2 py-2 text-left text-sm px-1 rounded-md transition-all ${
                      location.search.includes("Role=Admin") ? "bg-blue-500 text-white" : "hover:bg-[var(--main-light-hover-clr)] hover:text-white"
                    }`
                  }
                >
                  <img
                    src="/img/Admin.svg"
                    alt="Admin Icon"
                    className={`transition-all ${location.search.includes("Role=Admin") ? "invert brightness-0" : ""}`}
                  />
                  Admin
                </NavLink>
                <NavLink
                  to="/admin/agent/dashboard?Role=Agent"
                  className={({ isActive }) =>
                    `flex gap-2 py-2 text-left text-sm px-1 rounded-md transition-all ${
                      location.search.includes("Role=Agent") ? "bg-blue-500 text-white" : "hover:bg-[var(--main-light-hover-clr)] hover:text-white"
                    }`
                  }
                >
                  <img
                    src="/img/Admin.svg"
                    alt="Agent Icon"
                    className={`transition-all ${location.search.includes("Role=Agent") ? "invert brightness-0" : ""}`}
                  />
                  Agent
                </NavLink>
              </>
            )}

          <NavLink
            to="/admin/allpost"
            className={({ isActive }) =>
              `flex gap-2 py-2 text-left text-sm px-1 rounded-md transition-all ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-[var(--main-light-hover-clr)] hover:text-white"
              }`
            }
          >
            <img
              src="/img/Allpost.svg"
              alt="All Post Icon"
              className={`transition-all ${location.pathname === "/admin/allpost" ? "invert brightness-0" : ""}`}
            />
            All Post
          </NavLink>

           {/* <NavLink
            to="/admin/report"
            className={({ isActive }) =>
              location.pathname === "/admin/report"
                ? "flex gap-2 py-2 text-left bg-blue-500 text-white rounded-md"
                : "flex gap-2 py-2 text-left hover:bg-gray-200 rounded-md"
            }
          >
            <img src="/img/Report.svg" alt="" />
            Report
          </NavLink>

          <NavLink
            to="/admin/authentication"
            className={({ isActive }) =>
              location.pathname === "/admin/authentication"
                ? "flex gap-2 py-2 text-left bg-blue-500 text-white rounded-md"
                : "flex gap-2 py-2 text-left hover:bg-gray-200 rounded-md"
            }
          >
            <img src="/img/Authentication.svg" alt="" />
            Authentication
          </NavLink>

          <NavLink
            to="/admin/schedules"
            className={({ isActive }) =>
              location.pathname === "/admin/schedules"
                ? "flex gap-2 py-2 text-left bg-blue-500 text-white rounded-md"
                : "flex gap-2 py-2 text-left hover:bg-gray-200 rounded-md"
            }
          >
            <img src="/img/Schedule.svg" alt="" />
            Schedules
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              location.pathname === "/admin/settings"
                ? "flex gap-2 py-2 text-left bg-blue-500 text-white rounded-md"
                : "flex gap-2 py-2 text-left hover:bg-gray-200 rounded-md"
            }
          >
            <img src="/img/Setting.svg" alt="" />
            Settings
          </NavLink> */}


                    {/* <button className="text- py-2 text-left hover:bg-gray-200 rounded-md">
            Library
          </button> */}
          <button className="flex gap-2 text-sm py-2 px-1 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white rounded-md">
            <img src="/img/Report.svg" alt="" />
            Report
          </button>
          <button  className="flex gap-2 py-2 text-sm px-1 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white rounded-md">
            <img src="/img/Authentication.svg" alt="" />
            Authentication
          </button>
          <button  className="flex gap-2 py-2 text-sm px-1 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white rounded-md">
            <img src="/img/Schedule.svg" alt="" />
            Schedules
          </button>
          {/* <button className="text- py-2 text-left hover:bg-gray-200 rounded-md">
            Payouts
          </button> */}
          <button  className="flex gap-2 py-2 text-sm px-1 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white rounded-md">
            <img src="/img/Setting.svg" alt="" />   Settings
          </button>

          {/* <button className="menu-button">Library</button> */}
          {/* <button className="menu-button">Report</button>
          <button className="menu-button">Authentication</button>
          <button className="menu-button">Schedules</button> */}
          {/* <button className="menu-button">Payouts</button> */}
          <button className="menu-button">Settings</button>
        </div>
      </aside>

      <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
}




// import React from "react";
// import { useSelector } from "react-redux";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";

// export default function AdminAside() {
//   const { medata } = useSelector((state) => {
//     return state.meDetails;
//   });
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className="flex bg-red-20 p-4 gap-3">
//       <aside className="sticky top-[82px]  bg-white text-[var(--main-light-clr)] text-black 
//        p-4 w-[200px] h-full border-b-[5px] rounded-lg outline outline-[#fbfbfb]">
//         <div className="mb-4 text-2xl font-semibold text-[var(--main-light-clr)]">Dashboard</div>
//         <div className="flex flex-col space-y-4">
//           <button
//             className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-blue-500 focus:text-white focus:outline-none font-base rounded-md"
//             onClick={() => navigate("/admin/dashboard")}
//           >
//             <img
//               src="/img/Dashboard.svg"
//               alt=""
//               className="text-black hover:text-white focus:text-white"
//             />
//             Dashboard
//           </button>


//           {medata &&
//             medata.IsAuthenticated &&
//             medata.user.Role === "Owner" &&
//             medata.user.OwnerVerify && (
//               <>
//                 <button
//                  className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md"
//                   onClick={() => navigate("/admin/agent/dashboard?Role=Admin")}
//                 >
//                   <img src="/img/Admin.svg" alt="" />
//                   Admin
//                 </button>
//                 <button
//                   className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md"
//                   onClick={() => navigate("/admin/agent/dashboard?Role=Agent")}
//                 >
//                   <img src="/img/Admin.svg" alt="" />
//                   Agent
//                 </button>
//               </>
//             )}
//           <button
//              className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md"
//             onClick={() => navigate("/admin/allpost")}
//           >
//             <img src="/img/Allpost.svg" alt="" />
//             All Post
//           </button>
//           {/* <button className="text- py-2 text-left hover:bg-gray-200 rounded-md">
//             Library
//           </button> */}
//           <button className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md">
//             <img src="/img/Report.svg" alt="" />
//             Report
//           </button>
//           <button  className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md">
//             <img src="/img/Authentication.svg" alt="" />
//             Authentication
//           </button>
//           <button  className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md">
//             <img src="/img/Schedule.svg" alt="" />
//             Schedules
//           </button>
//           {/* <button className="text- py-2 text-left hover:bg-gray-200 rounded-md">
//             Payouts
//           </button> */}
//           <button  className="flex gap-2 p-2 text-left hover:bg-[var(--main-light-hover-clr)] hover:text-white focus:bg-[var(--main-dark-clr)] focus:text-white focus:outline-none font-base rounded-md">
//             <img src="/img/Setting.svg" alt="" />   Settings
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 p- bg- rounded-lg shadow-md ">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
