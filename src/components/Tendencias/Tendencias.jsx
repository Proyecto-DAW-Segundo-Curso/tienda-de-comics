import React from 'react'
import "./Tendencias.css";
import Boton from '../Boton/Boton';
import PortadaComic from '../PortadaComic/PortadaComic';
import Paginado from '../Paginado/Paginado'

function Tendencias() {
  return (
    <div className='tendencias'>
      <div className="contenedor-boton">
        <Boton>TENDENCIAS</Boton>
      </div>
      <div className="contenedor-portadas">
        <div className="contenedor-imagenes">
          <PortadaComic className='portadas-imagenes'/>
          <PortadaComic className='portadas-imagenes'/>
          <PortadaComic className='portadas-imagenes'/>
          <PortadaComic className='portadas-imagenes'/>
          <PortadaComic className='portadas-imagenes'/>
        </div>
        <div className="paginado">
          <Paginado></Paginado>
        </div>
      </div>
      
    </div>
  )
}

export default Tendencias