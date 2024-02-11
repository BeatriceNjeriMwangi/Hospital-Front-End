import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormTreatment from '../components/FormTreatment';
import FormTreatmentCreating from './FormTreatmentCreating';

function Treatment() {
  const [treatments, setTreatments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/treatments')
      .then((response) => {
        setTreatments(response.data.treatments);
      })
      .catch((err) => {
        setError('An error occurred while fetching treatments.');
      });
  }, []);

  return (
    <div>
      <h2>Treatments</h2>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient RegNo</th>
            <th>Doctor RegNo</th>
          </tr>
        </thead>
        <tbody>
          {treatments?.map((treatment) => (
            <tr key={treatment.id}>
              <td>{treatment.id}</td>
              <td>{treatment.patient_regNo}</td>
              <td>{treatment.doctor_regNo}</td>
              <td>{treatment.disease_id}</td>
              <td>{treatment.hospital_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormTreatmentCreating/>
      <FormTreatment/>
    </div>
  );
}

export default Treatment;