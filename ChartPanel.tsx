import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import useApplicantsData from '../hooks/useApplicantsData';

const ChartPanel = () => {
  const { mostChosen, leastChosen, unchosen } = useApplicantsData();

  const data = [
    { name: 'Most Chosen', count: mostChosen?.chosenCount || 0 },
    { name: 'Least Chosen', count: leastChosen?.chosenCount || 0 },
    { name: 'Unchosen Total', count: unchosen.length },
  ];

  return (
    <div>
      <h3>Applicant Stats</h3>
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ChartPanel;
