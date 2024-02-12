import React, { useState, useEffect } from 'react';
import FormUpdate from '../components/FormUpdate';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

 
  useEffect(() => {
    fetch( '/appointments')
    .then(r => r.json())
    .then(data => setAppointments(data))
  }, []);

  return (
    <div>
      <h1>Appointment List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor Registration No</th>
            <th>Patient Registration No</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.doctor_regNo}</td>
              <td>{appointment.patient_regNo}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
              <td>{appointment.created_at}</td>
              <td>{appointment.updated_at}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <FormUpdate/>
    </div>
  );
}

export default AppointmentList;