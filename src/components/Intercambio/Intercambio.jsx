// src/components/ForoComics.jsx
import React from 'react';
import './Intercambio.css'

const Intercambio = ({ ofertas }) => {
  const getImagenDinamica = (nombre) => { //llamamos a una imagen dinámicamente dentro de la carpeta especificada en el return require de más abajo
    try {
      return require(`../../img/${nombre}`);
    } catch (error) {
      console.error("Imagen no encontrada:", nombre); //Lanza un error si no encuentra la imagen por el nombre introducido
      return ''; // Ruta por defecto o imagen de respaldo
    }
  };
  return (
    <div className="intercambio-contenedor">
     {ofertas.length > 0 ? (
        <div className="tarjetas-container">
          {ofertas.map((oferta, index) => (
            <div className="tarjeta-oferta" key={index}>
              <img src={getImagenDinamica(oferta.imagen)} alt={oferta.titulo} />
              <div className="tarjeta-info">
                <h3>{oferta.titulo}</h3>
                <p>{oferta.descripcion}</p>
                <p className="precio">{oferta.precio}€</p>
                <p className="vendedor">Vendido por: {oferta.vendedor}</p>
                {/* Botones al pie */}
                <div className="tarjeta-botones">
                  <button className="boton-oferta">OFERTA</button>
                  <div className="boton-puntuacion">
                    <button>PUNTUACIÓN</button>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay ofertas disponibles.</p>
      )}
    </div>
  );
};

export default Intercambio;

