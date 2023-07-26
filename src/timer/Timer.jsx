import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./timer.css";
export const Timer = () => {
  const [stop, setStop] = useState(false);
  const [[h, m, s], setTime] = useState([12, 2, 40]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      hh: 0,
      mm: 0,
      ss: 0,
    },
  });

  const tick = () => {
    if (stop) return;

    if (h === 0 && m === 0 && s === 0) {
      setStop(true);
    } else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s === 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const newTimer = (data) => {
    setTime(Object.values(data));
    return;
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <main className="main__container">
      <h1>Таймер</h1>
      <div className="timer__container">
        <div className="counter">
          <div className="hours">{h}ч</div>
          <span>{m}м</span>
          <span>{s}с</span>
        </div>
        <form className="form" onSubmit={handleSubmit(newTimer)}>
          <div className="form__row">
            <input
              name="h"
              type="number"
              min="0"
              max="59"
              {...register("hh")}
            />
            <input
              name="m"
              type="number"
              min="0"
              max="59"
              {...register("mm")}
            />
            <input
              name="s"
              type="number"
              min="0"
              max="59"
              {...register("ss")}
            />
          </div>
          <div>
            <button type="submit">Задать</button>
          </div>
        </form>
      </div>
    </main>
  );
};
