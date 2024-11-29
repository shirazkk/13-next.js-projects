"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  MinusIcon,
  XIcon,
  DivideIcon,
  DeleteIcon,
} from "lucide-react";

export default function Calculator() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleNumber1 = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber1(e.target.value);
    setError("");
  };

  const handleNumber2 = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber2(e.target.value);
    setError("");
  };

  const handleOperation = (operation: (a: number, b: number) => number) => {
    if (number1 && number2) {
      try {
        const res = operation(parseFloat(number1), parseFloat(number2));
        setResult(res.toString());
        setError("");
      } catch (error) {
        setError("Invalid Opeartion " + error);
      }
    } else {
      setError("Please enter both numbers");
    }
  };

  const add = () => {
    handleOperation((a, b) => a + b);
  };

  const subtract = () => {
    handleOperation((a, b) => a - b);
  };

  const multiply = () => {
    handleOperation((a, b) => a * b);
  };
  const divide = () => {
    if (number2 != "0") {
      handleOperation((a, b) => a / b);
    } else {
      setError("Cannot divide by zero");
    }
  };
  const clear = () => {
    setNumber1("");
    setNumber2("");
    setResult("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-xl border-none overflow-hidden transform transition-all hover:scale-105">
        <CardHeader className="bg-blue-500 text-white p-6">
          <CardTitle className="text-3xl font-bold">Calculator</CardTitle>
          <CardDescription className="text-blue-100">
            Simple and elegant calculation tool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="First Number"
              value={number1}
              onChange={handleNumber1}
              className="text-lg py-2 px-3 focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="number"
              placeholder="Second Number"
              value={number2}
              onChange={handleNumber2}
              className="text-lg py-2 px-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-full h-12 bg-blue-100 hover:bg-blue-200"
              onClick={add}
            >
              <PlusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-full h-12 bg-blue-100 hover:bg-blue-200"
              onClick={subtract}
            >
              <MinusIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-full h-12 bg-blue-100 hover:bg-blue-200"
              onClick={multiply}
            >
              <XIcon className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-full h-12 bg-blue-100 hover:bg-blue-200"
              onClick={divide}
            >
              <DivideIcon className="w-6 h-6 text-blue-600" />
            </Button>
          </div>

          <Input
            value={result}
            placeholder="Result"
            disabled
            className="text-xl font-bold text-center py-3 bg-gray-100 dark:bg-gray-700"
          />

          {error && (
            <div className="text-red-500 text-center font-semibold">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800 p-4">
          <Button variant="destructive" className="w-full" onClick={clear}>
            <DeleteIcon className="mr-2" /> Clear
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
