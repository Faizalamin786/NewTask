import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'
import { useNavigate, Link, Navigate } from 'react-router-dom';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const navigate = useNavigate(); // Hook to navigate programmatically


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { firstname, lastname, email, number });
      alert('User created successfully');
      // Optionally clear form fields here
      navigate('/login')
    } catch (error) {
      alert('Error creating user');
      console.error(error);
    }
  };

  return (

    <div className='login-container'>


    <form onSubmit={handleSubmit} className='login-form'>
      <h2>SignUp</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      <input
        type="tel"
        placeholder="Phone Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        />
      <button type="submit" >Register</button>
    <p>Already have an account? <Link to="/login">Login here</Link></p>
    </form>
        </div>
  );
};

export default Signup;
