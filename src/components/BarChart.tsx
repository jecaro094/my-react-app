import React, {useState, useEffect, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Dropdown } from './Dropdown';
import { get_url } from '../utils/utils';

interface BarChartProps {
  // data: number[] | null;
}


var p: number[];


const dropdownOptions = ['London', 'Seville', 'Malaga', 'Madrid', 'Barcelona'];

const BarChart: React.FC<BarChartProps> = ({  }) => {
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('');
  const [data={}, setData] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  var url= get_url(selectedDropdownValue)

  useEffect(() => {
    const fetchData = async (p: number[]) => {
      try {
        const response = await fetch(url, {mode: 'cors', method: "GET"});
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('main: ',result.main)
        setData(result.main);
      } catch (err) {
      }
    };

    fetchData(p);
  }, [selectedDropdownValue]);

    // console.log(`Data: ${data}`)

   if (data === null) {
      // Handle the case where data is null, e.g., show a loading indicator or an error message
      return <div>Loading...</div>;
    }
    var chartData = {
      labels: Object.entries(data).map(([key, value], index) => `${key}`),
      // labels: data.map((_, index) => `Label ${index + 1}`),
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

  const handleDropdownSelect = (value: string) => {
    setSelectedDropdownValue(value);
    console.log('Dropdown value in BARCHART: ', selectedDropdownValue);
  };
  
  return (
  <div>
    <h1>React Dropdown Example</h1>
    <Dropdown options={dropdownOptions} onSelect={handleDropdownSelect} />
    <Bar data={chartData} options={chartOptions} />
  </div>
  );
};

export default BarChart;
