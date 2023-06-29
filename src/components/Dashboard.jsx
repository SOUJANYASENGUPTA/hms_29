import React from "react";
import './Dashboard.css';
import { useNavigate } from "react-router";
const Dash = ({ signOut, user })=>{
const nav = useNavigate();
const Patient=()=>{
     nav("/Dashboard/Patient");
}
const staff=()=>{
  nav("/Dashboard/Staff");
}
const emr=()=>{
  nav("/Dashboard/emr");
}
const pharm=()=>{
  nav("/Dashboard/pharmacy")
}
return(

<div className='bodyc'>    
<div class="ag-format-container">
<div className="buttonc learn-more" onClick={signOut}>
  <span className="buttonc circle" aria-hidden="true">
  <span className="buttonc icon arrow"></span>
  </span>
  <span class="button-text">Sign Out</span>
</div>
  <h1 align="center" style={{margin:"0.2px"}}>Welcome 👩🏼‍⚕️ {user.phoneNumber}</h1>
  <div class="ag-courses_box">
    <div class="ag-courses_item" onClick={Patient}>
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
         Patient Registration Form
        </div>
      </div>
    </div>

    <div class="ag-courses_item">
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Appointment Scheduler
        </div>
      </div>
    </div>

    <div class="ag-courses_item" onClick={emr}>
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Medical Record Viewer
        </div>
      </div>
    </div>

    <div class="ag-courses_item">
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Billing and Invoicing
        </div>

      </div>
    </div>

    <div class="ag-courses_item">
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Inventory Management
        </div>
    </div>
    </div>

    <div class="ag-courses_item" onClick={staff}>
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Employee Management
        </div>
      </div>
    </div>


    <div class="ag-courses_item" onClick={pharm}>
      <div class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
          Pharmacy Management
        </div>


      </div>
    </div>

  </div>
<div>
   
</div>
</div>

</div>);
}
export default Dash;