import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../UsuarioSubirComicForm/UsuarioSubirComicForm.css";
import Boton from "../Boton/Boton";

const FormularioIntercambio = () => {
  const { id } = useParams(); // Obtiene el ID del cómic desde la URL
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [comentario, setComentario] = useState("");
  const [estadoIntercambio, setEstadoIntercambio] = useState("");
  const [error, setError] = useState(null); // Para mostrar errores en la UI

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reinicia el error al enviar el formulario

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Debes iniciar sesión para ofertar un cómic.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/comics-subidos-usuario/ofertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comic_id: id, 
          comentario, 
          estado_intercambio: estadoIntercambio
        }),
      });

      const data = await response.json(); // Obtener respuesta del backend

      if (!response.ok) {
        setError(data.message || "Error al ofertar el cómic");
        return;
      }

      alert("Cómic ofertado exitosamente");
      navigate("/mis-comics"); // Redirige de vuelta a la lista de cómics después de ofertar
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un error en el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          Ofertar Cómic
        </div>
        <div className="card-body custom-body">
          {/* Mostrar mensaje de error si existe */}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <textarea
                className="form-control"
                id="comentario"
                placeholder="Escribe un comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="estado_intercambio">Estado del Intercambio</label>
              <input
                type="text"
                className="form-control"
                id="estado_intercambio"
                placeholder="Ejemplo: Disponible, Solo venta, Acepto cambios"
                value={estadoIntercambio}
                onChange={(e) => setEstadoIntercambio(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Boton type="submit">CONFIRMAR OFERTA</Boton>
              <Boton type="button" className="btn-danger" onClick={() => navigate("/mis-comics")}>CANCELAR</Boton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioIntercambio;


