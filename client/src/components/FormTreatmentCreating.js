import React, { useState } from 'react';
import axios from 'axios';

function FormTreatmentCreating() {
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/treatments', formData);

      if (response.status === 201) {
        setMessage('Treatment created successfully');
        // Clear the form
        setFormData({
            appointment_id:'',
            doctors_id: '',
            patients_id: '',                    
            progress: '',
        });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while creating the treatment.');
      }
    }
  };



  return (
    <div >
      <h2 >Create Treatment</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="appointment_id">Appointment_id:</label>
          <input
            type="text"
            id="appointment_id"
            name="appointment_id"
            value={formData.appointment_date}
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
          <label htmlFor="progress">Progress :</label>
          <input
            type="text"
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            required
            
          />
        </div>
        
        
        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Create Treatment</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormTreatmentCreating;