import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import "./RecordList.css"
const RecordList = () => {
    const [isedit, setIsedit] = useState(false);
    const [isadd, setIsadd] = useState(false);
    const [view, setView] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [records, setRecords] = useState([]);
    const SubmitDelete = async (id) => {
        await axios.delete(`http://localhost:8080/medical-records/${id}`).then(() => {
            fetchRecords();
        })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                SubmitDelete(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Record Deleted',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        })
    }
    const fetchRecords = async () => {
        await axios.get('http://localhost:8080/medical-records').then((response) => {
            setRecords(response.data);
        })
    }
    const [id, setId] = useState('')
    useEffect(() => {
        fetchRecords();
    }, [])
    const navigate = useNavigate();
    const backtoDashboard = () => {
         navigate("/Dashboard")
    }
    return (
        <div className="container mt-4">
            {isadd && <CreateRecord isadd={isadd} isedit={isedit} setIsadd={setIsadd} setIsedit={setIsedit} fetchRecords={fetchRecords} />}
            {isedit && <EditRecord isadd={isadd} isedit={isedit} setIsadd={setIsadd} setIsedit={setIsedit} id={id} setId={setId} fetchRecords={fetchRecords} />}
            {view && <ViewRecord view={view} setView={setView} record={selectedRecord} setSelectedRecord={setSelectedRecord} />}
            {!isedit && !isadd && !view && <div className="card">
                <div className="card-title">
                    <h2 className="text-center mt-2">Medical Records</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <span className="btn btn-success mt-4 mb-4" onClick={() => setIsadd(true)}>Add New Record</span>
                        {/* <Link to="/create" className="btn btn-success mt-4 mb-4">Add New (+)</Link> */}
                        <span className='back-btn' style={{ marginLeft: "60rem" }} onClick={backtoDashboard}>Back to Dashboard</span>
                    </div>

                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr className="text-center">
                                <td>ID</td>
                                <td>Patient Id</td>
                                <td>Doctor Id</td>
                                <td>Date</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>

                            {records &&
                                records.map(record => (
                                    <tr key={record.id} className="text-center">
                                        <td>{record.id}</td>
                                        <td>{record.patient_id}</td>
                                        <td>{record.doctor_id}</td>
                                        <td>{record.date}</td>
                                        <td >
                                            {/* <Link to={"/edit/"+record.id}><span className="edit-btn me-1">Edit</span></Link> */}
                                            <span className="edit-btn me-1" onClick={() => { setIsedit(true); setId(record.id) }}>Edit</span>
                                            <span onClick={() => { handleDelete(record.id) }} className="back-btn me-1">Delete</span>
                                            {/* <Link to={"/view/"+record.id}><span className="view-btn">View</span></Link> */}
                                            <span className="view-btn" onClick={() => { setView(true); setSelectedRecord(record) }}>View</span>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>}
        </div>
    );
}
const CreateRecord = (props) => {
    const { setIsadd } = props;
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('')
    const [prescription, setPrescription] = useState('')
    const [error, setError] = useState("")
    const [checkValid, setCheckValid] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        var formattedDate;
        if (date) { formattedDate = new Date(date).toISOString().split('T')[0]; }
        const record = {
            patient_id: patientId,
            doctor_id: doctorId,
            date: formattedDate,
            diagnosis: diagnosis,
            prescription: prescription,
            notes: notes
        }
        await axios.post('http://localhost:8080/medical-records', record).then((response) => {
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Record Added',
                showConfirmButton: false,
                timer: 1500
            })
            props.fetchRecords();
            setIsadd(false);
        })
    }
    const validate = async () => {
        var a = false, b = false;
        if (patientId.length !== 0 && doctorId.length !== 0) {
            await axios.get(`http://localhost:8080/patient/${parseInt(patientId)}`).then((response) => {
                if (!response.data) {
                    a = false;
                    console.log("Patient not found with id : " + patientId);
                }
                else {
                    a = true;
                    console.log("Patient found with id : " + patientId)
                }
            }).catch((err) => {
                console.log(err);
            })
            await axios.get(`http://localhost:8080/staff/${doctorId}`).then((response) => {
                console.log(response);
                if (!response.data) {
                    b = false;
                    console.log("Doctor not found with id : " + doctorId);
                }
                else {
                    if (response.data.jobTitle.toLowerCase()==="doctor") {
                        b = true;
                        console.log("Doctor found with id : " + doctorId)
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
            if (a === true && b === false) {
                setError("Invalid Doctor Id : " + doctorId);
            }
            else if (a === false && b === false) {
                setError("Invalid Doctor Id and Patient Id");
            }
            else if (a === false && b === true) {
                setError("Invalid Patient Id : " + patientId);
            }
            setCheckValid((a === true && b === true) ? true : false);
        }
        else {
            return;
        }
    }
    return (
        <div className="mt-4">
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2 className="text-center">Create Medical Record</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="">
                                            <label>Patient Id</label>
                                            <input required value={patientId} onChange={(e) => { setPatientId(e.target.value); setCheckValid(false); setError("") }} className="form-control"></input>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="">
                                            <label>Doctor Id</label>
                                            <input value={doctorId} onChange={(e) => { setDoctorId(e.target.value); setCheckValid(false); setError("") }} className="form-control" required></input>
                                            <br />
                                            {!checkValid && <span className="continue-btn" onClick={validate}>Continue</span>}
                                            {/* {!checkValid && <Link to="/Dashboard/emr"><span className="back-btn" >Cancel</span></Link>} */}
                                            {!checkValid && <span className="back-btn" onClick={() => setIsadd(false)}>Cancel</span>}
                                            {!checkValid && <span style={{ color: "red", marginLeft: "5rem" }}>{error}</span>}
                                        </div>
                                    </div>
                                    {checkValid &&
                                        <>
                                            <div className="">
                                                <div className="">
                                                    <label>Date</label>
                                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Diagnosis</label>
                                                    <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="form-control" required></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Prescription</label>
                                                    <input value={prescription} onChange={(e) => setPrescription(e.target.value)} className="form-control" required></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Notes</label>
                                                    <input value={notes} onChange={(e) => setNotes(e.target.value)} className="form-control" required></input>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="mt-3">
                                                    <button className="continue-btn" type="submit">Save</button>
                                                    <span className="back-btn" onClick={() => setIsadd(false)}>Back</span>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>

                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}


const EditRecord = (props) => {
    const { setIsedit, id, setId } = props;
    const [newid, setNewId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('')
    const [prescription, setPrescription] = useState('')
    const [valid, setValid] = useState(false);
    const [checkValid, setCheckValid] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchRecord = async () => {
            await axios.get(`http://localhost:8080/medical-records/${id}`).then((response) => {
                setValid(true);
                setNewId(response.data.id)
                setPatientId(response.data.patient_id)
                setDoctorId(response.data.doctor_id)
                setDate(response.data.date)
                setDiagnosis(response.data.diagnosis)
                setPrescription(response.data.prescription)
                setNotes(response.data.notes)

            }).catch((err) => {
                setValid(false);
            })
        }
        fetchRecord();
    }, [id]);


    const handlesubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const updatedRecord = {
            id: newid,
            patient_id: patientId,
            doctor_id: doctorId,
            diagnosis: diagnosis,
            date: formattedDate,
            prescription: prescription,
            notes: notes
        }

        await axios.put(`http://localhost:8080/medical-records`, updatedRecord).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',
                showConfirmButton: false,
                timer: 1000
            })
            setIsedit(false);
            setId('');
            props.fetchRecords();
        }).catch((err) => {
            console.log(err);
        })
    }

    const validate = async (e) => {
        e.preventDefault();
        var a = false, b = false;
        if (patientId.length !== 0 && doctorId.length !== 0) {
            await axios.get(`http://localhost:8080/patient/${parseInt(patientId)}`).then((response) => {
                if (!response.data) {
                    a = false;
                    console.log("Patient not found with id : " + patientId);
                }
                else {
                    a = true;
                    console.log("Patient found with id : " + patientId)
                }
            }).catch((err)=>{
                console.log(err);
            })
            await axios.get(`http://localhost:8080/staff/${doctorId}`).then((response) => {
                if (!response.data) {
                    b = false;
                    console.log("Doctor not found with id : " + doctorId);
                }
                else {
                    if (response.data.jobTitle.toLowerCase()==="doctor") {
                        b = true;
                        console.log("Doctor found with id : " + doctorId)
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
            if (a === true && b === false) {
                setError("Invalid Doctor Id : " + doctorId);
            }
            else if (a === false && b === false) {
                setError("Invalid Doctor Id and Patient Id");
            }
            else if (a === false && b === true) {
                setError("Invalid Patient Id : " + patientId);
            }
            setCheckValid((a === true && b === true) ? true : false);
        }
        else {
            return;
        }

    }
    return (

        <div className="mt-3 mb-4">
            {valid ? (<div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2 className="text-center">Edit Record</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="">
                                            <label>Id</label>
                                            <input value={newid} onChange={(e) => setNewId(e.target.value)} disabled="disabled" className="form-control" required></input>
                                            <br />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="">
                                            <label>Patient Id</label>
                                            <input value={patientId} onChange={(e) => { setPatientId(e.target.value); setCheckValid(false); setError("") }} className="form-control" required></input>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="">
                                            <label>Doctor Id</label>
                                            <input value={doctorId} onChange={(e) => { setDoctorId(e.target.value); setCheckValid(false); setError("") }} className="form-control" required></input>
                                            <br />
                                            {!checkValid && <button className="btn btn-primary" onClick={validate} type="button">Continue</button>}

                                            {!checkValid && <span className="back-btn mt-1 ms-4" onClick={() => { setIsedit(false); setId('') }}>Cancel</span>}
                                            {!checkValid && <span style={{ color: "red", marginLeft: "5rem" }}>{error}</span>}
                                        </div>
                                    </div>

                                    {checkValid &&
                                        <>
                                            <div className="">
                                                <div className="">
                                                    <label>Date</label>
                                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Diagnosis</label>
                                                    <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="form-control"></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Prescription</label>
                                                    <input value={prescription} onChange={(e) => setPrescription(e.target.value)} className="form-control"></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="">
                                                <div className="">
                                                    <label>Notes</label>
                                                    <input value={notes} onChange={(e) => setNotes(e.target.value)} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mt-3">
                                                    <button className="view-btn me-3 mt-1" type="submit">Save</button>
                                                    <button className="back-btn" onClick={()=>{setIsedit(false);setId('')}}>Back</button>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>

                    </form>

                </div>
            </div>) : <h2 className="text-center">Page Not Found</h2>}
        </div>
    );
}


const ViewRecord = (props) => {
    const { record, setView } = props;
    const [patient, setPatient] = useState({});
    const [doctor, setDoctor] = useState({});
    const [printMode, setPrintMode] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            await axios.get(`http://localhost:8080/patient/${record.patient_id}`).then((response) => {
                setPatient(response.data);
            });
            await axios.get(`http://localhost:8080/staff/${record.doctor_id}`).then((response) => {
                setDoctor(response.data);
            })
        } catch (error) {
            console.error('Error fetching patient and doctor data:', error);
        }
    }, [record]);
    useEffect(() => {
        if (record.patient_id && record.doctor_id) {
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
                    {/* <Link to="/Dashboard/emr"><span className="back-btn" style={{ width: "100px" }}>Back</span></Link> */}
                    <span className="back-btn" style={{ width: "100px" }} onClick={() => { setDoctor(''); setPatient(''); setView(false); }}>Back</span>
                    <span className="back-btn" onClick={handlePrint} style={{ width: "100px" }}>Print</span>
                </div>}
            </div>
        </>

    );
}

const RecordDetails = ({ record }) => {
    return (
        <div className="section">
            <h3 className="section-heading record-heading">Medical Record Information</h3>
            {record && <div className="record-details details-grid">
                <div className="row">
                    <span className="label">Date:</span>
                    <span className="value">{record.date}</span>
                </div>

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
            </div>}
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


export default RecordList;
