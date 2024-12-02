"use client";
import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Palette, Check } from "lucide-react";

export const ColorPicker = () => {
  const [color, setColor] = useState<string>("#000000");
  const [copied, setCopied] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertHexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-200">
            <Palette className="w-7 h-7 text-blue-500" />
            Color Explorer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="w-full h-56 rounded-xl mb-5 shadow-md transition-all duration-300 hover:scale-[1.01] flex items-center justify-center"
            style={{
              backgroundColor: color,
              color: getContrastColor(color),
            }}
          >
            <span className="text-2xl font-bold tracking-wider opacity-80">
              {color}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                HEX
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {color}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                RGB
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {convertHexToRGB(color)}
              </p>
            </div>
          </div>

          <div className="flex space-x-3 justify-between items-center">
            <Input
              type="color"
              value={color}
              onChange={handleOnChange}
              className="flex-grow appearance-none rounded-lg h-12 cursor-pointer"
            ></Input>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="w-[50%] h-12 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
            >
              {copied ? (
                <>
                  <p className="text-sm font-semibold text-green-600">Copied</p>
                  <Check className="w-5 h-5 text-green-500" />
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-blue-600">Copy</p>
                  <Copy className="w-5 h-5 text-blue-600" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;
