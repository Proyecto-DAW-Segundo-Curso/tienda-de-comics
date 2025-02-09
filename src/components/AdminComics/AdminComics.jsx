import React, { useEffect, useState } from 'react';
import './AdminComics.css';
import { useNavigate } from "react-router-dom";

function AdminComics() {
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredComics, setFilteredComics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/comics')
      .then(response => response.json())
      .then(data => {
        setComics(data);
        setFilteredComics(data);
      });
  }, []);

  useEffect(() => {
    const results = comics.filter(comic =>
      comic.titulo.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredComics(results);
  }, [searchText, comics]);

  const eliminarComic = (comicId, titulo) => {
    if (window.confirm(`¿Está seguro de eliminar ${titulo}?`)) {
      fetch(`http://localhost:3001/api/comics/${comicId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setComics(comics.filter(c => c.id !== comicId));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">AdminComics</h1>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={() => navigate("/agregar-comic")}
          className="btn btn-primary btn-lg"
        >
          Añadir Comic
        </button>
        <input
          type="text"
          placeholder="Buscar por título..."
          className="form-control w-50"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      {filteredComics.length === 0 ? (
        <div className="text-center text-danger">Cómic no encontrado</div>
      ) : (
        <div className="row">
          {filteredComics.map(comic => (
            <div className="col-md-4 mb-4" key={comic.id}>
              <div className="card h-100">
                <img
                  src={comic.imagen || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={comic.titulo}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
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
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate(`/editar-comic/${comic.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarComic(comic.id, comic.titulo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminComics;
