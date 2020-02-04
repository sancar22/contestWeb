import React, { useEffect, useState } from "react";

function Timer(props) {
  const [timer, setTimer] = useState(0);
  let toHHMMSS = secs => {
    let sec_num = parseInt(secs, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let b = props.date;
      let a = new Date();
      setTimer(Math.round((a - b) / 1000));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>Tiempo activo: {toHHMMSS(timer)}</div>;
}

export default Timer;
