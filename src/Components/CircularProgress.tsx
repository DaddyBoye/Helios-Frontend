import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface RoundProgressProps {
  progress: number;
  total: number;
}

const RoundProgress: React.FC<RoundProgressProps> = ({ progress, total }) => {
  const [progressValue, setProgressValue] = useState(50);
  const radius = 45;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const cutOff = circumference * 0.2;
  const arcLength = circumference - cutOff;

  const getStatus = (value: number) => {
    const percentage = (value / total) * 100;
    if (percentage <= 25) return { text: "Great", color: "text-green-500" };
    if (percentage <= 50) return { text: "Good", color: "text-blue-500" };
    if (percentage <= 75) return { text: "Warning", color: "text-yellow-500" };
    return { text: "Critical", color: "text-red-500" };
  };

  const getTrend = (value: number) => {
    if (value < total * 0.4) return { icon: TrendingDown, color: "text-green-500" };
    if (value > total * 0.6) return { icon: TrendingUp, color: "text-red-500" };
    return { icon: Minus, color: "text-blue-500" };
  };

  useEffect(() => {
    setProgressValue(50);
    const timer = setTimeout(() => {
      setProgressValue(progress);
    }, 1000);
    return () => clearTimeout(timer);
  }, [progress]);

  const progressLength = (progressValue / total) * arcLength;
  const status = getStatus(progressValue);
  const trend = getTrend(progressValue);
  const TrendIcon = trend.icon;

  return (
    <div className="flex -ml-3 -mt-3 items-center justify-center relative" style={{ width: '110px', height: '110px' }}>
      <svg width="110" height="110">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0.9 }} />
          </linearGradient>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.15 }} />
          </linearGradient>
        </defs>
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="url(#bgGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={cutOff / 2}
          transform="rotate(145 55 55)"
          strokeLinecap="round"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progressLength} ${circumference}`}
          strokeDashoffset={cutOff / 2}
          transform="rotate(145 55 55)"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <p className={`text-sm font-bold ${status.color} transition-colors duration-300`}>
          {status.text}
        </p>
        <div className="flex items-center justify-center gap-1">
          <p className="text-sm font-semibold text-white">{progressValue}</p>
          <TrendIcon className={`w-4 h-4 ${trend.color}`} />
        </div>
        <p className="text-xs font-semibold text-white/70">ppm</p>
      </div>
    </div>
  );
};

export default RoundProgress;