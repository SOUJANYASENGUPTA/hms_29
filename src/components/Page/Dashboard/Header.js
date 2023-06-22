import React from 'react';
import Dashboard from './EmpDash';
import { Link } from 'react-router-dom';

function Header({ setIsAdding, setIsPayroll, setIsScheduler }) {
  const handleOpenPayroll = () => {
    setIsPayroll(true);
  };

  const handleOpenScheduler = () => {
    setIsScheduler(true); // Set isScheduler state to open the scheduler
  };


  return (

    <header>

      <h1 style={{marginTop :'30px' , fontWeight :'600' ,color:"gray"}}>Employee Management </h1>
      <div style={{ marginTop: '30px', marginBottom: '18px'}}>
        <button onClick={() => setIsAdding(true)} className='round-button' style={{ margin :'10px', margin :'10px', background : 'teal', color :"white", padding :'10px'}}>Add Employee</button>
        <button onClick={handleOpenPayroll} className='round-button' style={{ margin :'10px', margin :'10px', background : 'teal', color :"white", padding :'10px'}}>Open Payroll</button>
        <button onClick={handleOpenScheduler} className='round-button' style={{ margin :'10px', margin :'10px', background : 'teal', color :"white", padding :'10px'}}>Add Schedule</button>
        <Link to="/Dashboard"  className='round-button' style={{ margin :'10px', marginLeft :'600px', background : 'teal', color :"white", padding :'10px' , fontWeight :'200', cursor: 'pointer',
    transition: 'background-color 0.3s ease'}}>Back to Dashboard</Link>
        {/* <button onClick={Dashboard} className='round-button'>Back to Dashboard</button> */}
      </div>
    </header>
  );
}

export default Header;
