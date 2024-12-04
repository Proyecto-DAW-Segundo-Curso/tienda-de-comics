import React from 'react';
import './BotonComprar.css';

function BotonComprar({ onClick }) {
  return (
    <div className='btn-comprar' onClick={onClick}>
      <h3>+ Añadir</h3>
    </div>
  );
}

export default BotonComprar;
