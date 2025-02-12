import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsuarioSubirComicForm.css";

const UsuarioSubirComicForm = () => {
  const navigate = useNavigate();
  const [comic, setComic] = useState({
    titulo: "",
    autor: "",
    editorial: "",
    genero: "",
    precio: "",
    imagen: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComic({ ...comic, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("📌 Enviando datos al servidor:", JSON.stringify(comic));

    try {
        const response = await fetch("http://localhost:3001/api/comics_subidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(comic),
        });

        console.log("📌 Código de respuesta:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("🔥 Error del servidor:", errorData);
            throw new Error(errorData.message || "Error en el servidor");
        }

        alert("Cómic agregado con éxito");
        navigate("/mis-comics");
    } catch (error) {
        console.error("🔥 Error al subir el cómic:", error);
        alert("Error al procesar la solicitud.");
    }
};

  return (
    <div className="usuario-subir-comic-container">
      <h2 className="custom-header text-white text-center">Subir Nuevo Cómic</h2>
      <div className="usuario-subir-comic-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" name="titulo" className="form-control" onChange={handleInputChange} value={comic.titulo} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Autor</label>
            <input type="text" name="autor" className="form-control" onChange={handleInputChange} value={comic.autor} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Editorial</label>
            <input type="text" name="editorial" className="form-control" onChange={handleInputChange} value={comic.editorial} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Género</label>
            <input type="text" name="genero" className="form-control" onChange={handleInputChange} value={comic.genero} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input type="number" name="precio" className="form-control" onChange={handleInputChange} value={comic.precio} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input type="text" name="imagen" className="form-control" onChange={handleInputChange} value={comic.imagen} required />
          </div>

          <div className="button-container">
            <button type="submit" className="btn btn-primary">Subir Cómic</button>
            <button onClick={() => navigate("/zona-usuario")} className="btn btn-secondary">
              Volver a Zona de Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuarioSubirComicForm;