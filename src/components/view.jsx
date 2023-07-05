import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './css/style.css';
import './css/tablestyle.css';
import './css/navbar.css';

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchId, setSearchId] = useState('');


  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patient');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/patient/${id}`);
      fetchPatients(); // Refresh the patient list after deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const saveEditedPatient = async (editedPatient) => {
    try {
      await axios.put(`http://localhost:8080/patient`, editedPatient);
      fetchPatients(); // Refresh the patient list after updating
      closeEditModal();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setSearchId(searchValue);
  
    try {
      if (searchValue === '') {
        // Fetch all patients if search value is empty
        fetchPatients();
      } else {
        const response = await axios.get(`http://localhost:8080/patient/${searchValue}`);
        const patient = response.data;
        setPatients(patient ? [patient] : []);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  };
  

  return (
    <div>
      <div className='container'>
        <h2>Patients</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search by ID" value={searchId} onChange={handleSearch} />
        </div>
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
              <th>Actions</th>
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
                <td>{patient.medicalHistory}</td>
                <td>{patient.treatmentPlan}</td>
                <td className='actions'>
                  {/* Edit button */}
                  <button onClick={() => openEditModal(patient)}>
                    <EditIcon />
                  </button>
                  {/* Delete button */}
                  <button onClick={() => deletePatient(patient.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing patient details */}
          {showModal && (
            <div className='modal'>
              <div className='modal-content'>
                <h2>Edit Patient Details</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                <div>
              <label htmlFor='age'>ID:</label>
              <input
                type='text'
                id='id'
                value={selectedPatient.id}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, id: e.target.value })}
              />
            </div>
              <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={selectedPatient.name}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='age'>Age:</label>
              <input
                type='text'
                id='age'
                value={selectedPatient.age}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='gender'>Gender:</label>
              <input
                type='text'
                id='gender'
                value={selectedPatient.gender}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, gender: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='address'>Address:</label>
              <input
                type='text'
                id='address'
                value={selectedPatient.address}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='phone'>Phone:</label>
              <input
                type='text'
                id='phone'
                value={selectedPatient.phone}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='text'
                id='email'
                value={selectedPatient.email}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='history'>Medical History:</label>
              <input
                type='text'
                id='medicalHistory'
                value={selectedPatient.medicalHistory}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, medicalHistory: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='treatment'>Treatment Plan:</label>
              <input
                type='text'
                id='treatmentPlan'
                value={selectedPatient.treatmentPlan}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, treatmentPlan: e.target.value })}
              />
            </div>
            <button onClick={closeEditModal}>Cancel</button>
            <button onClick={() => saveEditedPatient(selectedPatient)}>Save</button>
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;