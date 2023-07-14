import React, { useState, useEffect, useRef } from "react";

import { Button } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

import './App.css'

import soundFile from '/alarm-sound.mp3';

const App = () => {
  const [time, setTime] = useState(1500); // 1500 segundos = 25 minutos
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(437);
  const audioRef = useRef(null);
  const [isBreak, setIsBreak] = useState(false);


  const calculateProgress = () => {
    const totalSeconds = isBreak ? 300 : 1500;
    const remainingSeconds = time;
    const calculatedProgress = ((totalSeconds - remainingSeconds) / totalSeconds) * 437; // Usamos 437 como la circunferencia total (2 * PI * radio = 2 * 4.37 * 50)
    setProgress(calculatedProgress);
  };

  const playSound = () => {
    audioRef.current.play();
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    if (!isActive) {
      clearInterval(interval);
    }

    if (time === 0) {
      playSound();
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
    stopSound();
  };

  const startBreak = () => {
    setIsActive(true);
    setTime(300);
    setIsBreak(true);
  };


  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };


  return (
    <div className="container" >
      {/* <h1>Pomodoro tracker</h1> */}
      <Heading color={"white"} as='h3' size='lg'>
        Pomodoro tracker
      </Heading>
      <div className="timer">
        <svg className="circle">
          <circle r="70" cx="72" cy="72" style={{ strokeDashoffset: progress }}></circle>
        </svg>
        <span>{formatTime(time)}</span>
      </div>
      <div className="buttons">
        {!isActive && <Button variant={"ghost"} color={"green"} onClick={startTimer} className="start">Start</Button>}
        {isActive && <Button variant={"ghost"} color={"green"} onClick={pauseTimer} className="pause">Pause</Button>}
        <Button variant={"ghost"} color={"teal"} onClick={startBreak}>Break Time</Button>
        <Button variant={"ghost"} color={"red"} onClick={resetTimer} className="reset">Reset</Button>
      </div>
      <audio style={{ display: 'none' }} ref={audioRef}>
        <source src={soundFile} type="audio/mpeg" />
        Tu navegador no admite la reproducción de sonidos.
      </audio>
    </div>
  );
};

export default App;