"use client";

import React, { useState, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { predefinedHtml } from "@/predefinedhtml";

export default function HTMLPreviewApp() {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [previewHtml, setPreviewHtml] = useState<string>("");

  const handlePreview = (): void => {
    setPreviewHtml(htmlCode);
  };

  const handlePasteHtml = (): void => {
    setHtmlCode(predefinedHtml);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setHtmlCode(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <div className="w-full max-w-3xl p-6 rounded-2xl shadow-xl bg-gradient-to-r from-white via-gray-100 to-gray-200">
        <h1 className="text-3xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
          HTML Previewer
        </h1>
        <p className="text-lg text-center text-gray-700 mb-6">
          Enter your HTML code below and see the preview instantly.
        </p>
        <div className="grid gap-6">
          <Textarea
            value={htmlCode}
            onChange={handleChange}
            placeholder="Enter your HTML code here..."
            className="p-4 rounded-xl border-2 border-gray-300 bg-white text-black shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={8}
          />
          <div className="flex justify-center gap-4">
            <Button
              onClick={handlePreview}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl transition-transform transform hover:scale-105"
            >
              Generate Preview
            </Button>
            <Button
              onClick={handlePasteHtml}
              className="px-6 py-3 bg-green-600 text-white rounded-xl transition-transform transform hover:scale-105"
            >
              Paste HTML
            </Button>
          </div>
          <div className="p-6 rounded-xl border-2 border-gray-300 bg-black shadow-xl overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      </div>
    </div>
  );
}
