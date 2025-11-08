import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'Sep', Sales: 2800, Revenue: 2400 },
  { name: 'Oct', Sales: 2000, Revenue: 1398 },
  { name: 'Nov', Sales: 3800, Revenue: 3200 },
  { name: 'Dec', Sales: 3100, Revenue: 2900 },
  { name: 'Jan', Sales: 3490, Revenue: 4300 },
  { name: 'Feb', Sales: 2800, Revenue: 2100 },
  { name: 'Mar', Sales: 4300, Revenue: 2900 },
  { name: 'Apr', Sales: 3800, Revenue: 4200 },
  { name: 'May', Sales: 4100, Revenue: 3800 },
  { name: 'Jun', Sales: 3900, Revenue: 3500 },
  { name: 'Jul', Sales: 4200, Revenue: 3100 },
  { name: 'Aug', Sales: 3800, Revenue: 3400 },
];

export default function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Revenue"
          stroke="#8884d8"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Sales"
          stroke="#82ca9d"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}