import React, { useState } from 'react';
import { json } from 'react-router-dom';

function FormDoctor() {
 const [fname,setFirstName ] = useState("")
 const [lname,setLastName] = useState ("")
 const [password,setPassword] = useState ("")
 const [email,setLastEmail] = useState ("")
 const [phone_number,setPhoneNumber] = useState ("")
 const [regNo,setRegNo] = useState ("")
 const [gender,setGender] = useState ("")


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');



  function handleSubmit(e) {
    e.preventDefault();
  
    fetch('https://hospital-420l.onrender.com/doctors', {
      method: 'POST',
      headers: {    // <-- Corrected field name
        "Content-Type": "application/json"  // <-- Corrected Content-Type header
      },
      body: JSON.stringify({
        fname,
        lname,
        password,
        email,
        phone_number,
        regNo,
        gender,
      })
    })
    .then(response => {
      if (response.ok) {
        // Optionally handle success response here
        console.log("Doctor created successfully");
      } else {
        // Optionally handle error response here
        console.error("Failed to create doctor");
      }
    })
    .catch(error => {
      console.error('Error creating doctor:', error);
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

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Doctor's Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={fname}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname"> Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={lname}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setLastEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="regNo">Registration Number:</label>
          <input
            type="text"
            id="regNo"
            name="regNo"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={inputStyle}
          >
          </input>
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Add Doctor</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FormDoctor;


// import React, { useState } from 'react';
// import axios from 'axios';

// function FormDoctor() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     departmentID: '',
//     schedule: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

// try {
//   const response = await axios.post('/doctors', formData);

//   if (response.status === 201) {
//     setMessage('Doctor created successfully');
//     // Clear the form
//     setFormData({
//       name: '',
//       email: '',
//       departmentID: '',
//       schedule: '',
//     });
//   }
// } catch (err) {
//   if (err.response) {
//     setError(err.response.data.error);
//   } else {
//     setError('An error occurred while creating the doctor.');
//   }
// }
//   };

//   const formStyle = {
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f5f5f5',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '5px 0',
//     border: '1px solid #ccc',
//     borderRadius: '3px',
//   };

//   return (
//     <div style={formStyle}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Doctor</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Input Names:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="departmentID">DepartmentID:</label>
//           <input
//             type="tel"
//             id="departmentID"
//             name="departmentID"
//             value={formData.departmentID}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="schedule">Schedule:</label>
//           <input
//             type="text"
//             id="schedule"
//             name="schedule"
//             value={formData.schedule}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />
//         </div>
//         <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '3px' }}>Create Doctor</button>
//       </form>
//       {message && <p>{message}</p>}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// }

// export default FormDoctor;