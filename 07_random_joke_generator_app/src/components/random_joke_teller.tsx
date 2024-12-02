"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, RefreshCcw, Moon, Sun } from "lucide-react";

// TypeScript interface for joke structure
interface Joke {
  setup: string;
  punchline: string;
}

export const RandomJokeTeller = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const DarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fetch joke from API
  const getJoke = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data: Joke = await response.json();
      setJoke(`😂 ${data.setup} - 🤣 ${data.punchline}`);
    } catch (error) {
      console.error(error);
      setError("Oops! Couldn't fetch a joke. 😢 Is your internet working?");
      setJoke(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial joke fetch on component mount
  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div
      className={`
        flex items-center justify-center min-h-screen p-4 
        transition-colors duration-1000 ease-in-out
        ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
            : "bg-gradient-to-br from-gray-100 via-gray-200 to-white text-black"
        }
      `}
    >
      <div
        className="
          w-full max-w-md 
          transform transition-transform duration-300 
          hover:scale-[1.02]"
      >
        <Card
          className={`
            shadow-xl transition-all duration-1000 ease-in-out
            ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={DarkMode}
            className="m-2 absolute top-0 right-0 z-10"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <CardHeader>
            <CardTitle
              className={`
                text-2xl font-bold text-center tracking-tight
                transition-colors duration-1000 ease-in-out
                ${darkMode ? "text-yellow-400" : "text-yellow-600"}
              `}
            >
              🤡 Random Joke Teller 🤡
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p
                  className={`
                    text-sm 
                    transition-colors duration-1000 ease-in-out
                    ${darkMode ? "text-gray-300" : "text-gray-500"}
                  `}
                >
                  Fetching a hilarious joke... 🤔
                </p>
              </div>
            ) : error ? (
              <div className="font-semibold text-center space-y-2">
                <p
                  className={`
                    text-lg font-semibold 
                    transition-colors duration-1000 ease-in-out
                    ${darkMode ? "text-red-400" : "text-red-500"}
                  `}
                >
                  🤷‍♂️ Joke Retrieval Error
                </p>
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              <p
                key={joke}
                className={`
                  text-center text-lg font-medium italic 
                  transition-all duration-500 animate-fade-in
                  ${darkMode ? "text-gray-200" : "text-gray-800"}
                `}
              >
                {joke}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button onClick={getJoke} disabled={isLoading} className="group">
              <RefreshCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              Get Another Joke 😂
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RandomJokeTeller;
