import React from 'react'
import './NavBar.css'
import Boton from '../Boton/Boton'

function NavBar({navegarNavBar}) {
  return (
    <div className='nav-bar'>
      <Boton onClick={() => navegarNavBar("home")}>INICIO</Boton>
      <Boton>CÓMICS</Boton>
      <Boton>MANGA</Boton>
      <Boton>NOVEDADES</Boton>
      <Boton>ESPECIALES</Boton>
    </div>
  )
} 

export default NavBar