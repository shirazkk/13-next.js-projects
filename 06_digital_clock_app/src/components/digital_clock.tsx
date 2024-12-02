"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [is24Hours, setIs24Hours] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeKey, setTimeKey] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
      setTimeKey((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = useMemo<string>(() => {
    if (!mounted) return "";
    const hours = is24Hours
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hours, mounted]);

  const formatDate = useMemo(() => {
    return time.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [time]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 overflow-hidden">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in">
        <Card className="shadow-2xl border-2 border-blue-200/50 animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 animate-bounce-in">
              Digital Clock
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-blue-600 animate-fade-in-delay">
              {formatDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              key={timeKey}
              className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-blue-900 
                         bg-blue-100 p-4 sm:p-5 md:p-6 rounded-xl shadow-inner 
                         tracking-widest transition-all duration-500 
                         animate-time-flip"
            >
              {formatTime}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              variant={is24Hours ? "default" : "outline"}
              onClick={() => setIs24Hours(true)}
              className="w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hours ? "default" : "outline"}
              onClick={() => setIs24Hours(false)}
              className="w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95"
            >
              12-Hour Format
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
