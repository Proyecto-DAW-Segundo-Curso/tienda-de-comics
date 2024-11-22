import React from 'react';
import Datos from '../../data/data.json';
import portada from '../../img/portadaManga.png';
import './PortadaComic.css';

function PortadaComic1() {

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

export default PortadaComic1;