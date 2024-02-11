import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormUpdate from '../components/FormUpdate';
import FormAppointment from './FormAppointment';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments')
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Appointment List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctors_id</th>
            <th>Patients_id</th>
            <th>Appointment_Date</th>
            <th>Appointment_Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.doctors_id}</td>
              <td>{appointment.patients_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
  <FormAppointment/>
  <FormUpdate/>

</div>
  );
}

export default AppointmentList;