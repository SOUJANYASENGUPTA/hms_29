import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import {Container, Button} from '@mui/material';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    history: '',
    treatment: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients/getAll');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/patients/add', newPatient);
      setNewPatient({
        id: '',
        name: '',
        age: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        history: '',
        treatment: ''
      });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div>
        <Container>
      <h1>Patient Management</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="id"
          value={newPatient.id}
          onChange={handleInputChange}
          placeholder="ID"
          required
        />
        <input
          type="text"
          name="name"
          value={newPatient.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={newPatient.age}
          onChange={handleInputChange}
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="gender"
          value={newPatient.gender}
          onChange={handleInputChange}
          placeholder="Gender"
          required
        />
        <input
          type="text"
          name="address"
          value={newPatient.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="phone"
          value={newPatient.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
        />
        <input
          type="email"
          name="email"
          value={newPatient.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="history"
          value={newPatient.history}
          onChange={handleInputChange}
          placeholder="Medical History"
          required
        />
        <input
          type="text"
          name="treatment"
          value={newPatient.treatment}
          onChange={handleInputChange}
          placeholder="Treatment Plan"
          required
        />
        <Button variant="contained" type="submit">Add Patient</Button>
      </form>

      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Medical History</th>
            <th>Treatment Plan</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.phone}</td>
              <td>{patient.email}</td>
              <td>{patient.history}</td>
              <td>{patient.treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Container>
    </div>
  );
};

export default PatientManagement;
