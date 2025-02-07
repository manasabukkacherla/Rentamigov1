import React from 'react';

interface CircularChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  selectedIndex: number | null;
  onSegmentClick: (index: number) => void;
}

export function CircularChart({ data, size = 200, selectedIndex, onSegmentClick }: CircularChartProps) {
  // Add padding to prevent edge cutting
  const padding = size * 0.1; // 10% padding
  const totalSize = size + (padding * 2);
  const radius = size / 2;
  const strokeWidth = size * 0.1; // 10% of size for stroke width
  const normalizedRadius = radius - (strokeWidth / 2);
  const circumference = normalizedRadius * 2 * Math.PI;
  
  let startAngle = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        style={{ margin: -padding }}
      >
        <g transform={`translate(${totalSize/2}, ${totalSize/2})`}>
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference}`;
            const rotation = startAngle * 360;
            startAngle += percentage;

            const isSelected = selectedIndex === index;
            const scale = isSelected ? 1.05 : 1;
            const opacity = selectedIndex === null || isSelected ? 1 : 0.5;

            return (
              <g 
                key={index} 
                transform={`rotate(${rotation})`}
                onClick={() => onSegmentClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={normalizedRadius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={0}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center',
                    opacity,
                  }}
                  className="transition-all duration-300 ease-out hover:opacity-80"
                />
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {selectedIndex === null ? (
          <>
            <div className="text-2xl font-bold text-black">{total}</div>
            <div className="text-xs text-black/60">Total</div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-black">{data[selectedIndex].value}</div>
            <div className="text-xs text-black/60">{data[selectedIndex].label}</div>
          </>
        )}
      </div>
    </div>
  );
}