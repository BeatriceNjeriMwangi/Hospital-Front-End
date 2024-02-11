// import React, { useState } from 'react';
// import axios from 'axios'; // Import Axios

// function FormTreatment() {
//   const [formData, setFormData] = useState({
//     appointment_id: '',
//     doctor_id: '',
//     patient_id: '',
//     progress: '',
//   });

//   const [message, setMessage] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

// try {
//   const response = await axios.patch(`/treatments/${id}`, formData);

//   if (response.status === 200) {
//     setMessage('Treatment progress updated successfully');
//   } else if (response.status === 404) {
//     setMessage(response.data.message);
//   } else {
//     setMessage('An error occurred while updating treatment progress');
//   }
// } catch (error) {
//   setMessage('An error occurred while updating treatment progress');
// }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center' }}>Update Treatment Progress</h2>
//       <form onSubmit={handleSubmit}>
//       <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="treatment_id">Treatment ID:</label>
//           <input
//             type="number"
//             name="doctor_id"
//             value={formData.doctor_id}
//             onChange={handleInputChange}
//             required
//             style={{ width: '100%', padding: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="doctor_id">Doctor ID:</label>
//           <input
//             type="number"
//             id="doctor_id"
//             name="doctor_id"
//             value={formData.doctor_id}
//             onChange={handleInputChange}
//             required
//             style={{ width: '100%', padding: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="patient_id">Doctor Registration Number</label>
//           <input
//             type="number"
//             id="patient_id"
//             name="patient_id"
//             value={formData.patient_id}
//             onChange={handleInputChange}
//             required
//             style={{ width: '100%', padding: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label htmlFor="progress">New Progress:</label>
//           <input
//             type="text"
//             id="progress"
//             name="progress"
//             value={formData.progress}
//             onChange={handleInputChange}
//             required
//             style={{ width: '100%', padding: '5px' }}
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             style={{
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               padding: '10px 15px',
//               cursor: 'pointer',
//             }}
//           >
//             Update Progress
//           </button>
//         </div>
//       </form>
//       {message && (
//         <p
//           style={{
//             marginTop: '10px',
//             color: message.includes('successfully') ? 'green' : 'red',
//           }}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }

// export default FormTreatment;
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert

function FormTreatment() {
  const [id, setId] = useState('');
  const [progress, setProgress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await axios.patch(`/treatments/${id}`, {
    appointment_progress: progress,
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
        <div>
          <label>New Treatment Progress:</label>
          <input
            type="text"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        </div>
        <button type="submit">Update Treatment Progress</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormTreatment;