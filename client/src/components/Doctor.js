import React, { useState, useEffect } from 'react';

import FormDoctor from '../components/FormDoctor';

function Doctor() {
  const [doctors, setDoctors] = useState([]);


  useEffect(() => {
    fetch( '/doctors')
    .then(r => r.json())
    .then(data => setDoctors(data))
  }, []);

  return (
    <div>
      <h1>Doctor's List</h1>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Registration Number</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.fname}</td>
              <td>{doctor.lname}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone_number}</td>
              <td>{doctor.regNo}</td>
              <td>{doctor.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormDoctor/>
    </div>
  );
}

export default Doctor;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import FormDoctor from '../components/FormDoctor';

// function Doctor() {
//   const [doctors, setDoctors] = useState([]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('/doctors');
//       setDoctors(response.data.doctors);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h1>Doctor List</h1>
      
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//              <th>Name</th>
//             <th>Email</th>
//             <th>DepartmentID</th>
//             <th>schedule</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doctor) => (
//             <tr key={doctor.id}>
//               <td>{doctor.id}</td>
//               <td>{doctor.name}</td>
//               <td>{doctor.email}</td>
//               <td>{doctor.departmentid}</td>
//               <td>{doctor.schedule}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//   <FormDoctor/>
// </div>
//   );
// }

// export default Doctor;