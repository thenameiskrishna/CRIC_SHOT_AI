import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
  scales: {
    x: {
      display: false, // Hide x-axis values
    },
  },
};

const labels = ['Cover Drive', 'Pull', 'Defence', 'Reverse Sweep',];

const VerticalC = () => {
  const [shotCounts, setShotCounts] = useState({
    cover_drive_shot_runs: 0,
    pull_shot_runs: 0,
    defence_shot_runs: 0,
    reverse_sweep_shot_runs: 0,
    
  });
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    const videodata = localStorage.getItem('videodata');
    const data = JSON.parse(videodata);
    setVideoData(data);
  }, []);

  useEffect(() => {
    if (videoData) {
      const {
        cover_drive_shot_runs = 0,
        pull_shot_runs = 0,
        defence_shot_runs = 0,
        reverse_sweep_shot_runs = 0,
     
      } = videoData;

      setShotCounts({
        cover_drive_shot_runs,
        pull_shot_runs,
        defence_shot_runs,
        reverse_sweep_shot_runs,
       
      });
    }
  }, [videoData]);

  const data = {
    labels,
    datasets: [
      {
        label: '% of runs',
        data: [
          shotCounts.cover_drive_shot_runs,
          shotCounts.pull_shot_runs,
          shotCounts.defence_shot_runs,
          shotCounts.reverse_sweep_shot_runs,
         
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default VerticalC;
