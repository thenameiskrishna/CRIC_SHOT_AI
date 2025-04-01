import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import defaultImage from '../../assets/pics/cam1.png';
import darkImage from '../../assets/pics/camdark.png';
import useTheme from '../../context/theme';
import Vid from '../../assets/video/load.mp4'; 
import { useVideoData } from '../../context/videodata';
import { getCurrentUserDetail } from '../../auth';
import { createVideo } from '../../services/video_service';

function CheckshotVid() {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // Added state for uploaded image
  const [isDragging, setIsDragging] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [predictedVideo, setPredictedVideo] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const {videoData,setVideoData} = useVideoData();
  const { theme } = useTheme();
  const videoSource = theme === 'light' ? defaultImage : darkImage;
  const navigate = useNavigate();

  //spring start

 const[user,setUser]=useState(undefined)
 useEffect(()=>{
   setUser(getCurrentUserDetail())
 },[])
//spring end

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const user = getCurrentUserDetail(); // Fetch user details
    if (!user) {
      navigate('/Signinup'); // Redirect to sign-in page if user is not logged in
    }
  }, [navigate]); // Include navigate in the dependency array
  


  useEffect(()=>{
    if(videoData){
      setPredictedVideo(`data:video/mp4;base64,${videoData.predicted_video}`);
    }
  },[videoData])

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleVideoUpload(file);
  };

  const handleVideoUpload = async (file) => {
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file.');
      return;
    }
    setUploadedVideo(file);
    setUploadedImage(null); // Clear uploaded image when a new video is uploaded
  };

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };

  const handlePredictButtonClick = async () => {
    setUploadedVideo(null);
    setPredictedVideo(null);
    setPredictionError(null);
    if (!uploadedVideo) {
      alert('Please upload a video to predict.');
      return;
    }
    setLoaderVisible(true);
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedVideo);
      
      // const response = await fetch('https://sturgeon-light-especially.ngrok-free.app/predict_video', {
        const response = await fetch(' https://carefully-fond-pheasant.ngrok-free.app/predict_video', {
          // const response = await fetch(' https://noble-gently-barnacle.ngrok-free.app/predict_video', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to predict video');
      }
      
      const data = await response.json();

      // Spring Boot starts
const videoData = {
  "shots_played":data.shots_played,
  "shot_sequence":data.shot_sequence,
  "bowled_count":data.bowled_count,
  "cover_drive_count":data.cover_drive_count,
  "defence_count":data.defence_count,
  "pull_count":data.pull_count,
  "reverse_sweep_count":data.reverse_sweep_count,
  "bowled_avg_prob":data.bowled_avg_prob,
  "cover_drive_avg_prob":data.cover_drive_avg_prob,
  "defence_avg_prob":data.defence_avg_prob,
  "pull_avg_prob":data.pull_avg_prob,
  "reverse_sweep_avg_prob":data.reverse_sweep_avg_prob,
  "bowled_shot_runs":data.bowled_shot_runs,
  "cover_drive_shot_runs":data.cover_drive_shot_runs,
  "defence_shot_runs":data.defence_shot_runs,
  "pull_shot_runs":data.pull_shot_runs,
  "reverse_sweep_shot_runs":data.reverse_sweep_shot_runs,
  "better_shot":data.better_shot,
  "weak_shot":data.weak_shot,
  "predicted_video":data.predicted_video

};

// Send the image data to the server
videoData.userId = user.id;
console.log("Video Data before saving is:",videoData);

createVideo(videoData)
  .then((data) => {
    console.log("Image Data is saved");
    console.log(videoData);
  })
  .catch((error) => {
    console.log(error);
  });
// Spring Boot ends

      setVideoData(data);
      localStorage.setItem('videodata',JSON.stringify(data));
      setLoaderVisible(false);
      setPredictionError(null);
  
    } catch (error) {
      console.error('Error predicting video:', error);
      setLoaderVisible(false);
      setPredictionError('An error occurred while predicting the video.');
    }
  };

  const handleResetButtonClick = () => {
    setUploadedVideo(null);
    setPredictedVideo(null);
    setPredictionError(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-[#1C2222]">
      <main className="w-full max-w-screen-md p-2">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white" data-aos="zoom-in">Cricket PoseNet: AI Shot Recognition</h1>
        </div>

        <label
          className={`bg-gray-50 dark:bg-[#0e161a] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col justify-center items-center cursor-pointer ${
            isDragging ? 'border-blue-500' : ''
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2 className="text-xl font-bold text-center mb-4 dark:text-white"  data-aos="zoom-in" >Upload a Video</h2>
          {uploadedVideo && (
            <video controls className="mt-2" style={{ width: '200px' }}>
              <source src={URL.createObjectURL(uploadedVideo)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {!uploadedVideo && (
            <div>
              {uploadedImage ? (
                <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Image" className="mt-2" style={{ width: '140px', height: '100px' }} />
              ) : (
                <img src={videoSource} alt="Default Video" className="mt-2" style={{ width: '140px', height: '100px' }} />
              )}
            </div>
          )}
         
          <input
            type="file"
            id="video-upload"
            accept="video/mp4"
            className="hidden"
            onChange={(e) => handleVideoUpload(e.target.files[0])}
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
           <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Drag and drop video here or click to browse</p>

        <div className="text-center mt-3" data-aos="zoom-in">
          <button
            onClick={handlePredictButtonClick}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2"
          >
            Predict
          </button>

          <button
            onClick={handleResetButtonClick}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-2"
          >
            Reset
          </button>
        </div>
        </label>

       

        <div id="loader" className={`text-center ${loaderVisible ? 'block' : 'hidden'}`}>
          {loaderVisible ? (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 flex items-center justify-center">
              <div style={{ width: '30%', height: '30%', position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
                <video autoPlay loop muted className="w-full h-full rounded-lg" style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                  <source src={Vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : null}
        </div>

        {predictionError && (
          <div className="text-red-500 text-center mt-3">{predictionError}</div>
        )}

        {predictedVideo && (
          <div className="text-center mt-3">
            <video autoPlay controls className="mt-2" style={{ width: '100%', height: 'auto' }}>
              <source src={predictedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a
              href={predictedVideo}
              download="predicted_video.mp4"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Download Predicted Video
            </a>

            <a
              href="/Profile"
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 ml-2"
            >
              Analysis
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default CheckshotVid;
