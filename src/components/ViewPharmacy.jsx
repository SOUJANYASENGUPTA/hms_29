import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './css/style.css';
import './css/tablestyle.css';
import './css/navbar.css';

const ViewPharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pharmacy');
      setPharmacies(response.data);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };

  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pharmacy/${id}`);
      fetchPharmacies(); // Refresh the pharmacy list after deletion
    } catch (error) {
      console.error('Error deleting pharmacy:', error);
    }
  };

  const openEditModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setSelectedPharmacy(null);
  };

  const saveEditedPharmacy = async (editedPharmacy) => {
    try {
      await axios.put(`http://localhost:8080/pharmacy`, editedPharmacy);
      fetchPharmacies(); // Refresh the pharmacy list after updating
      closeEditModal();
    } catch (error) {
      console.error('Error updating pharmacy:', error);
    }
  };

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setSearchId(searchValue);
  
    try {
      if (searchValue === '') {
        // Fetch all pharmacies if search value is empty
        fetchPharmacies();
      } else {
        const response = await axios.get(`http://localhost:8080/pharmacy/${searchValue}`);
        const pharmacy = response.data;
        setPharmacies(pharmacy ? [pharmacy] : []);
      }
    } catch (error) {
      console.error('Error searching pharmacies:', error);
    }
  };

  return (
    <div>
      <div className='container'>
        <h2>Pharmacies</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search by ID" value={searchId} onChange={handleSearch} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Refill Date</th>
              <th>Prescription Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td>{pharmacy.patientId}</td>
                <td>{pharmacy.medicationName}</td>
                <td>{pharmacy.dosage}</td>
                <td>{pharmacy.refillDate}</td>
                <td>{pharmacy.prescriptionNumber}</td>
                <td className='actions'>
                  {/* Edit button */}
                  <button onClick={() => openEditModal(pharmacy)}>
                    <EditIcon />
                  </button>
                  {/* Delete button */}
                  <button onClick={() => deletePharmacy(pharmacy.id)}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing pharmacy details */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Edit Pharmacy Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor='patientId'>Patient ID:</label>
                <input
                  type='text'
                  id='patientId'
                  value={selectedPharmacy.patientId}
                  onChange={(e) =>
                    setSelectedPharmacy({ ...selectedPharmacy, patientId: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor='medicationName'>Medication Name:</label>
                <input
                  type='text'
                  id='medicationName'
                  value={selectedPharmacy.medicationName}
                  onChange={(e) =>
                    setSelectedPharmacy({ ...selectedPharmacy, medicationName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor='dosage'>Dosage:</label>
                <input
                  type='text'
                  id='dosage'
                  value={selectedPharmacy.dosage}
                  onChange={(e) => setSelectedPharmacy({ ...selectedPharmacy, dosage: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor='refillDate'>Refill Date:</label>
                <input
                  type='text'
                  id='refillDate'
                  value={selectedPharmacy.refillDate}
                  onChange={(e) => setSelectedPharmacy({ ...selectedPharmacy, refillDate: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor='prescriptionNumber'>Prescription Number:</label>
                <input
                  type='text'
                  id='prescriptionNumber'
                  value={selectedPharmacy.prescriptionNumber}
                  onChange={(e) =>
                    setSelectedPharmacy({ ...selectedPharmacy, prescriptionNumber: e.target.value })
                  }
                />
              </div>
              <button onClick={closeEditModal}>Cancel</button>
              <button onClick={() => saveEditedPharmacy(selectedPharmacy)}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPharmacy;