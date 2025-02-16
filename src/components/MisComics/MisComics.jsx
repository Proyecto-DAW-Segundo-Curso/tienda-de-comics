import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MisComics.css";

const MisComics = () => {
  const [comicsSubidos, setComicsSubidos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const obtenerComicsSubidos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/comics-subidos-usuario", {
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
    navigate(`/editar-comic-usuario/${comic.id}`, { state: { comic } });
  };

  const eliminarComic = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este cómic?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/comics-subidos-usuario/${id}`, {
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
    <div className="container mt-5">
      <div className="card rounded custom-body">
        <div className="text-center card-header custom-header text-white fw-bold">
          MIS CÓMICS SUBIDOS
        </div>

        <div className="card-body d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por título..."
            className="form-control w-50"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="card-body">
          {comicsSubidos.length === 0 ? (
            <div className="text-center text-danger">No has subido cómics aún.</div>
          ) : (
            <div className="row">
              {comicsSubidos.map((comic) => (
                <div className="col-md-4 mb-4" key={comic.id}>
                  <div className="card h-100">
                    <img
                      src={comic.imagen || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"}
                      className="card-img-top"
                      alt={comic.titulo}
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{comic.titulo}</h5>
                      <p className="card-text">
                        <strong>Autor:</strong> {comic.autor} <br />
                        <strong>Editorial:</strong> {comic.editorial} <br />
                        <strong>Género:</strong> {comic.genero} <br />
                        <strong>Precio:</strong> ${comic.precio.toFixed(2)} <br />
                        <strong>Stock:</strong> {comic.stock}
                      </p>
                      <div className="d-flex flex-column">
                        <button className="btn btn-primary mb-2">Ofertar</button>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-warning" onClick={() => editarComic(comic)}>Editar</button>
                          <button className="btn btn-danger" onClick={() => eliminarComic(comic.id)}>Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="volver-container">
            <button className="btn custom-button" onClick={() => navigate("/zona-usuario")}>
              VOLVER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisComics;

