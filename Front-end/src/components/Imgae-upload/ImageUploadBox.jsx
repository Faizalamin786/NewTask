import React, { useState } from 'react';
import axios from 'axios';
import './ImageUploadBox.css'; // Add your styles here

const ImageUploadBox = ({ firstname }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1 * 1024 * 1024) { // Ensure file size is less than or equal to 1MB
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadMessage('');
    } else {
      setUploadMessage('File size should be less than 1MB');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);
    formData.append('firstname', firstname);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage(response.data.message);
    } catch (error) {
      setUploadMessage(error.response ? error.response.data.error : 'Failed to upload image');
    }
  };

  return (
    <div className="image-upload-box">
      <h2>Upload Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
        <button type="submit">Upload</button>
      </form>
      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
    </div>
  );
};

export default ImageUploadBox;
