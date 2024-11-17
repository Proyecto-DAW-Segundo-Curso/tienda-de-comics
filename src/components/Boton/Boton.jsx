import React from 'react';
import './Boton.css';

function Boton(props) {
  return (
    <div>
      <div className='boton'>{props.children}</div>
    </div>
  )
};

export default Boton;