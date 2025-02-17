import React from 'react'
import './NavBar.css'
import Boton from '../Boton/Boton'
import { Navigate, useNavigate } from 'react-router-dom'


function NavBar({navegarNavBar}) {
  return (
    <div className='nav-bar'>
      <Boton onClick={() => navegarNavBar("/")}>INICIO</Boton>
      <Boton onClick={() => navegarNavBar("/pag-comic")}>CÓMICS</Boton>
      <Boton onClick={() => navegarNavBar("/pag-manga")}>MANGA</Boton>
      <Boton onClick={() => navegarNavBar("/merchan")}>MERCHANDISING</Boton>
      <Boton onClick={() => navegarNavBar("/intercambio")}>INTERCAMBIO</Boton>
    </div>
  )
} 

export default NavBar;