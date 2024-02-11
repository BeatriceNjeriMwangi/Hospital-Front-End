import React, { useState } from 'react';

function FormTreatment() {
  const [appointment_id,setAppointmentID ] = useState("")
  const [doctors_id,setDoctorsID] = useState ("")
  const [patients_id,setPatientsID] = useState ("")
  const [progress,setLastProgress] = useState ("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('/treatments' , {
      method: 'POST',
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify( {
        appointment_id,
        doctors_id,
        patients_id,
        progress,
      })
    })
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Update Treatment Progress</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="appointment_id">Appointment ID:</label>
          <input
            type="tel"
            id="appointment_id"
            name="appointment_id"
            value={appointment_id}
            onChange={(e) => setAppointmentID(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="doctors_id">Doctors ID</label>
          <input
            type="tel"
            id="doctors_id"
            name="doctors_id"
            value={doctors_id}
            onChange={(e) => setDoctorsID(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="patients_id">Patients ID</label>
          <input
            type="text"
            id="patients_id"
            name="patients_id"
            value={patients_id}
            onChange={(e) => setPatientsID(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="progress">Progress</label>
          <input
            type="tel"
            id="progress"
            name="progress"
            value={progress}
            onChange={(e) => setLastProgress(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
            }}
          >
            Update Progress
          </button>
        </div>
      </form>
    
    </div>
  );
}

export default FormTreatment;