import React, { useState, useEffect } from 'react';
import FormUpdate from '../components/FormUpdate';
import FormAppointment from './FormAppointment';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

 
  useEffect(() => {
    fetch( 'https://hospital-420l.onrender.com/appointments')
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
            <th>Patient Id</th>
            <th>Doctor Id</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            
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