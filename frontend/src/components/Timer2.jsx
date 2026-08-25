import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer2({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;

  // Convert seconds to HH:MM:SS
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="w-24 h-24">
      <CircularProgressbar
        value={percentage}
        text={formattedTime}
        styles={buildStyles({
          textSize: "12px",
          pathColor:
            percentage > 50
              ? "#22c55e"
              : percentage > 20
              ? "#f59e0b"
              : "#ef4444",
          textColor: "#ffffff",
          trailColor: "#374151",
        })}
      />
    </div>
  );
}

export default Timer2;