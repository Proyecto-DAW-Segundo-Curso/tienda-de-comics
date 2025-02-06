import React, { useState } from 'react';

function FormComic() {
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    genero: '',
    precio: '',
    stock: '',
    imagen: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg", // Imagen por defecto
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setComic({ ...comic, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/comics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comic),
      });

      if (response.ok) {
        alert('Cómic agregado exitosamente');
        setComic({
          titulo: '',
          autor: '',
          editorial: '',
          genero: '',
          precio: '',
          stock: '',
          imagen: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
        });
      } else {
        alert('Error al agregar el cómic');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error en el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header bg-primary text-white">
            EDITAR
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagen"
                    placeholder="Escribe aquí"
                    value={comic.imagen}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <img
                    src={comic.imagen}
                    alt="Portada Comic"
                    className="img-fluid"
                    onError={(e) => (e.target.src = "marvel_avengers_50.jpg")}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="titulo">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    placeholder="Escribe aquí"
                    value={comic.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="autor">Autor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="autor"
                    placeholder="Escribe aquí"
                    value={comic.autor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editorial">Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editorial"
                    placeholder="Escribe aquí"
                    value={comic.editorial}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genero">Género</label>
                  <input
                    type="text"
                    className="form-control"
                    id="genero"
                    placeholder="Escribe aquí"
                    value={comic.genero}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="precio">Precio</label>
                      <input
                        type="text"
                        className="form-control"
                        id="precio"
                        placeholder="Escribe aquí"
                        value={comic.precio}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="stock">Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        id="stock"
                        placeholder="Escribe aquí"
                        value={comic.stock}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary btn-block">
                  CONFIRMAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormComic;
