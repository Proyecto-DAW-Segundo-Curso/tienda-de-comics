import React, { useState } from 'react'
import Logo from '../../img/logo.jpg'
import './Header.css'
import Boton from '../Boton/Boton'
import BarraBusqueda from '../BarraBusqueda/BarraBusqueda'
import NavBar from '../NavBar/NavBar'

function Header({navegarHacia}) {

  return (
    <div className='header'>
      <div className='contenedor-logo-botones'>
        <div className='contenedor-logo'>
          <img className='imagen-logo' src={Logo} alt="logo" /> {/* he puesto una clase a la imagen porque si ponemos directamente los estilos a la etuqieta img, afecta a todas las imagenes del proyecto */}
        </div>

        <div className='contenedor-botones'>
          <Boton onClick={() => navegarHacia("login")}>MI CUENTA</Boton>
          <div className="barra-busqueda-carrrito">
            <BarraBusqueda />
            
          </div>
        </div>

      </div>
      <div>
        <NavBar navegarNavBar={navegarHacia}/>
      </div>

    </div>
  )
}

export default Header;