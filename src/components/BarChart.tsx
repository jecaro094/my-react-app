import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface BarChartProps {
  data: number[] | null;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    if (data === null) {
      // Handle the case where data is null, e.g., show a loading indicator or an error message
      return <div>Loading...</div>;
    }
    var chartData = {
      labels: data.map((_, index) => `Label ${index + 1}`),
      datasets: [
        {
          label: 'Chart Data',
          data: data,
          backgroundColor: 'rgb(167, 233, 226)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
  <Bar data={chartData} options={chartOptions} />
  );
};

export default BarChart;
