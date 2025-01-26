import React from 'react';
import './Boton.css';


function Boton(props) {
  return (
    
    <div>
      <div className='boton' onClick={props.onClick}>{props.children}</div>
    </div>
  )
};

export default Boton;