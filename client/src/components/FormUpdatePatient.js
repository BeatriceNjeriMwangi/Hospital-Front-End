
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

function FormUpdatePatient() {
  const [id, setId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await axios.patch(`/patients/${id}`, {
    phone_number: phoneNumber,
    patients_id:id,
  });

  if (response.status === 200) {
    // Display a SweetAlert success notification
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'patients phone number updated successfully',
    }).then(() => {
      // Reload the page after closing the SweetAlert dialog
      window.location.reload();
    });
  }
} catch (err) {
  if (err.response) {
    setError(err.response.data.error);
  } else {
    setError('An error occurred while updating the patients phone number.');
  }
}
  };

  return (
    <div className="centered-container">
      <h2>Update Patients phone number </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>New Patient's regNo:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Update Patient's Phone_number</button>
        <button type="submit">Update Patient's phone number</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormUpdatePatient;