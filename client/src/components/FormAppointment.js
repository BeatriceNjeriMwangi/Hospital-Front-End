import React, { useState } from 'react';
import axios from 'axios';

function FormAppointment() {
  const [formData, setFormData] = useState({
    patients_id: '',
    doctors_id: '',
    appointment_date: '',
    appointment_time: '',
    
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value ,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/appointments', formData);

      if (response.status === 201) {
        setMessage('Appointment created successfully');
        // Clear the form
        setFormData({
            patients_id: '',
            doctors_id: '',
            appointment_date: '',
            appointment_time: '',
        });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while creating the appointment.');
      }
    }
  };



  return (
    <div >
      <h2 >Create Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patients_id">Patients_id :</label>
          <input
            type="text"
            id="patients_id"
            name="patients_id"
            value={formData.patients_id}
            onChange={handleChange}
            required
        
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctors_id">Doctors_id:</label>
          <input
            type="text"
            id="doctors_id"
            name="doctors_id"
            value={formData.doctors_id}
            onChange={handleChange}
            required
                    />
        </div>
        <div className="form-group">
          <label htmlFor="appointment_date">Appointment_date:</label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointment_time">Appointment_time :</label>
          <input
            type="time"
            id="appointment_time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            
          />
        </div>
        
        
        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Create Appointment</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormAppointment;