// import React, { useState, useEffect } from "react";
// import "./TimePicker.css";

// const TimePicker = ({ onChange, initialTime = "09:00 AM", selectedDate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedHour, setSelectedHour] = useState(9);
//   const [selectedMinute, setSelectedMinute] = useState(0);
//   const [period, setPeriod] = useState("AM");
//   const [error, setError] = useState(null);
//   const radius = 80;
//   const center = { x: 100, y: 100 };

//   const to12HourFormat = (hour24) => {
//     if (hour24 === 0) return { hour: 12, period: "AM" };
//     if (hour24 === 12) return { hour: 12, period: "PM" };
//     if (hour24 > 12) return { hour: hour24 - 12, period: "PM" };
//     return { hour: hour24, period: "AM" };
//   };

//   const to24HourFormat = (hour12, period) => {
//     if (hour12 === 12) return period === "AM" ? 0 : 12;
//     return period === "AM" ? hour12 : hour12 + 12;
//   };

//   const getCurrentTime = () => {
//     const now = new Date();
//     return { hour: now.getHours(), minute: now.getMinutes() };
//   };

//   const isToday = selectedDate ? new Date(selectedDate)?.toDateString() === new Date().toDateString() : false;

//   const isTimeAllowed = (hour12, periodToCheck) => {
//     const hour24 = to24HourFormat(hour12, periodToCheck);
//     if (selectedDate && isToday) {
//       const { hour: currentHour, minute: currentMinute } = getCurrentTime();
//       const currentTimeInMinutes = currentHour * 60 + currentMinute;
//       const selectedTimeInMinutes = hour24 * 60 + selectedMinute;
//       return (
//         hour24 >= currentHour &&
//         selectedTimeInMinutes >= currentTimeInMinutes &&
//         hour24 <= 19
//       );
//     }
//     return hour24 >= 9 && hour24 <= 19; // For non-today dates
//   };

//   const adjustTimeForNewDate = () => {
//     if (selectedDate) {
//       const currentDate = new Date();
//       const selectedDateObj = new Date(selectedDate);

//       if (selectedDateObj.toDateString() === currentDate.toDateString()) {
//         const { hour: currentHour, minute: currentMinute } = getCurrentTime();
        
//         // Adjust hour to current hour or 9 AM, whichever is later
//         const validHour = Math.max(currentHour, 9);
//         const { hour: adjustedHour12, period: adjustedPeriod } = to12HourFormat(validHour);
//    
        
//         setSelectedHour(adjustedHour12);
//         setSelectedMinute(0);
//         setPeriod(adjustedPeriod);
//         isTimeAllowed()
//       } else {
//         // For future or past dates, reset to default time
//         setSelectedHour(9);
//         setSelectedMinute(0);
//         setPeriod("AM");
//       }
//     }
//   };

//   useEffect(() => {
//     adjustTimeForNewDate();
//   }, [selectedDate]);

//   useEffect(() => {
//     if (initialTime) {
//       const [time, meridiem] = initialTime.split(" ");
//       const [hour, minute] = time.split(":").map(Number);
//       if (isTimeAllowed(hour, meridiem)) {
//         setSelectedHour(hour);
//         setSelectedMinute(minute);
//         setPeriod(meridiem);
//       } else {
//         resetToValidTime();
//       }
//     }
//   }, [initialTime, selectedDate]);

//   const resetToValidTime = () => {
//     if (selectedDate && isToday) {
//       const { hour: currentHour } = getCurrentTime();
//       const validHour = Math.max(currentHour, 9);
//       const { hour: hour12, period: newPeriod } = to12HourFormat(validHour);
//       setSelectedHour(hour12+1);
//       setSelectedMinute(0);
//       setPeriod(newPeriod);
//     } else {
//       setSelectedHour(9);
//       setSelectedMinute(0);
//       setPeriod("AM");
//     }
//   };

//   const handleHourClick = (hour) => {
//     const validInAM = isTimeAllowed(hour, "AM");
//     const validInPM = isTimeAllowed(hour, "PM");

