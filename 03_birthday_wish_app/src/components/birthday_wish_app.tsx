"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaBirthdayCake, FaGift, FaHeart, FaFireAlt } from "react-icons/fa";
import { GiBalloons, GiPartyPopper } from "react-icons/gi";
import dynamic from "next/dynamic";

const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const colorPalette = {
  background: "from-[#FFE5B4] via-[#FFCC99] to-[#FFA07A]",
  cardBackground: "from-white to-[#F0F0F0]",
  header: "from-[#FF6B6B] to-[#FF4E4E]",
  candles: [
    "from-pink-400 to-pink-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-orange-400 to-orange-600",
  ],
  confettiColors: [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
  ],
};

export default function BirthdayWish() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [candleLit, setCandleLit] = useState<number>(0);
  const [ballonPop, setBallonPop] = useState<number>(0);
  const [celebrate, setCelebrate] = useState<boolean>(false);

  const totalCandles: number = 5;
  const totalBallons: number = 5;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
      handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (candleLit === totalCandles && ballonPop === totalBallons) {
      setShowConfetti(true);
    }
  }, [ballonPop, candleLit]);

  const lightTheCandle = (candle: number) => {
    if (candle === candleLit) {
      setCandleLit((prev) => prev + 1);
    } else {
      alert("Light candles in order from left to right!");
    }
  };

  const popTheBallon = (ballon: number) => {
    if (ballon === ballonPop) {
      setBallonPop((prev) => prev + 1);
    } else {
      alert("Pop balloons in order from left to right!");
    }
  };

  const celebrating = () => {
    setCelebrate(true);
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCandleLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${colorPalette.background} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto overflow-hidden shadow-2xl border-4 border-white rounded-2xl bg-gradient-to-br hover:scale-[1.02] transition-transform duration-300">
          {/* Header with dynamic animation */}
          <CardHeader
            className={`bg-gradient-to-r ${colorPalette.header} text-center py-6`}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <CardTitle className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                Happy 21st Birthday!
              </CardTitle>
              <CardDescription className="text-2xl md:text-3xl font-semibold text-pink-100 flex items-center justify-center space-x-2">
                <FaHeart className="text-white animate-pulse mr-2" />
                Shiraz Ali
                <FaHeart className="text-white animate-pulse ml-2" />
              </CardDescription>
            </motion.div>
            <p className="text-lg md:text-xl text-pink-200 mt-2">
              19th October
            </p>
          </CardHeader>

          {/* Interactive Content */}
          <CardContent className="space-y-6 p-4 md:p-6 bg-white">
            {/* Candles Section */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <FaFireAlt className="mr-2 text-orange-500" />
                Light the Candles
              </h3>
              <div className="flex justify-center space-x-2 md:space-x-3">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrate && index <= candleLit) ||
                    (!celebrate && index < candleLit) ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: celebrate ? index * 0.5 : 0,
                        }}
                      >
                        <FaBirthdayCake
                          className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${
                            colorPalette.candles[
                              index % colorPalette.candles.length
                            ]
                          } text-white p-1.5 md:p-2 rounded-full shadow-lg transform transition-all hover:scale-110`}
                          onClick={() => lightTheCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-8 h-8 md:w-10 md:h-10 text-gray-300 transform transition-all hover:scale-110"
                        onClick={() => lightTheCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>

            {/* Balloons Section */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <GiBalloons className="mr-2 text-blue-500" />
                Pop the Balloons
              </h3>
              <div className="flex justify-center space-x-2 md:space-x-3">
                {[...Array(totalBallons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < ballonPop ? 0 : 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <GiBalloons
                      className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${
                        colorPalette.candles[
                          index % colorPalette.candles.length
                        ]
                      } text-white p-1.5 md:p-2 rounded-full shadow-lg transform transition-all hover:scale-110 cursor-pointer`}
                      onClick={() => popTheBallon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Celebration Button */}
          <CardFooter className="bg-gray-100 p-4 md:p-6 flex justify-center">
            <Button
              className="w-full max-w-xs bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={celebrating}
              disabled={celebrate}
            >
              <GiPartyPopper className="mr-2" />
              Celebrate Now!
              <FaGift className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Confetti Component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={colorPalette.confettiColors}
        />
      )}
    </div>
  );
}
