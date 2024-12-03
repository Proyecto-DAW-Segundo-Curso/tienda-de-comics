import React from 'react'
import './NavBar.css'
import Boton from '../Boton/Boton'


function NavBar({navegarNavBar}) {
  return (
    <div className='nav-bar'>
      <Boton onClick={() => navegarNavBar("home")}>INICIO</Boton>
      <Boton>CÓMICS</Boton>
      <Boton>MANGA</Boton>
      <Boton>MERCHANDISING</Boton>
      <Boton onClick={() => navegarNavBar("intercambio")}>INTERCAMBIO</Boton>
      <Boton onClick={() => navegarNavBar("zona-usuario")}>ZONA USUARIO</Boton>

    </div>
  )
} 

export default NavBar