//     if (validInAM || validInPM) {
//       setSelectedHour(hour);
//       if (!validInAM && validInPM) {
//         setPeriod("PM");
//       } else if (validInAM && !validInPM) {
//         setPeriod("AM");
//       }
//       setError(null);
//     }
//   };

//   const handleMinuteClick = (minute) => {
//     setSelectedMinute(minute);
//     setError(null);
//   };

//   const handleTimeSelection = () => {
//     // Convert to 24-hour format for the onChange event
//     const hour24 = to24HourFormat(selectedHour, period);
//     if (selectedDate && isToday) {
//       const { hour: currentHour, minute: currentMinute } = getCurrentTime();
//       const currentTimeInMinutes = currentHour * 60 + currentMinute;
//       const selectedTimeInMinutes = hour24 * 60 + selectedMinute;
//       if (selectedTimeInMinutes < currentTimeInMinutes) {
//         setError("Selected time cannot be earlier than the current time.");
//         return;
//       }
//     }

//     const timeString24 = `${hour24.toString().padStart(2, "0")}:${selectedMinute
//       .toString()
//       .padStart(2, "0")}`;
//     onChange?.(timeString24);
//     setTimeout(() => {
//       setIsOpen(false);
//       setError(null);
//     }, 0);
//   };

//   const togglePeriod = (newPeriod) => {
//     if (isTimeAllowed(selectedHour, newPeriod)) {
//       setPeriod(newPeriod);
//       setError(null);
//     }
//   };

//   const renderNumbers = () => {
//     return Array.from({ length: 12 }, (_, i) => {
//       const hour = i + 1;
//       const angle = (hour - 3) * 30 * (Math.PI / 180);
//       const x = center.x + radius * Math.cos(angle);
//       const y = center.y + radius * Math.sin(angle);
//       const isSelected = hour === selectedHour;
//       const isAllowed = isTimeAllowed(hour, "AM") || isTimeAllowed(hour, "PM");

//       return (
//         <g
//           key={hour}
//           onClick={() => isAllowed && handleHourClick(hour)}
//           className={`time-picker-number ${
//             !isAllowed ? "time-picker-number-disabled" : ""
//           }`}
//         >
//           <circle
//             cx={x}
//             cy={y}
//             r={isSelected ? 18 : 14}
//             className={
//               isSelected
//                 ? "time-picker-circle-selected"
//                 : isAllowed
//                 ? "time-picker-circle"
//                 : "time-picker-circle-disabled"
//             }
//           />
//           <text
//             x={x}
//             y={y}
//             className={
//               isSelected
//                 ? "time-picker-text-selected"
//                 : isAllowed
//                 ? "time-picker-text"
//                 : "time-picker-text-disabled"
//             }
//           >
//             {hour}
//           </text>
//         </g>
//       );
//     });
//   };

//   const selectedAngle = (selectedHour - 3) * 30 * (Math.PI / 180);
//   const handX = center.x + radius * 0.8 * Math.cos(selectedAngle);
//   const handY = center.y + radius * 0.8 * Math.sin(selectedAngle);

//   const isAMValid = isTimeAllowed(selectedHour, "AM");
//   const isPMValid = isTimeAllowed(selectedHour, "PM");

//   const hour24 = to24HourFormat(selectedHour, period);

