import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCurrentUserDetail } from '../../auth';
import { getLastMatchData } from '../../services/video_service';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
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
};

const labels = ['Bowled', 'Cover Drive','Defence', 'Pull',  'Reverse Sweep'];

const LineC = () => {
  const [shotCounts, setShotCounts] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });
  const [videodata, setVideoData] = useState({});

  //spring start
  const[user,setUser]=useState(0);
  const[lastMatchData,setLastMatchData]=useState({})
  const [shotCounts1, setShotCounts1] = useState({bowled_avg_prob: 0,cover_drive_avg_prob: 0, defence_avg_prob: 0, pull_avg_prob: 0,   reverse_sweep_avg_prob: 0 });
  
  useEffect(()=>{
    if(getCurrentUserDetail()!=undefined)
     setUser(getCurrentUserDetail())
   },[])
  
  const userId=user.id;
  
    useEffect(()=>{
      //load last match data
      getLastMatchData(userId).then((data)=>{
       const lastMatchdata=data;
       setLastMatchData(data);
       const {bowled_avg_prob,cover_drive_avg_prob, defence_avg_prob, pull_avg_prob,   reverse_sweep_avg_prob } = lastMatchData;
      setShotCounts1({bowled_avg_prob,  cover_drive_avg_prob, defence_avg_prob, pull_avg_prob,  reverse_sweep_avg_prob });
      console.log("Last Match Data",lastMatchdata);
      }).catch(error=>{
        console.log(error)
      })
    },[ userId,lastMatchData])

    //spring end

  useEffect(() => {
    const data = localStorage.getItem('videodata');
    if(data){
    const videoData = JSON.parse(data);
    console.log("JSON PARSE",videoData)
    setVideoData(videoData);
    const {bowled_avg_prob,cover_drive_avg_prob, defence_avg_prob, pull_avg_prob,   reverse_sweep_avg_prob } = videoData;
    setShotCounts({bowled_avg_prob,  cover_drive_avg_prob, defence_avg_prob, pull_avg_prob,  reverse_sweep_avg_prob });
    }
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Last Match',
       // spring start
       data: Object.values(shotCounts1),//setting last match data
       //spring end
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Current Match',
        data: Object.values(shotCounts), // Changed to Object.values(shotCounts)
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default LineC;
