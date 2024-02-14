import React, { useState, useEffect } from 'react';
import FormPatient from '../components/FormPatients';
import FormUpdatePatient from './FormUpdatePatient';

function Patient() {
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    fetch( 'https://hospital-420l.onrender.com/patients')
    .then(r => r.json())
    .then(data => setPatients(data))
  }, []);

  
  return (
    <div>
      <h1>Patient List</h1>
      
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
          {patients?.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.email}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.regNo}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

  <FormPatient/>
  <FormUpdatePatient/>
</div>
  );
}

export default Patient;