import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../MisComics/MisComics.css";
import Boton from "../Boton/Boton";
import Swal from "sweetalert2";

const MisOfertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const obtenerMisOfertas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/mis-ofertas", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener ofertas");

        const data = await response.json();
        setOfertas(data);
      } catch (error) {
        Swal.fire("Hubo un error al obtener las ofertas");
      }
    };

    obtenerMisOfertas();
  }, []);

  // Redirigir al formulario de edición
  const editarOferta = (intercambioId) => {
    navigate(`/editar-oferta/${intercambioId}`);
  };

  const eliminarOferta = async (intercambioId) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la oferta?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then (async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Se ha eliminado la oferta",
          text: "La oferta ha sido eliminado correctamente",
          icon: "success"
        });

        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:3001/api/intercambios/${intercambioId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            Swal.fire(data.message || "Error al eliminar la oferta.");
            return;
          }
    
          Swal.fire('Oferta eliminada correctamente');
          setOfertas(ofertas.filter(oferta => oferta.intercambio_id !== intercambioId));
        } catch (error) {
          Swal.fire('Hubo un error al eliminar la oferta');
        }
      }
    });
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/intercambios/${intercambioId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.message || "Error al eliminar la oferta.");
        return;
      }

      Swal.fire('Oferta eliminada correctamente');
      setOfertas(ofertas.filter(oferta => oferta.intercambio_id !== intercambioId));
    } catch (error) {
      Swal.fire('Hubo un error al eliminar la oferta');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card rounded custom-body">
        <div className="text-center card-header custom-header text-white fw-bold">
          MIS OFERTAS
        </div>

        <div className="card-body">
          {ofertas.length === 0 ? (
            <div className="text-center text-danger">No has ofertado ningún cómic aún.</div>
          ) : (
            <div className="row">
              {ofertas.map((oferta) => (
                <div className="col-md-4 mb-4" key={oferta.intercambio_id}>
                  <div className="card h-100">
                    <img
                      src={oferta.imagen || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"}
                      className="card-img-top"
                      alt={oferta.titulo}
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{oferta.titulo}</h5>
                      <p className="card-text">
                        <strong>Estado:</strong> {oferta.estado_intercambio} <br />
                        <strong>Comentario:</strong> {oferta.comentario} <br />
                        <strong>Precio:</strong> ${oferta.precio}
                      </p>
                      <div className="d-flex justify-content-between">
                        <Boton className="btn-warning" onClick={() => editarOferta(oferta.intercambio_id)}>EDITAR</Boton>
                        <Boton className="btn-danger" onClick={() => eliminarOferta(oferta.intercambio_id)}>ELIMINAR</Boton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="volver-container">
            <Boton onClick={() => navigate("/zona-usuario")}>VOLVER</Boton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisOfertas;
