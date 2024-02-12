import React, { useState } from 'react';

function FormUpdate() {
  const [appointment_id,setAppointmentID] = useState("")
  const [doctor_regno,setDoctorRegNo] = useState ("")
  const [appointment_date,setAppointmentDate] = useState ("")
  const [appointment_time,setAppointmentTime] = useState ("")
  const [created_at,setCreatedAt] = useState ("")
  const [updated_at,setUpdatedAt] = useState ("")

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch('/appointments', {
      method: 'POST',
      headers: {    // <-- Corrected field name
        "Content-Type": "application/json"  // <-- Corrected Content-Type header
      },
      body: JSON.stringify({
        appointment_id,
        doctor_regno,
        appointment_date,
        appointment_time,
        created_at,
        updated_at,
      })
    })
    .then(response => {
      if (response.ok) {
        // Optionally handle success response here
        console.log("Appointment add successfully");
      } else {
        // Optionally handle error response here
        console.error("Failed to add appointment");
      }
    })
    .catch(error => {
      console.error('Error adding appointment:', error);
    });
  };

  return (
    <div style={formStyle}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Patient</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label style={labelStyle}>Appointment ID:</label>
        <input
          type="text"
          name="appointment_id"
          value={appointment_id}
          onChange={(e) => setAppointmentID(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Doctor RegNo:</label>
        <input
          type="text"
          name="doctor_regno"
          value={doctor_regno}
          onChange={(e) => setDoctorRegNo(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>appointment Date:</label>
        <input
          type="tel"
          name="appointment_date"
          value={appointment_date}
          onChange={(e) => setAppointmentDate(e.target.value)}
          style={inputStyle}
        />setAppointmentDate
      </div>
      <div>
        <label style={labelStyle}>Appointment Time:</label>
        <input
          type="tel"
          name="appointment_time"
          value={appointment_time}
          onChange={(e) => setAppointmentTime(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Created At:</label>
        <input
          type="text"
          name="created_at"
          value={created_at}
          onChange={(e) => setCreatedAt(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>updated At:</label>
        <input
          type="text"
          name="updated_at"
          value={updated_at}
          onChange={(e) => setUpdatedAt(e.target.value)}
          style={inputStyle}
        />
      </div>
        <button type="submit">Update Appointment Date</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormUpdate;