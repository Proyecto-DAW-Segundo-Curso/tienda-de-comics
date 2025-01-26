import React from 'react'
import './NavBar.css'
import Boton from '../Boton/Boton'
import { Navigate, useNavigate } from 'react-router-dom'


function NavBar({navegarNavBar}) {

  return (
    <div className='nav-bar'>
      <Boton onClick={() => navegarNavBar("/")}>INICIO</Boton>
      <Boton>CÓMICS</Boton>
      <Boton>MANGA</Boton>
      <Boton>MERCHANDISING</Boton>
      <Boton onClick={() => navegarNavBar("/intercambio")}>INTERCAMBIO</Boton>
    </div>
  )
} 

export default NavBar