"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calculator, AlertTriangle } from "lucide-react";

export const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTippercentage] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBillChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (value > 1000000) {
      setError("Bill amount is too large");
      return;
    }

    setError(null);
    setBillAmount(value);
  };

  const handleTipPercentage = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (value > 100) {
      setError("Tip percentage cannot exceed 100%");
      return;
    }

    setError(null);
    setTippercentage(value);
  };

  const calculateTip = () => {
    setError(null);

    if (billAmount === null || tipPercentage === null) {
      setError("Please enter bill amount and tip percentage");
      return;
    }

    if (billAmount <= 0) {
      setError("Bill amount must be greater than zero");
      return;
    }

    if (tipPercentage < 0) {
      setError("Tip percentage cannot be negative");
      return;
    }

    const tip = billAmount * (tipPercentage / 100);

    if (tip > 1000000 || billAmount + tip > 1000000) {
      setError("Calculation results are too large");
      return;
    }

    setTipAmount(tip);
    setTotalAmount(billAmount + tip);
    setIsCalculated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-105">
        <CardHeader className="bg-blue-500 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="w-8 h-8" />
            Tip Calculator
          </CardTitle>
          <CardDescription className="text-blue-100">
            Enter the bill amount and tip percentage to calculate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {error && (
            <div className="flex items-center bg-red-50 border border-red-200 p-3 rounded-lg text-red-700">
              <AlertTriangle className="mr-2 w-5 h-5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bill-amount" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              Bill Amount
            </Label>
            <div className="relative">
              <Input
                id="bill-amount"
                className="p-3 border-2 border-blue-300 focus:border-blue-500 transition-colors duration-300 pl-10"
                placeholder="Enter bill amount"
                type="number"
                max="1000000"
                step="0.01"
                value={billAmount !== null ? billAmount : ""}
                onChange={handleBillChange}
              />
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tip-percentage" className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-500" />
              Tip Percentage
            </Label>
            <div className="relative">
              <Input
                id="tip-percentage"
                className="p-3 border-2 border-blue-300 focus:border-blue-500 transition-colors duration-300 pl-10"
                placeholder="Enter tip percentage"
                type="number"
                max="100"
                step="0.1"
                value={tipPercentage !== null ? tipPercentage : ""}
                onChange={handleTipPercentage}
              />
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            </div>
          </div>

          <Button
            onClick={calculateTip}
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 group"
          >
            <Calculator className="mr-2 w-5 h-5 group-hover:animate-spin" />
            Calculate Tip
          </Button>

          {isCalculated && !error && (
            <div className="mt-4 space-y-2 bg-blue-50 p-4 rounded-lg shadow-inner animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">Tip Amount:</span>
                <span className="text-blue-800 font-bold overflow-hidden text-ellipsis max-w-[200px] whitespace-nowrap">
                  ${tipAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">
                  Total Amount:
                </span>
                <span className="text-blue-800 font-bold overflow-hidden text-ellipsis max-w-[200px] whitespace-nowrap">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-blue-100 text-blue-700 p-4 rounded-b-xl text-center">
          Tip wisely, tip kindly!
        </CardFooter>
      </Card>
    </div>
  );
};

export default TipCalculator;
