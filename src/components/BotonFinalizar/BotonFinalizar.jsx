import React from 'react';
import './BotonFinalizar.css';
import { Navigate } from 'react-router-dom';
import FinCompra from '../../FinCompra/FinCompra';

function BotonFinalizar(props) {
  return (
    <div>
      <button type='submit' className='btn-fin' onClick={() => Navigate(FinCompra)}>{props.children}</button>
    </div>
  )
};

export default BotonFinalizar;
