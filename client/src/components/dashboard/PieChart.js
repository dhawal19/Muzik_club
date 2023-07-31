import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart Example</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
