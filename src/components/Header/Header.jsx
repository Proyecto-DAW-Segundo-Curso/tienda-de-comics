import React from 'react'
import Logo from '../../img/logo.jpg'
import './Header.css'
import Boton from '../Boton/Boton'
import BarraBusqueda from '../BarraBusqueda/BarraBusqueda'
import NavBar from '../NavBar/NavBar'

function Header() {
  return (
    <div className='header'>
      <div className='contenedor-logo-botones'>
        <div className='contenedor-logo'>
          <img src={Logo} alt="logo" />
        </div>

        <div className='contenedor-botones'>
          <Boton>MI CUENTA</Boton>
          <div className="barra-busqueda-carrrito">
            <BarraBusqueda />
            
          </div>
        </div>

      </div>
      <div>
        <NavBar />


      </div>

    </div>
  )
}

export default Header