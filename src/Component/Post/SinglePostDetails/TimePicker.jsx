import React, { useState, useEffect } from "react";
import "./TimePicker.css";

const TimePicker = ({ onChange, selectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [error, setError] = useState("");

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

  const getCurrentTime = () => {
    const now = new Date();
    return { hour: now.getHours(), minute: now.getMinutes() };
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today.toDateString();
  };

  const isTimeAllowed = (hour12, periodToCheck) => {
    const hour24 = to24HourFormat(hour12, periodToCheck);
    const now = getCurrentTime();

    if (isToday(selectedDate)) {
      return hour24 >= now.hour && hour24 <= 19;
    }
    return hour24 >= 9 && hour24 <= 19;
  };

  useEffect(() => {
    if (selectedDate) {
      const now = getCurrentTime();

      if (isToday(selectedDate) && to24HourFormat(selectedHour, period) < now.hour) {
        setError("Selected time is invalid for today's date. Please choose a valid time.");
        setSelectedHour(to12HourFormat(now.hour).hour);
        setPeriod(to12HourFormat(now.hour).period);
        setSelectedMinute(now.minute);
      } else {
        setError("");
      }
    }
  }, [selectedDate]);

  const handleHourClick = (hour) => {
    if (isTimeAllowed(hour, "AM") || isTimeAllowed(hour, "PM")) {
      setSelectedHour(hour);
      setError("");
    }
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
  };

  const handleTimeSelection = () => {
    const hour24 = to24HourFormat(selectedHour, period);
    const now = getCurrentTime();

    if (isToday(selectedDate) && hour24 < now.hour) {
      setError("Cannot select past time for today.");
      return;
    }

    const timeString24 = `${hour24.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    onChange?.(timeString24);
    setIsOpen(false);
  };

  const togglePeriod = (newPeriod) => {
    if (isTimeAllowed(selectedHour, newPeriod)) {
      setPeriod(newPeriod);
      setError("");
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
          className={`time-picker-number ${!isAllowed ? "time-picker-number-disabled" : ""}`}
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

  return (
    <div className="time-picker-container">
      <div onClick={() => setIsOpen(true)} className="time-picker-button">
        <span>{`${selectedHour}:${selectedMinute.toString().padStart(2, "0")} ${period}`}</span>
      </div>
      {error && <div className="time-picker-error">{error}</div>}
      {isOpen && (
        <div className="time-picker-overlay">
          <div className="time-picker-modal">
            <div className="time-picker-header">
              <span className="time-picker-time">{`${selectedHour}:${selectedMinute
                .toString()
                .padStart(2, "0")}`}</span>
              <div className="time-picker-period-container">
                <div
                  onClick={() => togglePeriod("AM")}
                  className={`time-picker-period-btn ${period === "AM" ? "time-picker-period-selected" : ""}`}
                >
                  AM
                </div>
                <div
                  onClick={() => togglePeriod("PM")}
                  className={`time-picker-period-btn ${period === "PM" ? "time-picker-period-selected" : ""}`}
                >
                  PM
                </div>
              </div>
            </div>
            <svg width="200" height="200" className="time-picker-clock">
              <circle cx={center.x} cy={center.y} r={radius} className="time-picker-clock-face" />
              <line x1={center.x} y1={center.y} x2={handX} y2={handY} className="time-picker-hand" />
              {renderNumbers()}
            </svg>
            <div className="time-picker-actions">
              <div onClick={() => setIsOpen(false)} className="time-picker-cancel-btn">
                Cancel
              </div>
              <div onClick={handleTimeSelection} className="time-picker-ok-btn">
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
