"use client";
import React from "react";
import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface BmiResult {
  bmi: string;
  category: string;
}

export const BMI_Calculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBMI] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const calculateBMI = () => {
    setError("");

    if (!height || !weight) {
      setError("Please enter both height and weight");
      return;
    }

    const heightInMetres = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (heightInMetres <= 0) {
      setError("Height must be greater than zero");
      return;
    }

    if (weightInKg <= 0) {
      setError("Weight must be greater than zero");
      return;
    }

    const bmiValue = weightInKg / (heightInMetres * heightInMetres);
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setBMI({ bmi: bmiValue.toFixed(1), category });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-600";
      case "Normal":
        return "text-green-600";
      case "Overweight":
        return "text-yellow-600";
      case "Obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center bg-blue-50 py-6">
          <CardTitle className="text-2xl font-bold text-blue-800">
            BMI Calculator
          </CardTitle>
          <CardDescription className="text-gray-600">
            Calculate your Body Mass Index
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Height (cm)
            </Label>
            <Input
              type="number"
              value={height}
              onChange={handleHeightChange}
              placeholder="Enter your height"
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Weight (kg)
            </Label>
            <Input
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder="Enter your weight"
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            onClick={calculateBMI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Calculate BMI
          </Button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-6">
          {bmi && (
            <div className="w-full text-center">
              <p className="text-lg font-semibold">
                BMI: <span className="text-blue-700">{bmi.bmi}</span>
              </p>
              <p className={`font-bold ${getCategoryColor(bmi.category)}`}>
                Category: {bmi.category}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BMI_Calculator;
