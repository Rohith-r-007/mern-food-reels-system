import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/createFood.css';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!video) {
      setVideoPreview(null);
      return;
    }

    const url = URL.createObjectURL(video);
    setVideoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [video]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);
    formData.append('description', description);

    const response = await axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true
    });
    navigate('/home');
  };

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <h1>Create Food</h1>
        <p className="subtitle">
          Share your delicious reel with everyone 🍔
        </p>

        <form onSubmit={handleSubmit} className="create-food-form">
          <div className="form-group">
            <label>Upload Video</label>

            <label className="upload-box">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0] ?? null)}
              />

              <span>
                {video ? video.name : 'Tap to upload your reel'}
              </span>
            </label>

            {videoPreview && (
              <div className="video-preview">
                <video
                  src={videoPreview}
                  controls
                  playsInline
                  className="video-preview-player"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Food Name</label>

            <input
              type="text"
              placeholder="Ex: Chicken Burger"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              placeholder="Tell people why this food is special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Post Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;