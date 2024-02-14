import React, { useState, useEffect } from 'react';
import FormTreatment from '../components/FormTreatment';
import FormTreatmentCreating from './FormTreatmentCreating';

function Treatment() {
  const [treatments, setTreatments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch( 'https://hospital-420l.onrender.com/treatments')
    .then(r => r.json())
    .then(data => setTreatments(data))
  }, []);

  return (
    <div>
      <h2>Treatments</h2>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Appointment ID</th>
            <th>Doctors ID</th>
            <th>Patients ID</th>
            <th>Progress</th>


          </tr>
        </thead>
        <tbody>
          {treatments?.map((treatment) => (
            <tr key={treatment.id}>
              <td>{treatment.id}</td>
              <td>{treatment.appointment_id}</td>
              <td>{treatment.doctors_id}</td>
              <td>{treatment.patients_id}</td>
              <td>{treatment.progress }</td>
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