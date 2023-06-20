import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import './css/style.css';
//import './fonts/Material-Design-Iconic-Font.woff2';
import './css/tablestyle.css';
import './css/navbar.css';

import ViewPatients from './view';

const PatientManagement = () => {
  const [showViewPatients, setShowViewPatients] = useState(false);
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
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleBackToDashboard = () => {
    setShowViewPatients(false);
  };

  return (
    
      <div>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/Dashboard" className="btn-back" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Link>
            {showViewPatients ? (
            <Link to="/Dashboard/Patient" className="btn-back" onClick={handleBackToDashboard}>
              Back to Registration
            </Link>) : (
            <button className="btn-patients" onClick={() => setShowViewPatients(true)}>
              View Existing Patients
            </button>)}
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="wrapper">
                <div className="inner">
                  {!showViewPatients && (
                    <div className="image-holder">
                      <img src="https://i.pinimg.com/564x/ea/84/10/ea8410f1c31deaa8db860685e1d14669.jpg" alt="" />
                    </div>
                  )}
                  {!showViewPatients ? (
                    <form onSubmit={handleSubmit}>
                      <h3>Registration Form</h3>
                      <div className="form-wrapper">
                        <input
                          type="text"
                          name="id"
                          placeholder="Patient ID"
                          className="form-control"
                          value={newPatient.id}
                          onChange={handleInputChange}
                        />

                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          className="form-control"
                          value={newPatient.name}
                          onChange={handleInputChange}
                        />

                        <input
                          type="number"
                          name="age"
                          value={newPatient.age}
                          onChange={handleInputChange}
                          placeholder="Age"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="gender"
                          value={newPatient.gender}
                          onChange={handleInputChange}
                          placeholder="Gender"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="address"
                          value={newPatient.address}
                          onChange={handleInputChange}
                          placeholder="Address"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="phone"
                          value={newPatient.phone}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="email"
                          value={newPatient.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="history"
                          value={newPatient.history}
                          onChange={handleInputChange}
                          placeholder="Medical History"
                          className="form-control"
                          required
                        />
                        <input
                          type="text"
                          name="treatment"
                          value={newPatient.treatment}
                          onChange={handleInputChange}
                          placeholder="Treatment Plan"
                          className="form-control"
                          required
                        />
                      </div>
                      <button type="submit" className="reg">
                        Register <i className="zmdi zmdi-arrow-right"></i>
                      </button>
                    </form>
                  ) : (
                    <ViewPatients />
                  )}
                </div>
              </div>
            }
          />
          <Route path="/patients" element={<ViewPatients />} />
        </Routes>
      </div>
  );
};

export default PatientManagement;
