
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

function FormUpdateDoctor() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await axios.patch(`https://hospital-420l.onrender.com/doctors/${id}`, {
    doctors_email: email,
    doctors_id:id,
  });

  if (response.status === 200) {
    // Display a SweetAlert success notification
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'doctors email updated successfully',
    }).then(() => {
      // Reload the page after closing the SweetAlert dialog
      window.location.reload();
    });
  }
} catch (err) {
  if (err.response) {
    setError(err.response.data.error);
  } else {
    setError('An error occurred while updating the doctors email.');
  }
}
  };

  return (
    <div className="centered-container">
      <h2>Update Doctors </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>New Doctor's Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Update Doctor's Email</button>

        <button type="submit">Update Doctor's Email</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormUpdateDoctor;