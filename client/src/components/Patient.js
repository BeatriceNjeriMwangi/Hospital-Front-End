import React, { useState, useEffect } from 'react';
import FormPatient from '../components/FormPatients';

function Patient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch( '/patients')
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
            <th>Registration Number</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.email}</td>
              <td>{patient.phone_number}</td>
              <td>{patient.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

  <FormPatient/>
</div>
  );
}

export default Patient;