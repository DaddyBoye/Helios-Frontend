import React from "react";

interface RoundProgressProps {
  progress: number; // Current progress value
  total: number; // Total value
}

const RoundProgress: React.FC<RoundProgressProps> = ({ progress, total }) => {
  const radius = 35; // Radius of the arc
  const strokeWidth = 10; // Thickness of the arc
  const circumference = 2 * Math.PI * radius;
  const cutOff = circumference * 0.2; // 25% of the circle is cut off
  const arcLength = circumference - cutOff;
  const progressLength = (progress / total) * arcLength; // Length of the progress arc

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" className="absolute">
        {/* Background Arc (Static) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#194564" // Dark blue for the background
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arcLength} ${circumference}`} // Cut off the bottom 25%
          strokeDashoffset={cutOff / 2} // Center the cut-off
          transform="rotate(145 60 60)" // Rotate to align the cut-off at the bottom
        />
        {/* Foreground Arc (Dynamic) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#62B41A" // Green for progress
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progressLength} ${circumference}`} // Match progress
          strokeDashoffset={cutOff / 2} // Center the cut-off
          transform="rotate(145 60 60)" // Rotate to align the cut-off at the bottom
          strokeLinecap="round" // Smooth rounded edges
        />
      </svg>

      {/* Center Text */}
      <div className="absolute text-center">
        <p className="text-lg font-bold">CO₂</p>
        <p className="text-xs font-semibold text-gray-400">{progress}kg</p>
      </div>
    </div>
  );
};

export default RoundProgress;
