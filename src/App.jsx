import React, { useState, useEffect } from "react";

import { Button } from '@chakra-ui/react'

import './App.css'

const App = () => {
  const [time, setTime] = useState(1500); // 1500 segundos = 25 minutos
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(437);


  const calculateProgress = () => {
    const totalSeconds = 1500; // 25 minutos en segundos
    const remainingSeconds = time;
    const calculatedProgress = ((totalSeconds - remainingSeconds) / totalSeconds) * 437; // Usamos 314 como la circunferencia total (2 * PI * radio = 2 * 3.14 * 50)
    setProgress(calculatedProgress);
  };

  useEffect(() => {
    calculateProgress();

    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    if (!isActive) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    calculateProgress();
  }, [time]);



  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(1500);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div className="container" >
      <h1>Pomodoro tracker</h1>
      <div className="timer">
        <svg className="circle">
          <circle r="70" cx="72" cy="72" style={{ strokeDashoffset: progress }}></circle>
        </svg>
        <span>{formatTime(time)}</span>
      </div>
      <div className="buttons">
        {!isActive && <Button onClick={startTimer} className="start">Start</Button>}
        {isActive && <Button onClick={pauseTimer} className="pause">Pause</Button>}
        <Button onClick={resetTimer} className="reset">Reset</Button>
      </div>
    </div>
  );
};

export default App;