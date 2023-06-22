import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../redux';

function Add({ setIsAdding }) {
    const dispatch = useDispatch();
    const { employees } = useSelector(state => state.employees);
    const [Name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');
    const [num, setNum] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [gen, setGen] = useState('');
    const [ben, setBen] = useState('');
    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
        e.preventDefault();
        if (!Name || !address || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
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
        }
        dispatch(addEmployee(newEmployee));
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${Name} ${job}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="small-container" style={{backgroundImage :`url('https://img.freepik.com/free-vector/abstract-triangle-mosaic-background-design_1164-1262.jpg?w=740&t=st=1687358804~exp=1687359404~hmac=0476bae461846e3163d806e8d0596b564a5dc27607433df5b09caaac33163c2f')` ,backgroundRepeat :'no-repeat',backgroundSize:'850px'}}>
            <form onSubmit={handleAdd}>
                <h1 style={{marginTop :'15px', color:'white'}}>Add Employee</h1>
                <label htmlFor="Name">Name</label>
                <input
                    id="Name"
                    type="text"
                    ref={textInput}
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
                <label htmlFor="date">Date of joining</label>
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
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add