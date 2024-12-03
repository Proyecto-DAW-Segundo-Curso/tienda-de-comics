import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material'; // Importamos el material MUI para las estrellas y su funcionalidad de puntuación con RATING
import './Intercambio.css';
import Chat from '../Chat/Chat.jsx';

const Intercambio = ({ ofertas }) => {
  const [imagenes, setImagenes] = useState({});
  const [puntuaciones, setPuntuaciones] = useState({}); // Almacena las puntuaciones seleccionadas por oferta
  const [mostrarChat, setMostrarChat] = useState(false); // Controla la visibilidad del chat
  const [vendedor, setVendedor] = useState('');

  const getImagenDinamica = async (nombre) => {
    try {
      const modulo = await import(`../../img/${nombre}`); //La promesa await hace una llamada asincrona para obtener la imagen por nombre
      return modulo.default;
    } catch (error) {
      console.error("Imagen no encontrada:", nombre); //Lanza un error si no encuentra la imagen por el nombre introducido
      return ''; // Ruta por defecto o imagen de respaldo
    }
  };

  useEffect(() => {
    const cargarImagenes = async () => {
      const nuevasImagenes = {};
      for (const oferta of ofertas) {
        nuevasImagenes[oferta.imagen] = await getImagenDinamica(oferta.imagen);
      }
      setImagenes(nuevasImagenes);
    };
    cargarImagenes();
  }, [ofertas]);

  const abrirChat = (vendedor) => {
    setVendedor(vendedor);
    setMostrarChat(true);
  };

  const cerrarChat = () => {
    setMostrarChat(false);
    setVendedor('');
  };

  return (
    <div className="intercambio-contenedor">
        {mostrarChat && <Chat vendedor={vendedor} onClose={cerrarChat} />}
      {ofertas.length > 0 ? (
        <div className="tarjetas-container">
          {ofertas.map((oferta, index) => (
            <div className="tarjeta-oferta" key={index}>
              <img
                src={imagenes[oferta.imagen] || 'ruta/respaldo.png'} //Dejamos ruta/respaldo.png como placeholder en caso de que pongamos una imagen de respaldo, pero demomento solo creamos la funcionalidad sin llamar a nada
                alt={oferta.titulo}
              />
              <div className="tarjeta-info">
                <h3>{oferta.titulo}</h3>
                <p>{oferta.descripcion}</p>
                <p className="precio">{oferta.precio}€</p>
                <p className="vendedor">Vendido por: {oferta.vendedor}</p>

                {/* Sistema de puntuación con Material-UI Rating */}
                <div className="boton-puntuacion">
                  <Rating
                    value={puntuaciones[index] || 0} 
                    /* value es el valor actual de las estrellas, es decir, cuántas estrellas están seleccionadas.
                    puntuaciones[index] es el valor actual de la calificación para esa oferta, almacenado en el estado puntuaciones. 
                    Si no hay un valor para esa oferta (es decir, si es undefined o null), se usa 0 como valor predeterminado.
                    Esto permite que el sistema mantenga la puntuación para cada oferta por separado.*/
                    onChange={( event, newValue) => {
                      setPuntuaciones({ ...puntuaciones, [index]: newValue });
                      /* onChange es un evento que se dispara cuando el usuario hace clic en una estrella.
                            El evento pasa dos parámetros:
                                event: El objeto evento, que aunq pone que no se lee, lo que hace es mantener el valor de la puntuación una vez pulsas una estrella
                                newValue: El nuevo valor de la calificación, que indica cuántas estrellas se han seleccionado (por ejemplo, 2.5, 3, 4, etc.).
                        setPuntuaciones({ ...puntuaciones, [index]: newValue }):
                            Aquí estamos actualizando el estado puntuaciones con el nuevo valor de la calificación para la oferta correspondiente.
                            Usamos el index para asegurarnos de que solo se actualice la puntuación de la oferta correcta.
                            { ...puntuaciones, [index]: newValue }: 
                                Este es un patrón de actualización de estado en React. Crea una nueva copia del objeto puntuaciones y actualiza solo el valor correspondiente a la oferta indicada por index.*/
                    }}
                  />
                </div>

                <div className="tarjeta-botones">
                <button
                    className="boton-oferta"
                    onClick={() => abrirChat(oferta.vendedor)}
                  >
                    OFERTA
                  </button>
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
