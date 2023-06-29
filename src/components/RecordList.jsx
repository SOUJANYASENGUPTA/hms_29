import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
const RecordList = () => {
    const[records,setRecords]=useState([]);
    const SubmitDelete=async(id)=>{
        await axios.delete(`http://localhost:8080/medical-records/${id}`).then(()=>{
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
    const fetchRecords=async()=>{
        await axios.get('http://localhost:8080/medical-records').then((response)=>{
            setRecords(response.data);
        })
    }
    useEffect(() => {
     fetchRecords();
    }, [])
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-title">
                    <h2 className="text-center mt-2">Medical Records</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/create" className="btn btn-success mt-4 mb-4">Add New (+)</Link>
                        <Link to="/Dashboard"  className='round-button' style={{ margin :'10px', marginLeft :'900px', background : 'teal', color :"white", padding :'10px' , fontWeight :'200', cursor: 'pointer',
    transition: 'background-color 0.3s ease'}}>Back to Dashboard</Link>
                    </div>
                    
                    <table className="table table-bordered table-striped">
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
                                        <td>{record.patientId}</td>
                                        <td>{record.doctorId}</td>
                                        <td>{record.date}</td>
                                        <td >
                                            <Link to={"/edit/"+record.id}><button className="btn btn-success m-1">Edit</button></Link> 
                                            <button onClick={() => { handleDelete(record.id) }} className="btn btn-danger m-1">Delete</button>
                                            <Link to={"/view/"+record.id}><button className="btn btn-primary m-1">View</button></Link>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecordList;