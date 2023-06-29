import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './ViewRecord.css'
const ViewRecord = () => {
    const { id } = useParams();
    const [record, setRecord] = useState({});
    const [patient, setPatient] = useState({});
    const [doctor, setDoctor] = useState({});
    const [printMode, setPrintMode] = useState(false);
    const fetchData = useCallback(async () => {
        try {
            await axios.get(`http://localhost:8080/patient/${record.patientId}`).then((response) => {
                setPatient(response.data);
            });
            await axios.get(`http://localhost:8080/staff/doctor/${record.doctorId}`).then((response) => {
                setDoctor(response.data);
            })
        } catch (error) {
            console.error('Error fetching patient and doctor data:', error);
        }
    }, [record]);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/medical-records/${id}`);
                setRecord(response.data);
            } catch (error) {
                console.error('Error fetching record data:', error);
            }
        };

        fetchRecord();
    }, [id]);

    useEffect(() => {
        if (record.patientId && record.doctorId) {
            fetchData();
        }
    }, [record, fetchData]);
    const handlePrint = () => {
        setPrintMode(true);
        setTimeout(() => {
            window.print();
            setPrintMode(false);
        }, 0);
    }
    return (
        <>
            <div className="record-container mt-2">
                <RecordDetails record={record} />
                <div className="separator"></div>
                <PatientDetails patient={patient} />
                <div className="separator"></div>
                <DoctorDetails doctor={doctor} />
                {!printMode && <div className="d-flex justify-content-between">
                    <Link to="/"><button className="btn btn-danger" style={{ width: "100px" }}>Back</button></Link>
                    <button className="btn btn-danger" onClick={handlePrint} style={{ width: "100px" }}>Print</button>
                </div>}
            </div>
        </>

    );
}

const RecordDetails = ({ record }) => {
    return (
        <div className="section">
            <h3 className="section-heading record-heading">Medical Record Information</h3>
            <div className="record-details details-grid">
                {/* <div className="row">
                    <span className="label">ID:</span>
                    <span className="value">{record.id}</span>
                </div> */}
                <div className="row">
                    <span className="label">Date:</span>
                    <span className="value">{record.date}</span>
                </div>
                {/* <div className="row">
                    <span className="label">Patient ID:</span>
                    <span className="value">{record.patientId}</span>
                </div>
                <div className="row">
                    <span className="label">Doctor ID:</span>
                    <span className="value">{record.doctorId}</span>
                </div> */}
                <div className="row">
                    <span className="label">Diagnosis:</span>
                    <span className="value">{record.diagnosis}</span>
                </div>
                <div className="row">
                    <span className="label">Prescription:</span>
                    <span className="value">{record.prescription}</span>
                </div>
                <div className="row">
                    <span className="label">Notes:</span>
                    <span className="value">{record.notes}</span>
                </div>
            </div>
        </div>
    );
};

const PatientDetails = ({ patient }) => {
    return (
        <div className="section">
            <h2 className="section-heading patient-heading">Patient Information</h2>
            <div className="patient-details details-grid">
                {/* <div className="row">
                    <span className="label">ID:</span>
                    <span className="value">{patient.id}</span>
                </div> */}
                <div className="row">
                    <span className="label">Name:</span>
                    <span className="value">{patient.name}</span>
                </div>
                <div className="row">
                    <span className="label">Age:</span>
                    <span className="value">{patient.age}</span>
                </div>
                <div className="row">
                    <span className="label">Gender:</span>
                    <span className="value">{patient.gender}</span>
                </div>
                <div className="row">
                    <span className="label">Address:</span>
                    <span className="value">{patient.address}</span>
                </div>
                <div className="row">
                    <span className="label">Email:</span>
                    <span className="value">{patient.email}</span>
                </div>
                <div className="row">
                    <span className="label">Phone:</span>
                    <span className="value">{patient.phone}</span>
                </div>
                <div className="row">
                    <span className="label">Medical History:</span>
                    <span className="value">{patient.medicalHistory}</span>
                </div>
                <div className="row">
                    <span className="label">Treatment Plan:</span>
                    <span className="value">{patient.treatmentPlan}</span>
                </div>
            </div>
        </div>
    );
};

const DoctorDetails = ({ doctor }) => {
    return (
        <div className="section">
            <h2 className="section-heading doctor-heading">Doctor Information</h2>
            <div className="doctor-details details-grid">
                {/* <div className="row">
                    <span className="label">ID:</span>
                    <span className="value">{doctor.id}</span>
                </div> */}
                <div className="row">
                    <span className="label">Name:</span>
                    <span className="value">{doctor.name}</span>
                </div>
                <div className="row">
                    <span className="label">Gender:</span>
                    <span className="value">{doctor.gender}</span>
                </div>
                <div className="row">
                    <span className="label">Email:</span>
                    <span className="value">{doctor.email}</span>
                </div>
                <div className="row">
                    <span className="label">Phone:</span>
                    <span className="value">{doctor.phone}</span>
                </div>
                <div className="row">
                    <span className="label">Address:</span>
                    <span className="value">{doctor.address}</span>
                </div>
            </div>
        </div>
    );
};
export default ViewRecord;