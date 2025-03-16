'use client'
import React, { useState, useRef } from "react";

const ImageAnalysis = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setError(null);
      setResult(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError(null);
      setResult(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please drop a valid image file");
    }
  };

  const handleAnalyzeClick = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      // Simulate ML model analysis with a fake API call
      // In a real app, you would replace this with your actual ML API call
      const formData = new FormData();
      formData.append("image", image);

      // Simulating API call with setTimeout
      setTimeout(() => {
        // 80% chance of success for demo purposes
        if (Math.random() > 0.2) {
          setResult({
            confidence: Math.round(Math.random() * 100),
            prediction: ["Cat", "Dog", "Bird"][Math.floor(Math.random() * 3)],
            timestamp: new Date().toISOString(),
          });
        } else {
          setError("Analysis failed. Please try again.");
        }
        setAnalyzing(false);
      }, 2000);

      // Real API call would look something like this:
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      // setResult(data);
    } catch (err) {
      setError("An error occurred during analysis");
      setAnalyzing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          ML Image Analysis
        </h1>

        {/* Upload section */}
        <div
          className="border-2 border-dashed border-indigo-300 rounded-lg p-6 mb-6 text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="flex flex-col items-center cursor-pointer">
            <svg
              className="w-12 h-12 text-indigo-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-gray-500">
              Drag & drop an image here or click to browse
            </p>
          </div>
        </div>

        {/* Preview section */}
        {imagePreview && (
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
            <div className="w-full max-w-md h-48 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              onClick={handleAnalyzeClick}
              disabled={analyzing || !image}
            >
              {analyzing ? "Analyzing..." : "Analyze Image"}
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results section */}
        {result && (
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-green-800">
              Analysis Results
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Prediction:</div>
              <div>{result.prediction}</div>
              <div className="font-medium">Confidence:</div>
              <div>{result.confidence}%</div>
              <div className="font-medium">Timestamp:</div>
              <div>{new Date(result.timestamp).toLocaleString()}</div>
            </div>
          </div>
        )}

        {/* No result message */}
        {analyzing === false && !result && !error && image && (
          <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
            No result available
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalysis;
