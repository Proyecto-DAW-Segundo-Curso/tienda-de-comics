import React from 'react'
import './BarraBusqueda.css'
import { FaSistrix } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

function BarraBusqueda() {
  return (
    <div>
      <div className='contenedor-busqueda'>
        <div className='desplegable'>
          <IoMdMenu />
        </div>
        <input type='text' placeholder='buscar...' />
        <div className='icono-busqueda'>
          <FaSistrix />
        </div>
      </div>
    </div>
  )
}

export default BarraBusqueda