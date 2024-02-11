import React, { useState } from 'react';


function FormPatient() {
  const [fname,setFirstName ] = useState("")
  const [lname,setLastName] = useState ("")
  const [email,setLastEmail] = useState ("")
  const [phone_number,setPhoneNumber] = useState ("")
  const [gender,setGender] = useState ("")

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch('/patients', {
      method: 'POST',
      headers: {    // <-- Corrected field name
        "Content-Type": "application/json"  // <-- Corrected Content-Type header
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        phone_number,
        gender,
      })
    })
    .then(response => {
      if (response.ok) {
        // Optionally handle success response here
        console.log("Patient created successfully");
      } else {
        // Optionally handle error response here
        console.error("Failed to create patient");
      }
    })
    .catch(error => {
      console.error('Error creating patient:', error);
    });
  };
  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '20rem',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const messageStyle = {
    marginTop: '10px',
    color: '#007bff',
    fontWeight: 'bold',
  };

  const errorStyle = {
    marginTop: '10px',
    color: '#ff0000',
    fontWeight: 'bold',
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setLastEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Registration No:</label>
          <input
            type="text"
            name="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Gender:</label>
          <input
            type="text"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Create Patient</button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
      {error && <p style={errorStyle}>Error: {error}</p>}
    </div>
  );
}

export default FormPatient;