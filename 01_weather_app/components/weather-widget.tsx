"use client";

import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CloudIcon,
  MapPinIcon,
  ThermometerIcon,
  Droplet,
  Wind,
  Sun,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
  humidity: string;
  windSpeed: string;
  uvIndex: string;
}

const API_KEY: string = "7d3357a71e36401099d75615242511";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("❗ Please enter a city name");
      setWeather(null);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${trimmedLocation}`
      );

      if (!response.ok) {
        throw new Error("🚫 City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
        unit: "C",
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        uvIndex: data.current.uv,
      };
      setWeather(weatherData);
    } catch (error) {
      setError("🌐 City not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) {
        return ` It's freezing at ${temperature}°C! Bundle up!`;
      } else if (temperature < 10) {
        return ` It's quite cold at ${temperature}°C. Wear warm clothes.`;
      } else if (temperature < 20) {
        return ` The temperature is ${temperature}°C. Comfortable for a light jacket.`;
      } else if (temperature < 30) {
        return ` It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
      } else {
        return ` It's hot at ${temperature}°C. Stay hydrated!`;
      }
    } else {
      return `${temperature}°${unit}`;
    }
  }

  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return " It's a beautiful sunny day!";
      case "partly cloudy":
        return " Expect some clouds and sunshine.";
      case "cloudy":
        return " It's cloudy today.";
      case "overcast":
        return " The sky is overcast.";
      case "rain":
        return " Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return " Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return " It's misty outside.";
      case "fog":
        return " Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    return ` ${location} ${isNight ? "🌃 at Night" : "🌞 During the Day"}`;
  }

  return (
    <div className="flex justify-center items-center h-screen px-3 sm:px-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/second_weather.mp4" type="video/mp4" />
      </video>

      <Card
        className="w-full max-w-xl mx-auto text-center border-black bg-black/50 backdrop-blur-lg rounded-lg shadow-md"
        id="mycolor"
      >
        <CardHeader>
          <CardTitle className="text-white">🌦️ Weather App</CardTitle>
          <CardDescription className="text-yellow-400 font-semibold">
            🌤️ Check the latest weather in your city and stay prepared! 🌧️
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Input
              type="text"
              placeholder="🌍 Enter a city name"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Button
              className="w-[60%] sm:w-[20%] bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "⏳ Loading..." : "🔍 Search"}
            </Button>
          </form>
          {error && (
            <div className="mt-4">
              <div className="text-red-500 text-base sm:text-xl">{error}</div>
              <div className="mt-4">
                <Image
                  src="/sad.webp"
                  alt="City Not Found"
                  width={200}
                  height={200}
                  className="mx-auto sm:w-[200px] w-[100px]"
                />
              </div>
            </div>
          )}
          {weather && (
            <div className="mt-4 grid gap-2 text-black">
              <div className="flex items-center gap-2">
                <div className="text-left flex items-center gap-2 font-semibold">
                  <ThermometerIcon className="w-6 h-6 text-blue-500" />
                  {getTemperatureMessage(weather.temperature, weather.unit)}
                </div>
              </div>
              <div className="text-left flex items-center gap-2 font-semibold">
                <CloudIcon className="w-6 h-6 text-gray-500" />
                <div>{getWeatherMessage(weather.description)}</div>
              </div>
              <div className="text-left flex items-center gap-2 font-semibold">
                <MapPinIcon className="w-6 h-6 text-red-500" />
                <div>{getLocationMessage(weather.location)}</div>
              </div>
              <div className="text-left flex items-center gap-2 font-semibold">
                <Droplet className="w-6 h-6 text-cyan-500" />
                <div>{weather.humidity}% Humidity</div>
              </div>
              <div className="text-left flex items-center gap-2 font-semibold">
                <Wind className="w-6 h-6 text-green-500" />
                <div> {weather.windSpeed} km/h Wind Speed</div>
              </div>
              <div className="text-left flex items-center gap-2 font-semibold">
                <Sun className="w-6 h-6 text-yellow-500" />
                <div> UV Index: {weather.uvIndex}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
