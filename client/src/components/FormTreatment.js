import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Swal from 'sweetalert2';

function FormTreatment() {
  // const [formData, setFormData] = useState({
  //   patient_regNo: '',
  //   doctor_regNo: '',
  //   progress: '',
  // });

  const [progress, setProgress] = useState('');
  const [id, setId] = useState('');
  const[message,setMessage]=useState('');
  const[error,setError]=useState('');

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await axios.patch(`/treatments/${id} `,{
    treatment_progress:progress,
    treatment_id:id,
  });

  if (response.status === 200) {
    // Display a SweetAlert success notification
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Treatment progress updated successfully',
    }).then(() => {
      // Reload the page after closing the SweetAlert dialog
      window.location.reload();
    });
  }
} catch (err) {
  if (err.response) {
    setError(err.response.data.error);
  } else {
    setError('An error occurred while updating the treatment progress.');
  }
}
  };

  return (
    <div className="centered-container">
      <h2>Update Treatment Progress</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Treatment ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        {/* <div style={{ marginBottom: '10px' }}>
          <label htmlFor="patient_id">Patient Id:</label>
          <input
            type="number"
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div> */}
        {/* <div style={{ marginBottom: '10px' }}>
          <label htmlFor="doctors_id">Doctor Id:</label>
          <input
            type="number"
            id="doctors_id"
            name="doctors_id"
            value={formData.doctor_regNoid}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div> */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="progress">New Progress:</label>
          <input
            type="text"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
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
      {message && (
        <p
          style={{
            marginTop: '10px',
            color: message.includes('successfully') ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default FormTreatment;
