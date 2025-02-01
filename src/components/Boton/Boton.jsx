import React from 'react';
import './Boton.css';


function Boton(props) {
  return (
    
    <div>
      <button type='submit' className='boton' onClick={props.onClick}>{props.children}</button>
    </div>
  )
};

export default Boton;