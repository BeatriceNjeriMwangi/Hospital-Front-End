// import React, { useState } from 'react';

// function FormAppointment() {
//   const [formdata, setFormData] = useState({
//     patients_id: '',
//     doctors_id: '',
//     appointment_date: '',
//     appointment_time: '',
   
//   });
//   const [message,setMessage]=useState('');
//   const [error, setError] = useState('');

//   function handleSubmit(e) {
//     e.preventDefault();

//     fetch('/appointments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formdata)
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Appointment created successfully');
//       } else {
//         console.error('Failed to create appointment');
//       }
//     })
//     .catch(error => {
//       console.error('Error creating appointment:', error);
//       setError('Error creating appointment');
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formdata,
//       [e.target.name]: e.target.value
//     });
//   };

//   const formStyle = {
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f5f5f5',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   };

//   const labelStyle = {
//     marginBottom: '5px',
//     fontWeight: 'bold',
//   };

//   const inputStyle = {
//     marginBottom: '10px',
//     padding: '8px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     width: '20rem',
//   };

//   const buttonStyle = {
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '10px 15px',
//     fontSize: '16px',
//     cursor: 'pointer',
//   };

//   const messageStyle = {
//     marginTop: '10px',
//     color: '#007bff',
//     fontWeight: 'bold',
//   };

//   const errorStyle = {
//     marginTop: '10px',
//     color: '#ff0000',
//     fontWeight: 'bold',
//   };

//   return (
//     <div style={formStyle}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label style={labelStyle}>Patients ID:</label>
//           <input
//             type="text"
//             name="patients_id"
//             value={formdata.patients_id}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Doctors ID:</label>
//           <input
//             type="text"
//             name="doctors_id"
//             value={formdata.doctors_id}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Appointment Date:</label>
//           <input
//             type="date"
//             name="appointment_date"
//             value={formdata.appointment_date}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Appointment Time:</label>
//           <input
//             type="time"
//             name="appointment_time"
//             value={formdata.appointment_time}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Created At:</label>
//           <input
//             type="text"
//             name="created_at"
//             value={formdata.created_at}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Updated At:</label>
//           <input
//             type="text"
//             name="updated_at"
//             value={formdata.updated_at}
//             onChange={handleChange}
//             style={inputStyle}
//           />
//         </div>
//         <button type="submit" style={buttonStyle}>Create Appointment</button>
//       </form>
//       {message && <p style={messageStyle}>{message}</p>}
//       {error && <p style={errorStyle}>Error: {error}</p>}
//     </div>
//   );
// }

// export default FormAppointment;
import React, { useState } from 'react';
import axios from 'axios';

function FormAppointment(){
  const [formData, setFormData]=useState({
    patients_id:'',
    doctors_id:'',
    appointment_date:'',
    appointment_time:'',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const response=await axios.post('https://hospital-420l.onrender.com/appointments',formData);
      
      if(response.status===200){
        setMessage('Appointment created successfully');

        setFormData({
          patients_id:'',
          doctors_id:'',
          
          appointment_date:'',
          appointment_time:'',
        })
      }
    }catch(err){
      if(err.response){
        setError(err.response.data.error);
      }else{
        setError('An error occurred while creating the appointment')
      }
    }
  };
  return(
    <div>
      <h2 >Create Appointment</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="patients_id">Patients_id:</label>
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
          <label htmlFor="appointment_date">Appointment Date :</label>
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
          <label htmlFor="appointment_time">Appointment Time :</label>
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
    
  )

}
export default FormAppointment;