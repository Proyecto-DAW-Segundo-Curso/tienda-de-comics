import React from 'react';
import './PortadaComic.css';

function PortadaComic({src, alt}) {

  return (
    <div className='contenedor-imagen'>
      <img
        // className='imagen-portada'
        src={src}
        alt={alt}
      />
    </div>
  )
}

export default PortadaComic;