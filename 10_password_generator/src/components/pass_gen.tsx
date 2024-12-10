"use client";
import { useState, useEffect, useCallback, useRef } from "react";

export default function PassGen() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(8);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [symbolAllowed, setSymbolAllowed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const passRef = useRef(null);

  const handlePassword = useCallback(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) char += "0123456789";
    if (symbolAllowed) char += "!@#$%^&*()_+[]{}|;:,.<>?";
    for (let i = 0; i < length; i++) {
      const generatepassword = char[Math.floor(Math.random() * char.length)];
      pass += generatepassword;
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  const copyToClipBoard = useCallback(() => {
    try {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [password]);

  useEffect(() => {
    handlePassword();
  }, [handlePassword]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-[800px] bg-white shadow-2xl rounded-xl p-8 transition-all duration-300 hover:scale-105">
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            🔐 Password Generator
          </h1>
        </div>

        <div className="relative mb-4">
          <input
            className="px-6 py-4 border-2 w-full rounded-lg text-lg tracking-wider bg-gray-100 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            type="text"
            value={password}
            ref={passRef}
            readOnly
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
            {password.length > 0 ? "🎲" : ""}
          </span>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            onClick={handlePassword}
          >
            🔄 Regenerate
          </button>

          <button
            onClick={copyToClipBoard}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
              copied
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 flex items-center">
              📏 Length: {length}
            </label>
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="numberCheckbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="numberCheckbox"
              className="text-gray-700 flex items-center"
            >
              🔢 Numbers Allowed
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              id="symbolCheckbox"
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed((prev) => !prev)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="symbolCheckbox"
              className="text-gray-700 flex items-center"
            >
              🔣 Symbols Allowed
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
