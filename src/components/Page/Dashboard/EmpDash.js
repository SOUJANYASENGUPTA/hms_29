import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import EmployeeSalary from './EmployeeSalary';
import Scheduler from './Scheduler'; // Import the Scheduler component
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../../redux';

function Dashboard() {
  const dispatch = useDispatch();
  const { employees } = useSelector(state => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPayroll, setIsPayroll] = useState(false);
  const [isScheduler, setIsScheduler] = useState(false); // Add state for the scheduler

  const handleEdit = (id) => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (employee) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.Name} ${employee.job}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(deleteEmployee(employee.id));
      }
    });
  };

//   const handleOpenPayroll = () => {
//     setIsPayroll(true);
//   };

//   const handleOpenScheduler = () => {
//     setIsScheduler(true); // Set isScheduler state to open the scheduler
//   };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && !isPayroll && !isScheduler && (
        <>
          <Header setIsAdding={setIsAdding} setIsPayroll={setIsPayroll} setIsScheduler={setIsScheduler} />
 
          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* Add */}
      {isAdding && (
        <Add employees={employees} setIsAdding={setIsAdding} />
      )}
      {/* Edit */}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setIsEditing={setIsEditing}
        />
      )}
      {/* Payroll */}
      {isPayroll && (
        <EmployeeSalary setIsPayroll={setIsPayroll} />
      )}
      {/* Scheduler */}
      {isScheduler && (
        <Scheduler setIsScheduler={setIsScheduler} />
      )}
      <img url='https://img.freepik.com/free-vector/group-doctors-standing-hospital-building-team-practitioners-ambulance-car_74855-14034.jpg?w=826&t=st=1687355197~exp=1687355797~hmac=029a1a0c09112d5b858db970849a1a09ba305fcf9e8c796c841f7fabe2a8a0b1'></img>
    </div>
  );
}

export default Dashboard;
