import React from 'react'
import "./Tendencias.css";
import Boton from '../Boton/Boton';

function Tendencias() {
  return (
    <div className='tendencias'>
        <div className="contenedor-boton">
            <Boton>TENDENCIAS</Boton>
        </div>
    <div className="contenedor-portadas"></div>
    </div>
  )
}

export default Tendencias