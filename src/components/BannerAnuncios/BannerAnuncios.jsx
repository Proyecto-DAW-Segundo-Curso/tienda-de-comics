import React from 'react'
import './BannerAnuncios.css'
import { PiArrowCircleLeftLight, PiArrowCircleRightLight } from "react-icons/pi";
import Noticia from "../../img/Awesome_4K_Marvel.jpg";

function BannerAnuncios() {
  return (
    <div className='banner-anuncios'>

      <div className="contenedor-anuncios">
        <div className="boton-circular">
          <PiArrowCircleLeftLight />
        </div>
        <div className="anuncios">
          <img src={Noticia} alt="noticia" className='noticia' />
        </div>
        <div className="boton-circular">
          <PiArrowCircleRightLight />
        </div>


      </div>
      <div className="contenedor-circulos">
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo"></div>
        <div className="circulo selected"></div>
      </div>

    </div>
  )
}

export default BannerAnuncios