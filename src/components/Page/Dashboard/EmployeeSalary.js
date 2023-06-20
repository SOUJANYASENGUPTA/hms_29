import React, { useState } from 'react';

function EmployeeSalary({ setIsPayroll }) {
  const [salary, setSalary] = useState('');
  const [tax, setTax] = useState('');
  const [netSalary, setNetSalary] = useState('');

  const handleCalculation = () => {
    let calculatedTax;
    if (salary > 50000) {
      calculatedTax = salary * 0.1;
    } else if (salary > 30000) {
      calculatedTax = salary * 0.05;
    } else {
      calculatedTax = 0;
    }

    const calculatedNetSalary = salary - calculatedTax;

    setTax(calculatedTax.toFixed(2));
    setNetSalary(calculatedNetSalary.toFixed(2));
  };

  return (
    <div className="container">
      <h3>Employee Salary Calculation</h3>

      <div className="form-group">
        <label>Employee Name</label>
        <input type="text" className="form-control" placeholder="Employee Name" />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Tax</label>
        <input type="text" className="form-control" placeholder="Tax" value={tax} readOnly />
      </div>

      <div className="form-group">
        <label>Net Salary</label>
        <input type="text" className="form-control" placeholder="Net Salary" value={netSalary} readOnly />
      </div>

      <button type="submit" onClick={handleCalculation} className="btn btn-primary mt-4">Submit</button>
      <button onClick={() => setIsPayroll(false)} className="btn btn-secondary mt-2">Cancel</button>
    </div>
  );
}

export default EmployeeSalary;
