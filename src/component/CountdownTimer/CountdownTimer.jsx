import React, { useEffect, useState } from "react";

const CountdownTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Update `timeLeft` whenever `duration` changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    // Stop the timer if timeLeft is already zero or less
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Prevent negative values
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [timeLeft]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>{timeLeft > 0 ? <h1>{formatTime(timeLeft)}</h1> : <h1>00:00</h1>}</div>
  );
};

export default CountdownTimer;
