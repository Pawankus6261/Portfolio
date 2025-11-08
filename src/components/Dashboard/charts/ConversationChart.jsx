import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'S', value: 300 },
  { name: 'M', value: 400 },
  { name: 'T', value: 500 },
  { name: 'W', value: 450 },
  { name: 'T', value: 350 },
  { name: 'F', value: 200 },
  { name: 'S', value: 300 },
];

const RoundedBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <rect x={x} y={y} width={width} height={height} rx={5} ry={5} fill={fill} />;
};

// FIX: Renamed component to ConversationChart
export default function ConversationChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#9ca3af" />
        <YAxis axisLine={false} tickLine={false} stroke="#9ca3af" />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar 
          dataKey="value" 
          fill="#3B82F6" 
          shape={<RoundedBar />} 
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}