//   return (
//     <div className="time-picker-container">
//       <div
//         onClick={() => setIsOpen(true)}
//         className="time-picker-button"
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
//       >
//         <span>{`${selectedHour}:${selectedMinute
//           .toString()
//           .padStart(2, "0")} ${period}`}</span>
//         <span className="timepicker-format-display">{`(${hour24
//           .toString()
//           .padStart(2, "0")}:${selectedMinute
//           .toString()
//           .padStart(2, "0")})`}</span>
//       </div>
//       {isOpen && (
//         <div className="time-picker-overlay">
//           <div className="time-picker-modal">
//             {error && <div className="time-picker-error">{error}</div>}
//             <div className="time-picker-header">
//               <span className="time-picker-time">
//                 {`${selectedHour}:${selectedMinute
//                   .toString()
//                   .padStart(2, "0")}`}
//               </span>
//               <div className="time-picker-period-container">
//                 <div
//                   onClick={() => isAMValid && togglePeriod("AM")}
//                   className={`time-picker-period-btn ${
//                     period === "AM" ? "time-picker-period-selected" : ""
//                   } ${!isAMValid ? "time-picker-period-disabled" : ""}`}
//                   role="button"
//                   tabIndex={isAMValid ? 0 : -1}
//                   onKeyDown={(e) =>
//                     e.key === "Enter" && isAMValid && togglePeriod("AM")
//                   }
//                 >
//                   AM
//                 </div>
//                 <div
//                   onClick={() => isPMValid && togglePeriod("PM")}
//                   className={`time-picker-period-btn ${
//                     period === "PM" ? "time-picker-period-selected" : ""
//                   } ${!isPMValid ? "time-picker-period-disabled" : ""}`}
//                   role="button"
//                   tabIndex={isPMValid ? 0 : -1}
//                   onKeyDown={(e) =>
//                     e.key === "Enter" && isPMValid && togglePeriod("PM")
//                   }
//                 >
//                   PM
//                 </div>
//               </div>
//             </div>
//             <svg width="200" height="200" className="time-picker-clock">
//               <circle
//                 cx={center.x}
//                 cy={center.y}
//                 r={radius}
//                 className="time-picker-clock-face"
//               />
//               <line
//                 x1={center.x}
//                 y1={center.y}
//                 x2={handX}
//                 y2={handY}
//                 className="time-picker-hand"
//               />
//               {renderNumbers()}
//             </svg>
//             <div className="time-picker-actions">
//               <div
//                 onClick={() => setTimeout(() => setIsOpen(false), 0)}
//                 className="time-picker-cancel-btn"
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && setTimeout(() => setIsOpen(false), 0)
//                 }
//               >
//                 Cancel
//               </div>
//               <div
//                 onClick={handleTimeSelection}
//                 className="time-picker-ok-btn"
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && handleTimeSelection()}
//               >
//                 OK
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimePicker;

