import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BioPopup from '../components/bio-popup/BioPopup';
import axios from 'axios';
import ImageUploadBox from './Imgae-upload/ImageUploadBox';
import VideoUploadBox from '../Video-upload/VideoUploadBox';

const Page1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [showBioPopup, setShowBioPopup] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [bio, setBio] = useState(user ? user.bio : '');
  const [videos, setVideos] = useState([]); // State for videos

  const handleAddBioClick = () => {
    setShowBioPopup(true);
  };

  const handleCloseBioPopup = () => {
    setShowBioPopup(false);
  };

  const handleSaveBio = async (newBio) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/user/updateBio', {
        email: user.email,
        bio: newBio,
      });
      if (response.status === 200) {
        setBio(newBio);
        setShowBioPopup(false);
      } else {
        alert('Failed to save bio');
      }
    } catch (error) {
      alert('Failed to save bio');
    }
  };

  const handleUploadVideo = (video) => {
    setVideos([...videos, video]);
    setShowUploadForm(false);
  };

  const handleUserListClick = () => {
    navigate('/userListing');
  };

  return (
    <div>
      <h1>Welcome to Page 1</h1>
      {user ? (
        <div>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Number: {user.number}</p>
          <p>Bio: {bio}</p>
          <button onClick={handleAddBioClick}>Add Bio</button>
          {showBioPopup && <BioPopup onClose={handleCloseBioPopup} onSave={handleSaveBio} />}
          
          <ImageUploadBox firstname={user.firstname} />
          <VideoUploadBox firstname={user.firstname} />
          
          <button onClick={handleUserListClick}>User List</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Page1;
