import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FichaLibro from "../FichaLibro/FichaLibro"; 
import "./MisComics.css"; 

const MisComics = () => {
  const [comicsSubidos, setComicsSubidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const obtenerComicsSubidos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/comics_subidos/usuario", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener cómics");

        const comics = await response.json();
        setComicsSubidos(comics);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    obtenerComicsSubidos();
  }, []);

  const editarComic = (comic) => {
    navigate("/editar-comic", { state: { comic } });
  };

  const eliminarComic = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este cómic?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/comics_subidos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al eliminar cómic");

      setComicsSubidos(comicsSubidos.filter(comic => comic.id !== id));
      alert("Cómic eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Hubo un error al eliminar el cómic");
    }
  };

  return (
    <div className="mis-comics-container">
      <h2 className="titulo-mis-comics">Mis Cómics Subidos</h2>
      <div className="contenedor-comics">
        {comicsSubidos.length > 0 ? (
          comicsSubidos.map((comic) => (
            <div key={comic.id} className="tarjeta-comic">
              <FichaLibro comic={comic} botonTexto="Intercambiar" />
              <div className="botones-comic">
                <button className="btn-editar" onClick={() => editarComic(comic)}>Editar</button>
                <button className="btn-eliminar" onClick={() => eliminarComic(comic.id)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p className="mensaje-vacio">No has subido cómics aún.</p>
        )}
      </div>
      <div className="boton-volver">
        <button onClick={() => navigate("/zona-usuario")} className="btn btn-secondary">Volver a Zona de Usuario</button>
      </div>
    </div>
  );
};

export default MisComics;
