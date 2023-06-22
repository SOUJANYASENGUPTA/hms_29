import React, { useState } from 'react'
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../redux';

function Edit({ selectedEmployee, setIsEditing }) {
    const dispatch = useDispatch();

    const id = selectedEmployee.id;

    const [Name, setName] = useState(selectedEmployee.Name);
    const [address, setAddress] = useState(selectedEmployee.address);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [date, setDate] = useState(selectedEmployee.date);
    const [num, setNum] = useState(selectedEmployee.num);
    const [age, setAge] = useState(selectedEmployee.age);
    const [job, setJob] = useState(selectedEmployee.job);
    const [gen, setGen] = useState(selectedEmployee.gen);
    const [ben, setBen] = useState(selectedEmployee.ben);
    const handleUpdate = e => {
        e.preventDefault();

        if (!Name || !address || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const employee = {
            id,
            Name,
            address,
            email,
            salary,
            date,
            num,
            age,
            job,
            gen,
            ben
        };

        dispatch(updateEmployee(id, employee));
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.Name} ${employee.address}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1 style={{color:"grey"}}>Edit Employee</h1>
                <label htmlFor="Name">Name</label>
                <input
                    id="Name"
                    type="text"
                    name="Name"
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="address">address</label>
                <input
                    id="address"
                    type="text"
                    name="add"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="salary">Salary (₹)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <label htmlFor="num">contact number</label>
                <input
                    id="num"
                    type="number"
                    name="numb"
                    value={num}
                    onChange={e => setNum(e.target.value)}
                />
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    name="numb"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <label htmlFor="job">jobtitle</label>
                <input
                    id="job"
                    type="text"
                    name="job"
                    value={job}
                    onChange={e => setJob(e.target.value)}
                />
                <label htmlFor="gen">gender</label>
                <input
                    id="gen"
                    type="text"
                    name="gen"
                    value={gen}
                    onChange={e => setGen(e.target.value)}
                />
                <label htmlFor="ben">benefits</label>
                <input
                    id="ben"
                    type="text"
                    name="ben"
                    value={ben}
                    onChange={e => setBen(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit