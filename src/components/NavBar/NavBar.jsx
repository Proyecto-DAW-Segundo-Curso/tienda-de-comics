import React from 'react'
import './NavBar.css'
import Boton from '../Boton/Boton'

function NavBar() {
  return (
    <div className='nav-bar'>
      <Boton>INICIO</Boton>
      <Boton>CÓMICS</Boton>
      <Boton>MANGA</Boton>
      <Boton>NOVEDADES</Boton>
      <Boton>ESPECIALES</Boton>
    </div>
  )
}

export default NavBar