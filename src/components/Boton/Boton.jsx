import React from 'react';
import './Boton.css';


function Boton(props) {
  return (
    
    <div >
      <button type={props.type} className={`custom-button fw-bold d-flex justify-content-center align-items-center rounded-1 px-3 py-1 ${props.className}`} onClick={props.onClick}>{props.children}</button>
    </div>
  )
};

export default Boton;