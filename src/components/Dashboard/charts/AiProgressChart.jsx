import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const data = [{ name: 'Training', value: 82 }]; // 82%

// FIX: Renamed component to AiProgressChart
export default function AiProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="value"
          fill="#3B82F6"
          cornerRadius={10}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl font-bold fill-gray-900"
        >
          82%
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm fill-gray-500"
        >
          AI Trained
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}