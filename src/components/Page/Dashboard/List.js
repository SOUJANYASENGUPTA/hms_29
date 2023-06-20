import React from 'react';
import './List.css';

function List({ employees, handleEdit, handleDelete }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  });

  return (
    <div className="container-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Contact Number</th>
            <th>Age</th>
            <th>Job Title</th>
            <th>Gender</th>
            <th>Benefits</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.Name}</td>
                <td>{employee.address}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date}</td>
                <td>{employee.num}</td>
                <td>{employee.age}</td>
                <td>{employee.job}</td>
                <td>{employee.gen}</td>
                <td>{employee.ben}</td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button-edit"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee)}
                    className="button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Employees
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
