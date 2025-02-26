import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../UsuarioSubirComicForm/UsuarioSubirComicForm.css";
import Boton from "../Boton/Boton";
import Swal from "sweetalert2";

const EditarOferta = () => {
  const { id } = useParams(); // ID de la oferta
  const navigate = useNavigate();
  const [comentario, setComentario] = useState("");
  const [estadoIntercambio, setEstadoIntercambio] = useState("");

  useEffect(() => {
    const obtenerOferta = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/api/intercambios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener la oferta");

        const data = await response.json();
        setComentario(data.comentario);
        setEstadoIntercambio(data.estado_intercambio);
      } catch (error) {
        Swal.fire("Hubo un error al obtener la oferta");
      }
    };

    obtenerOferta();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/editar-oferta", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          intercambio_id: id,
          comentario,
          estado_intercambio: estadoIntercambio,
        }),
      });

      if (!response.ok) throw new Error("Error al editar la oferta");

      Swal.fire("Oferta editada correctamente");
        navigate("/mis-ofertas"); // Redirigir a la lista de ofertas después de editar
    } catch (error) {
      Swal.fire("Hubo un error al editar la oferta");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          Editar Oferta
        </div>
        <div className="card-body custom-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="comentario">Comentario</label>
              <textarea
                className="form-control"
                id="comentario"
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
                value={estadoIntercambio}
                onChange={(e) => setEstadoIntercambio(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Boton type="submit">
                GUARDAR CAMBIOS
              </Boton>
              <Boton type="button" className="btn-danger" onClick={() => navigate("/mis-ofertas")}>
                CANCELAR
              </Boton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarOferta;
