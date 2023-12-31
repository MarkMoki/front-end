import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import your CSS file

const LandingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneNumberRegex = /^(07|01)\d{8}$/;

    if (!phoneNumber || !phoneNumberRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number (e.g., 0712345678 or 0112345678).');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/message/', {
        phone_number: phoneNumber,
        message: 'penzi'
      });

      setResponseMessage(response.data.status);

      // Redirect to the Second Page with response message as a query parameter
      if (
        response.data.status.includes('Welcome to our dating service') ||
        response.data.status.includes('You are registered for dating.')
      ) {
        window.location.href = `/secondpage?phoneNumber=${phoneNumber}&responseMessage=${encodeURIComponent(response.data.status)}`;
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('Failed to submit the phone number. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Welcome to PENZI</h1>
      <hr></hr>
      <br></br>
      <br></br>
      <p>Registered for dating and meet the person of your dreams.</p>
      <p>To Start or Continue with Penzi,. Please enter a valid phone number (e.g., 0712345678 or 0112345678).</p>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Phone Number (e.g., 0712345678 or 0112345678)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {responseMessage && <p>Response: {responseMessage}</p>}
    </div>
  );
};

export default LandingPage;
