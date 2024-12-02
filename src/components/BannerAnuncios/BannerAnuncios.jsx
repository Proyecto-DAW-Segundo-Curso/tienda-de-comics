import React from 'react'
import './BannerAnuncios.css'
import { PiArrowCircleLeftLight, PiArrowCircleRightLight } from "react-icons/pi";
import Noticia1 from "../../img/Marvel-slider.png";
import Noticia2 from "../../img/Avengers-slider.png";
import Noticia3 from "../../img/BOKU-slider.png";
import Noticia4 from "../../img/demon-slayer-slider.jpg";
import Noticia5 from "../../img/KONOSUBA-slider.png"

import { useState, useEffect } from 'react';


function BannerAnuncios() {
  //Array que contendrá todas las imagenes que queramos meterle al carrusel
const imgCarrusel = [Noticia1, Noticia2, Noticia3, Noticia4, Noticia5];
// Usestate que contendrá los estados del carrusel
const [imgActual, setImg] = useState(0);

//funciónes para cambiar la imagen del carrusel con botones de forma manual
const haciaAtras = () =>{
  //si la imagen es la primero del array, salta a la última, si no es la ultima va una hacia atrás
  if(imgActual === 0){
    setImg (imgCarrusel.length -1);
  }else{
    setImg(imgActual -1)
  }
}

const haciaAdelante = ()=>{
  //Si la imagen es la última del carrusel, salta a la primera del array, si no lo es, pasa a la siguiente  
  if(imgActual === imgCarrusel.length -1){
    setImg(0);
  }else{
    setImg(imgActual +1);
  }
}

//usamos useEffecty le pasamos como argumentos una constante que almacena setInterval, que recibe a su vez la funcion que hicimos
//previamente para pasar img hacia adelante, y le pasamos también el timer en ms
//y como segundo parametro de useEffect le pasamos imgActual del useState

useEffect(()=>{
  const timer = setInterval(()=>{
    haciaAdelante();
  },3000);

  return () => clearInterval(timer);     //limpia el intervalo para que no se vuelva loco si deja de utilizarse

},[imgActual])



  return (
    <div className='banner-anuncios'>

      <div className="contenedor-anuncios">
        <div className="boton-circular" onClick={haciaAtras}>
          <PiArrowCircleLeftLight />
        </div>
        <div className="anuncios">
          <img src={imgCarrusel[imgActual]} alt="noticia" className='noticia' />
        </div>
        <div className="boton-circular" onClick={haciaAdelante}>
          <PiArrowCircleRightLight />
        </div>
      </div>
       <div className="contenedor-circulos">
        {/* Utilizamos el mapeado, si imgActual coincide con index de circulo pasa clase de este a seleccionada */}
        {imgCarrusel.map((imagen, index) => (
          <div  
            key={index}
            className={`circulo ${index === imgActual ? 'seleccionada' : ''}`}
            onClick={()=>setImg(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default BannerAnuncios