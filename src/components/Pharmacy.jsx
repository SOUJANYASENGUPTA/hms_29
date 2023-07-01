import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ViewPharmacy from './ViewPharmacy';
import './css/style.css';
import './css/tablestyle.css';
import './css/navbar.css';

const PharmacyRegistration = () => {
    const [showViewPharmacy, setShowViewPharmacy] = useState(false);
  const [newPharmacy, setNewPharmacy] = useState({
    patient_id: '',
    medication_name: '',
    dosage: '',
    refill_date: '',
    prescription_number: ''
  });

  const [patientExists, setPatientExists] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPharmacy((prevPharmacy) => ({ ...prevPharmacy, [name]: value }));
  };

  const checkPatientExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patient/${newPharmacy.patient_id}`);
      setPatientExists(response.data !== null);
    } catch (error) {
      console.error('Error checking patient existence:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientExists) {
      console.log('Patient does not exist');
      return;
    }

    try {
      await axios.post('http://localhost:8080/pharmacy', newPharmacy);
      setNewPharmacy({
        patient_id: '',
        medication_name: '',
        dosage: '',
        refill_date: '',
        prescription_number: ''
      });
    } catch (error) {
      console.error('Error creating pharmacy:', error);
    }
  };
  const handleBackToDashboard = () => {
    setShowViewPharmacy(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/Dashboard" className="btn-back" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Link>
          {showViewPharmacy ?
            (<Link to="/Dashboard/pharmacy" className='btn-back' onClick={handleBackToDashboard}>
            Back to Registration
            </Link>):(
            <button className="btn-patients" style={{marginLeft :"1000px"}} onClick={() => setShowViewPharmacy(true)}>
              View Existing Stocks
            </button>)}
        </div>
      </nav>
      <Routes>
      <Route
      path="/"
      element={
      <div className="wrapper">
        <div className="inner">
          { !showViewPharmacy && (
          <div className="image-holder">
            <img src="https://unblast.com/wp-content/uploads/2020/10/Pharmacist-Vector-Illustration-1536x1213.jpg" alt="" />
          </div>)
         }
         {!showViewPharmacy ? (
          <form onSubmit={handleSubmit}>
            <h3>Pharmacy Stocking Form</h3>
            <div className="form-wrapper">
              <input
                type="text"
                name="patient_id"
                placeholder="Patient ID"
                className="form-control"
                value={newPharmacy.patient_id}
                onChange={handleInputChange}
                onBlur={checkPatientExists} // Trigger patient existence check onBlur
                required
              />

              {!patientExists && <p className="error-message">Patient ID does not exist.</p>} {/* Display error message if patient does not exist */}

              <input
                type="text"
                name="medication_name"
                placeholder="Medication Name"
                className="form-control"
                value={newPharmacy.medication_name}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                className="form-control"
                value={newPharmacy.dosage}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="refill_date"
                placeholder="Refill Date"
                className="form-control"
                value={newPharmacy.refill_date}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="prescription_number"
                placeholder="Prescription Number"
                className="form-control"
                value={newPharmacy.prescription_number}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="reg">
              Stock <i className="zmdi zmdi-arrow-right"></i>
            </button>
          </form>
          ) : (
            <ViewPharmacy />
          )}
        </div>
      </div>
      }/>
      <Route path="/pharmacy" element={<ViewPharmacy/>} />
        </Routes>
    </div>
  );
};

export default PharmacyRegistration;

