import React from 'react';
import './BotonFinalizar.css';


function BotonFinalizar(props) {
  return (
    
    <div>
      <button type='submit' className='btn-fin' onClick={props.onClick}>{props.children}</button>
    </div>
  )
};

export default BotonFinalizar;