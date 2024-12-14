"use client";

import { useState, ChangeEvent } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Conversion rates for various units categorized by length, weight, and volume
const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 1000000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 1609344,
  },
  weight: {
    "Grams (g)": 1,
    "Kilograms (kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },
  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Fluid Ounces (fl oz)": 29.5735,
    "Cups (cup)": 240,
    "Pints (pt)": 473.176,
    "Quarts (qt)": 946.353,
    "Gallons (gal)": 3785.41,
  },
};

// Unit types categorized by length, weight, and volume
const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  weight: ["Grams (g)", "Kilograms (kg)", "Ounces (oz)", "Pounds (lb)"],
  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Fluid Ounces (fl oz)",
    "Cups (cup)",
    "Pints (pt)",
    "Quarts (qt)",
    "Gallons (gal)",
  ],
};

export default function UnitConverter() {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleInputUnitChange = (value: string) => {
    setInputUnit(value);
  };
  const handleOutputUnitChange = (value: string) => {
    setOutputUnit(value);
  };

  const convertValue = () => {
    if (inputValue !== null && inputUnit && outputUnit) {
      let unitCatergory: string | null = null;
      setError(null);

      for (let category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCatergory = category;
          break;
        }
      }
      if (unitCatergory) {
        const baseValue =
          inputValue * conversionRates[unitCatergory][inputUnit];
        const result = baseValue / conversionRates[unitCatergory][outputUnit];
        setConvertedValue(result);
        setError(null);
      } else {
        setConvertedValue(null);
        setError("Invalid units selected. Please try again.");
      }
    } else {
      setConvertedValue(null);
      setError("Please fill all fields correctly.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-[400px] shadow-2xl border-none transform transition-all duration-300">
        {/* Header Section */}
        <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl py-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Unit Converter
          </CardTitle>
          <CardDescription className="text-sm text-blue-100">
            Seamlessly convert between different units.
          </CardDescription>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="space-y-4 p-6 bg-white">
          {/* From Unit */}
          <div className="space-y-2">
            <Label
              htmlFor="from-unit"
              className="block text-sm font-medium text-gray-700"
            >
              From:
            </Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger
                id="from-unit"
                className="w-full border-blue-300 focus:border-blue-500 transition-colors duration-200"
              >
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel className="text-gray-500">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem
                        key={unit}
                        value={unit}
                        className="hover:bg-blue-50 focus:bg-blue-100 transition-colors duration-150"
                      >
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Unit */}
          <div className="space-y-2">
            <Label
              htmlFor="to-unit"
              className="block text-sm font-medium text-gray-700"
            >
              To:
            </Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger
                id="to-unit"
                className="w-full border-blue-300 focus:border-blue-500 transition-colors duration-200"
              >
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel className="text-gray-500">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem
                        key={unit}
                        value={unit}
                        className="hover:bg-blue-50 focus:bg-blue-100 transition-colors duration-150"
                      >
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Value Input */}
          <div className="space-y-2">
            <Label
              htmlFor="value-input"
              className="block text-sm font-medium text-gray-700"
            >
              Value:
            </Label>
            <Input
              type="number"
              value={inputValue || ""}
              onChange={handleInputChange}
              placeholder="Enter value"
              className="w-full px-3 py-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Convert Button */}
          <Button
            onClick={convertValue}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md 
            hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform active:scale-[0.98]"
          >
            Convert
          </Button>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="text-center space-y-2 p-6 bg-gray-50 rounded-b-xl">
          {error && (
            <div className="mx-auto text-base text-red-500 animate-pulse">
              {error}
            </div>
          )}
          {convertedValue && (
            <div
              className="mx-auto space-y-2 transform transition-all duration-500 
              animate-fade-in"
            >
              <div className="text-5xl font-bold text-blue-600 animate-float">
                {convertedValue.toFixed(2)}
              </div>
              <div className="text-gray-500 text-sm animate-bounce-slow">
                {outputUnit}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
