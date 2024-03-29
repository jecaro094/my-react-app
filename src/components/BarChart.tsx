import React, {useState, useEffect, useContext} from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Dropdown } from './Dropdown';
import { get_url, DROPDOWN_OPTIONS } from '../utils/utils';


interface BarChartProps {
  // data: number[] | null;
}
var p: number[];


const BarChart: React.FC<BarChartProps> = ({  }) => {
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('');
  const [data={}, setData] = useState<number[] | null>(null);
  const [image='', setImage] = useState<string | undefined>(undefined);
  const [audio='', setAudio] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  var url = get_url(selectedDropdownValue)

  useEffect(() => {
    const fetchData = async (p: number[]) => {
      try {
        const response = await fetch(url, {mode: 'cors', method: "GET"});
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('stats: ',result.stats)
        setData(result.stats);
        setImage(result.sprite);
        setAudio(result.audio);
      } catch (err) {
      }
    };

    fetchData(p);
  }, [selectedDropdownValue]);

   if (data === null) {
      return <div>Loading...</div>;
    }
    var chartData = {
      labels: Object.entries(data).map(([key, value], index) => `${key}`),
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
        max: 180,
      },
    },
  };

  const handleDropdownSelect = (value: string) => {
    setSelectedDropdownValue(value);
    console.log('Dropdown value in BARCHART: ', selectedDropdownValue);
  };
  
  return (
  <div>
    <h1>Pokemon stats example</h1>
    <Dropdown options={DROPDOWN_OPTIONS} onSelect={handleDropdownSelect} />
    <p><img src={image} alt="Pokemon image" /></p>

    <Bar data={chartData} options={chartOptions}></Bar>
  </div>
  );
};

export default BarChart;
