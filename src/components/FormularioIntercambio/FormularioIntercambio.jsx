import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../UsuarioSubirComicForm/UsuarioSubirComicForm.css";

const FormularioIntercambio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState("");
  const [estadoIntercambio, setEstadoIntercambio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para ofertar un cómic.");
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
          estado_intercambio: estadoIntercambio,
        }),
      });

      if (!response.ok) throw new Error("Error al ofertar cómic");

      alert("Cómic ofertado exitosamente");
      navigate("/mis-comics");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al ofertar el cómic");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          Ofertar Cómic
        </div>
        <div className="card-body custom-body">
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
                placeholder="Ejemplo: Disponible, Interesado en cambios, Solo venta"
                value={estadoIntercambio}
                onChange={(e) => setEstadoIntercambio(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn custom-button fw-bold">
                Confirmar Oferta
              </button>
              <button type="button" className="btn btn-danger" onClick={() => navigate("/mis-comics")}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioIntercambio;
