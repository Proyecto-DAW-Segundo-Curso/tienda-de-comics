import Logo from '../../img/logo.jpg'
import './Header.css'
import Boton from '../Boton/Boton'
import NavBar from '../NavBar/NavBar'
import Carrito from '../Carrito/Carrito'
import { useNavigate } from 'react-router-dom'


function Header() {

  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='contenedor-logo-botones'>
        <div className='contenedor-logo'>
          <img className='imagen-logo' src={Logo} alt="logo" /> {/* he puesto una clase a la imagen porque si ponemos directamente los estilos a la etuqieta img, afecta a todas las imagenes del proyecto */}
        </div>
       
        <div className='contenedor-botones'>
           
          <Boton onClick={() => navigate("/login")}>MI CUENTA</Boton>          
          <Carrito />

        </div>

      </div>
      <div>
        <NavBar navegarNavBar={navigate} />
      </div>

    </div>
  )
}

export default Header;