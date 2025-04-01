import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughC = () => {
  const [shotCounts, setShotCounts] = useState({ bowled_count: 0, cover_drive_count: 0, defence_count: 0, pull_count: 0, reverse_sweep_count: 0 });
  const [videoData ,setVideoData] = useState({})
  
  useEffect(()=>{
    const videodata = localStorage.getItem('videodata');
    const data = JSON.parse(videodata)
    setVideoData(data)
  },[])

  

  useEffect(() => {
    if (videoData) {
      const {
        cover_drive_count = 0,
        pull_count = 0,
        defence_count = 0,
        reverse_sweep_count = 0,
        bowled_count = 0,
      } = videoData;

      setShotCounts({
        cover_drive_count,
        pull_count,
        defence_count,
        reverse_sweep_count,
        bowled_count,
      });
    }
  }, [videoData]);

  // Data object for Doughnut chart
  const data = {
    labels: ['Cover Drive', 'Pull', 'Defence', 'Reverse Sweep', 'Bowled'],
    datasets: [
      {
        label: 'No.of Shots',
        data: [
          shotCounts.cover_drive_count,
          shotCounts.pull_count,
          shotCounts.defence_count,
          shotCounts.reverse_sweep_count,
          shotCounts.bowled_count
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughC;
