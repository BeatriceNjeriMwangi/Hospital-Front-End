import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPatient from '../components/FormPatients';

function Patient() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patients');
      setPatients(response.data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    // Fetch patients when the component initially loads
    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patient List</h1>
      
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
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
              <td>{patient.regNo}</td>
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