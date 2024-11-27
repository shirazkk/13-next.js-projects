"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, RefreshCcw } from "lucide-react"; // Importing the necessary icons

import { useState, useEffect, ChangeEvent, useRef } from "react";

const Countdown_Timer = () => {
  const [duration, setduration] = useState<string | number>("");
  const [timer, setTimer] = useState<number>(0);
  const [IsActive, setIsActive] = useState<boolean>(false);
  const [IsPaused, setIsPaused] = useState<boolean>(false);
  const TimeRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = () => {
    if (typeof duration === "number" && duration > 0) {
      setTimer(duration);
      setIsActive(false);
      setIsPaused(false);
      if (TimeRef.current) {
        clearInterval(TimeRef.current);
      }
    }
  };

  const handleStart = () => {
    if (timer > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
    if (TimeRef.current) {
      clearInterval(TimeRef.current);
    }
  };

  const handlePause = () => {
    if (IsActive) {
      setIsPaused(true);
      setIsActive(false);
      if (TimeRef.current) {
        clearInterval(TimeRef.current);
      }
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimer(typeof duration === "number" ? duration : 0);
    if (TimeRef.current) {
      clearInterval(TimeRef.current);
    }
  };

  useEffect(() => {
    if (IsActive && !IsPaused) {
      TimeRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(TimeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (TimeRef.current) {
        clearInterval(TimeRef.current);
      }
    };
  }, [IsActive, IsPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setduration(Number(e.target.value || ""));
  };

  return (
    <div className="px-5 flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 transition-all duration-500 ease-in-out">
      {/* Timer box container */}
      <div className="bg-gradient-to-t from-gray-800 to-gray-900 shadow-lg rounded-lg py-8 px-4 sm:px-8 w-full max-w-lg transform transition-all duration-500 ease-in-out">
        {/* Title of the countdown timer */}
        <div className="text-2xl sm:text-3xl flex justify-evenly sm:justify-center gap-3 items-center  font-semibold mb-6 text-white tracking-wide">
          <Clock size={36} color="#4F46E5" className="animate-spin-slow" />
          <h1 className="text-center">Countdown Timer</h1>
        </div>
        {/* Input and set button container */}
        <div className="flex flex-col sm:flex-row  gap-3 items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="placeholder:text-white placeholder:font-semibold flex-1  p-4 rounded-lg bg-gray-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-white bg-pink-500 hover:bg-pink-400 transition-all duration-300 ease-in-out py-2 px-6 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Clock size={20} /> SetTime
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-white mb-8 text-center animate-pulse">
          {formatTime(timer)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-white bg-green-500 hover:bg-green-400 py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <Play size={20} /> {IsPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-white bg-yellow-500 hover:bg-yellow-400 py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <Pause size={20} /> Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-white bg-red-500 hover:bg-red-400 py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <RefreshCcw size={20} /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Countdown_Timer;
