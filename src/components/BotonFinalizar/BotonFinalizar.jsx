import React from 'react';
import './BotonFinalizar.css';
import { useNavigate } from 'react-router-dom';

function BotonFinalizar(props) {

  const navigate = useNavigate();

  return (
    <div>
      <button 
        type='submit'   
        className='btn-fin' 
        onClick={() => {
          navigate('/fin-compra');
          console.log('fin');
        }}
      >
        {props.children}
      </button>
    </div>
  )
};

export default BotonFinalizar;
