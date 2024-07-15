import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserListing.css';

const UserListing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-listing">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

const UserCard = ({ user }) => {
  const [showAllVideos, setShowAllVideos] = useState(false);
  const displayedVideos = showAllVideos ? user.videos : user.videos.slice(0, 4);

  return (
    <div className="user-card">
      <img
        src={`http://localhost:5000/api/auth/profile-image/${user._id}`}
        alt={`${user.firstname}'s profile`}
        className="profile-image"
      />
      <h2>{user.firstname}</h2>
      <div className="videos">
        {displayedVideos.map((video, index) => (
          <video key={index} controls width="200" height="200" className="video-item">
            <source src={`http://localhost:5000/api/auth/video/${user._id}/${index}`} type={video.contentType} />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
      {user.videos.length > 4 && (
        <button onClick={() => setShowAllVideos(!showAllVideos)}>
          {showAllVideos ? 'Show Less' : 'See More'}
        </button>
      )}
    </div>
  );
};

export default UserListing;
