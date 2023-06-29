import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const EditRecord = () => {
    const { id } = useParams();
    const [newid, setNewId] = useState('')
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('')
    const [prescription, setPrescription] = useState('')
    const [valid, setValid] = useState(false);
    const [checkValid, setCheckValid] = useState(false);
    const[error,setError]=useState("");
    useEffect(() => {
        const fetchRecord = async () => {
            await axios.get(`http://localhost:8080/medical-records/${id}`).then((response) => {
                setValid(true);
                setNewId(response.data.id)
                setPatientId(response.data.patientId)
                setDoctorId(response.data.doctorId)
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

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const updatedRecord = {
            id: newid,
            patientId: patientId,
            doctorId: doctorId,
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
            navigate('/Dashboard/emr')
        }).catch((err) => {
            console.log(err);
        })
    }
    
    const validate = async () => {
        var a=false,b=false;
        if(patientId.length!==0 && doctorId.length!==0){
            await axios.get(`http://localhost:8080/patient/${parseInt(patientId)}`).then((response) => {
                if (!response.data) {
                    a=false;
                    console.log("Patient not found with id : "+patientId);
                }
                else{
                    a=true;
                    console.log("Patient found with id : "+patientId)
                }
            })
            await axios.get(`http://localhost:8080/staff/doctor/${doctorId}`).then((response) => {
                if (!response.data) {
                    b=false;
                    console.log("Doctor not found with id : "+doctorId);
                }
                else{
                    b=true;
                    console.log("Doctor found with id : "+doctorId)
                }
            })
            if(a===true && b===false){
                setError("Invalid Doctor Id : "+doctorId);
            }
            else if(a===false && b===false){
                setError("Invalid Doctor Id and Patient Id");
            }
            else if(a===false && b===true){
                setError("Invalid Patient Id : "+patientId);
            }
            setCheckValid((a===true && b===true)?true:false);
        }
        else {
            return;
        }
       
    }
    return (

        <div className="container mt-3 mb-4">
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
                                        <div className="form-group">
                                            <label>Id</label>
                                            <input value={newid} onChange={(e) => setNewId(e.target.value)} disabled="disabled" className="form-control" required></input>
                                            <br />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Patient Id</label>
                                            <input  value={patientId} onChange={(e) => {setPatientId(e.target.value);setCheckValid(false);setError("")}}  className="form-control" required></input>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Doctor Id</label>
                                            <input value={doctorId} onChange={(e) => {setDoctorId(e.target.value);setCheckValid(false);setError("")}} className="form-control" required></input>
                                            <br />
                                            {!checkValid && <button className="btn btn-primary mt-1" onClick={validate} type="button">Continue</button>} 
                                            {!checkValid && <Link to="/" className="btn btn-danger mt-1 ms-4">Cancel</Link>}
                                            {!checkValid && <span style={{color:"red",marginLeft:"5rem"}}>{error}</span>}   
                                        </div>
                                    </div>

                                    {checkValid &&
                                        <>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Date</label>
                                                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Diagnosis</label>
                                                    <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} className="form-control"></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Prescription</label>
                                                    <input value={prescription} onChange={(e) => setPrescription(e.target.value)} className="form-control"></input>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Notes</label>
                                                    <input value={notes} onChange={(e) => setNotes(e.target.value)} className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mt-3">
                                                    <button className="btn btn-success  me-3" type="submit">Save</button>
                                                    <Link to="/" className="btn btn-danger ">Back</Link>
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

export default EditRecord;