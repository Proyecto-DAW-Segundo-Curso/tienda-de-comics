import React from 'react';
import './BotonComprarFin.css';

function BotonComprarFin({ onClick }) {
  return (
    <div className='btn-comprar' onClick={onClick}>
      <h3>Finalizar compra</h3>
    </div>
  );
}

export default BotonComprarFin;