import React, { useState, useEffect } from "react";
import "./TimePicker.css";
const TimePicker = ({ onChange, initialTime = "09:00 AM" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const radius = 80;
  const center = { x: 100, y: 100 };

  const to12HourFormat = (hour24) => {
    if (hour24 === 0) return { hour: 12, period: "AM" };
    if (hour24 === 12) return { hour: 12, period: "PM" };
    if (hour24 > 12) return { hour: hour24 - 12, period: "PM" };
    return { hour: hour24, period: "AM" };
  };

  const to24HourFormat = (hour12, period) => {
    if (hour12 === 12) return period === "AM" ? 0 : 12;
    return period === "AM" ? hour12 : hour12 + 12;
  };

  const isTimeAllowed = (hour12, periodToCheck) => {
    const hour24 = to24HourFormat(hour12, periodToCheck);
    return hour24 >= 9 && hour24 <= 19;
  };

  useEffect(() => {
    if (initialTime) {
      const [time, meridiem] = initialTime.split(" ");
      const [hour, minute] = time.split(":").map(Number);
      if (isTimeAllowed(hour, meridiem)) {
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setPeriod(meridiem);
      } else {
        setSelectedHour(9);
        setSelectedMinute(0);
        setPeriod("AM");
      }
    }
  }, [initialTime]);

  const handleHourClick = (hour) => {
    const validInAM = isTimeAllowed(hour, "AM");
    const validInPM = isTimeAllowed(hour, "PM");

    if (validInAM || validInPM) {
      setSelectedHour(hour);
      if (!validInAM && validInPM) {
        setPeriod("PM");
      } else if (validInAM && !validInPM) {
        setPeriod("AM");
      }
    }
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
  };

  const handleTimeSelection = () => {
    // Convert to 24-hour format for the onChange event
    const hour24 = to24HourFormat(selectedHour, period);
    const timeString24 = `${hour24.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    onChange?.(timeString24);
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
  };

  const togglePeriod = (newPeriod) => {
    if (isTimeAllowed(selectedHour, newPeriod)) {
      setPeriod(newPeriod);
    }
  };

  const renderNumbers = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i + 1;
      const angle = (hour - 3) * 30 * (Math.PI / 180);
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      const isSelected = hour === selectedHour;
      const isAllowed = isTimeAllowed(hour, "AM") || isTimeAllowed(hour, "PM");

      return (
        <g
          key={hour}
          onClick={() => isAllowed && handleHourClick(hour)}
          className={`time-picker-number ${
            !isAllowed ? "time-picker-number-disabled" : ""
          }`}
        >
          <circle
            cx={x}
            cy={y}
            r={isSelected ? 18 : 14}
            className={
              isSelected
                ? "time-picker-circle-selected"
                : isAllowed
                ? "time-picker-circle"
                : "time-picker-circle-disabled"
            }
          />
          <text
            x={x}
            y={y}
            className={
              isSelected
                ? "time-picker-text-selected"
                : isAllowed
                ? "time-picker-text"
                : "time-picker-text-disabled"
            }
          >
            {hour}
          </text>
        </g>
      );
    });
  };

  const selectedAngle = (selectedHour - 3) * 30 * (Math.PI / 180);
  const handX = center.x + radius * 0.8 * Math.cos(selectedAngle);
  const handY = center.y + radius * 0.8 * Math.sin(selectedAngle);

  const isAMValid = isTimeAllowed(selectedHour, "AM");
  const isPMValid = isTimeAllowed(selectedHour, "PM");

  // Get 24-hour format for display
  const hour24 = to24HourFormat(selectedHour, period);

  return (
    <div className="time-picker-container">
      <div
        onClick={() => setIsOpen(true)}
        className="time-picker-button"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        {/* Display both 24-hour and 12-hour formats */}
        <span>{`${selectedHour}:${selectedMinute
          .toString()
          .padStart(2, "0")} ${period}`}</span>
        <span className="timepicker-format-dispaly">{`(${hour24
          .toString()
          .padStart(2, "0")}:${selectedMinute
          .toString()
          .padStart(2, "0")})`}</span>
      </div>
      {isOpen && (
        <div className="time-picker-overlay">
          <div className="time-picker-modal">
            <div className="time-picker-header">
              <span className="time-picker-time">
                {`${selectedHour}:${selectedMinute
                  .toString()
                  .padStart(2, "0")}`}
              </span>
              <div className="time-picker-period-container">
                <div
                  onClick={() => isAMValid && togglePeriod("AM")}
                  className={`time-picker-period-btn ${
                    period === "AM" ? "time-picker-period-selected" : ""
                  } ${!isAMValid ? "time-picker-period-disabled" : ""}`}
                  role="button"
                  tabIndex={isAMValid ? 0 : -1}
                  onKeyDown={(e) =>
                    e.key === "Enter" && isAMValid && togglePeriod("AM")
                  }
                >
                  AM
                </div>
                <div
                  onClick={() => isPMValid && togglePeriod("PM")}
                  className={`time-picker-period-btn ${
                    period === "PM" ? "time-picker-period-selected" : ""
                  } ${!isPMValid ? "time-picker-period-disabled" : ""}`}
                  role="button"
                  tabIndex={isPMValid ? 0 : -1}
                  onKeyDown={(e) =>
                    e.key === "Enter" && isPMValid && togglePeriod("PM")
                  }
                >
                  PM
                </div>
              </div>
            </div>
            <svg width="200" height="200" className="time-picker-clock">
              <circle
                cx={center.x}
                cy={center.y}
                r={radius}
                className="time-picker-clock-face"
              />
              <line
                x1={center.x}
                y1={center.y}
                x2={handX}
                y2={handY}
                className="time-picker-hand"
              />
              {renderNumbers()}
            </svg>
            <div className="time-picker-actions">
              <div
                onClick={() => setTimeout(() => setIsOpen(false), 0)}
                className="time-picker-cancel-btn"
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setTimeout(() => setIsOpen(false), 0)
                }
              >
                Cancel
              </div>
              <div
                onClick={handleTimeSelection}
                className="time-picker-ok-btn"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleTimeSelection()}
              >
                OK
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
