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
    <div className="container" style={{marginTop :'30px', backgroundImage :`url('https://img.freepik.com/free-vector/abstract-background-with-wavy-lines_69286-196.jpg?w=996&t=st=1687358391~exp=1687358991~hmac=0060c2eb116904eddd9afb9f8098a1bf7df0428e738e8b814452c7750dbe8ffa')` ,backgroundRepeat :'no-repeat'}}>
      <h3>Employee Salary Calculation</h3>

      <div className="form-group" style={{marginTop :'15px'}}>
        <label style={{padding:'10px' , margin: '10px'}}>Employee Name</label>
        <input type="text" className="form-control" placeholder="Employee Name" style={{padding:'10px' , margin: '10px'}} />
      </div>

      <div className="form-group" style={{marginTop :'15px'}}>
        <label style={{padding:'10px' , margin: '10px'}}>Salary</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)
          }
          style={{padding:'10px' , margin: '10px'}}
        />
      </div>

      <div className="form-group" style={{marginTop :'15px'}}>
        <label style={{padding:'10px' , margin: '10px'}}>Tax</label>
        <input type="text" className="form-control" placeholder="Tax" value={tax} readOnly style={{padding:'10px' , margin: '10px'}} />
      </div>

      <div className="form-group" style={{marginTop :'15px'}}>
        <label style={{padding:'10px' , margin: '10px'}}>Net Salary</label>
        <input type="text" className="form-control" placeholder="Net Salary" value={netSalary} style={{padding:'10px' , margin: '10px'}} readOnly />
      </div>

      <button type="submit" onClick={handleCalculation} style={{padding:'10px' , margin: '10px'}} className="btn btn-primary mt-4">Submit</button>
      <button onClick={() => setIsPayroll(false)} style={{padding:'10px' , margin: '10px', color: 'white'} } className="btn btn-primary mt-4">Cancel</button>
      
    </div>
  );
}

export default EmployeeSalary;
