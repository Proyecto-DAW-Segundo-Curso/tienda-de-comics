import React from 'react';
import Datos from '../../data/data.json';
import portada from '../../img/portadaPrueba.png';
import './PortadaComic.css';

function PortadaComic() {

  const datos = Datos;
  console.log(datos);

  return (
    <div className='contenedor-imagen'>
      <img 
        src={portada} 
        alt="portada1"
        className='imagen-portada' 
      />
    </div>
  )
}

export default PortadaComic;