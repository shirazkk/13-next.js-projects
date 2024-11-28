"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gamepad2, RefreshCw, Pause, Play, X } from "lucide-react";

export default function NumberGuessingGame() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuessed, setUserGuessed] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setPaused(false);
    setUserGuessed("");
    setAttempts(0);
  };

  const handlePaused = () => {
    setPaused(true);
  };

  const handleResume = () => {
    setPaused(false);
  };

  const handleGuess = () => {
    if (userGuessed !== "" && typeof userGuessed === "number") {
      if (userGuessed === targetNumber) {
        setGameOver(true);
      } else if (attempts >= 4) {
        setGameOver(true);
      } else {
        setAttempts(attempts + 1);
      }
    }
  };

  const handleTryAgain = () => {
    setGameStarted(true);
    setGameOver(false);
    setUserGuessed("");
    setAttempts(0);
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
  };

  const handleExit = () => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuessed("");
    setAttempts(0);
  };

  const handleUserGuessedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setUserGuessed(isNaN(value) ? "" : value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 125,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Sparkle Effect */}
        <motion.div
          variants={sparkleVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-4 right-4 w-6 h-6 bg-yellow-300 rounded-full opacity-0"
        />
        <motion.div
          variants={sparkleVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-4 left-4 w-4 h-4 bg-white rounded-full opacity-0"
        />

        {/* Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-30 -z-10"></div>

        {/* Game Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
        >
          Number Guessing Game
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-white/80 mb-6 text-lg"
        >
          <p> Try to guess the number between 1 and 10</p>
          <p>You have only 5 attempts!</p>
        </motion.p>

        <AnimatePresence mode="wait">
          {/* Start Game State */}
          {!gameStarted && (
            <motion.div
              key="start-game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleStartGame}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Gamepad2 className="mr-2" /> Start Game
              </Button>
            </motion.div>
          )}

          {/* Game Active State */}
          {gameStarted && !gameOver && (
            <motion.div
              key="game-active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Pause/Resume Button */}
              <div className="flex justify-center mb-6">
                {paused ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleResume}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
                    >
                      <Play className="mr-2" /> Resume
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handlePaused}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
                    >
                      <Pause className="mr-2" /> Pause
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Input and Guess Section */}
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full max-w-xs"
                >
                  <Input
                    type="number"
                    value={userGuessed}
                    onChange={handleUserGuessedChange}
                    disabled={paused}
                    placeholder="Enter your guess"
                    min={1}
                    max={10}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:font-semibold placeholder:text-slate-700/70 focus:ring-2 focus:ring-purple-500 rounded-full py-3 px-4 w-full text-center"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleGuess}
                    disabled={paused}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                  >
                    Guess
                  </Button>
                </motion.div>

                {/* Attempts Counter */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/80 font-medium"
                >
                  Attempts: {attempts + 1} / 5
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Game Over State */}
          {gameOver && (
            <motion.div
              key="game-over"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
              >
                {userGuessed === targetNumber
                  ? "Congratulations!"
                  : "Game Over!"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-6"
              >
                {userGuessed === targetNumber
                  ? "You guessed the number!"
                  : `The correct number was ${targetNumber}.`}
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* try-again & exit-button */}
                <div className="flex gap-4 flex-wrap justify-center items-center">
                  <Button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="mr-2" /> Try Again
                  </Button>

                  <Button
                    onClick={handleExit}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2"
                  >
                    <X className="mr-2" /> Exit
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
