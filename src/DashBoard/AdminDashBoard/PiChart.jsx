import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Colors for the pie chart
const COLORS = [
  '#1D4ED8', // Blue (Accepted)
  '#16A34A', // Green (Pending)
  '#EF4444', // Red (Rejected)
  '#F59E0B', // Amber (Users)
  '#10B981', // Teal (Reviews)
];

// Custom label rendering
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PiChart = ({ statistic }) => {
  // Extract data from the provided statistic, adjust for lowercase 'pending'
  const data = [
    { name: 'Accepted Products', value: statistic?.products?.Accepted || 0 },
    { name: 'Pending Products', value: statistic?.products?.pending || 0 }, // Fixed lowercase 'pending'
    { name: 'Rejected Products', value: statistic?.products?.Rejected || 0 },
    { name: 'Users', value: statistic?.users || 0 },
    { name: 'Reviews', value: statistic?.reviews || 0 },
  ];

  // Total value for calculating percentages
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="w-full h-[450px] glassy-bg shadow-lg p-6 mb-6 rounded-lg">
        <div className="flex justify-between mt-6 text-gray-600">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-sm">{entry.name}</span>
            <span className="text-sm font-semibold">{` ${(entry.value / totalValue * 100).toFixed(1)}%`}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend and percentage display */}
    
    </div>
  );
};

export default PiChart;
