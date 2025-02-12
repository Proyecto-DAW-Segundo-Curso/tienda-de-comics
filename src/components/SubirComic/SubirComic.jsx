import React from "react";
import UsuarioSubirComicForm from "../UsuarioSubirComicForm/UsuarioSubirComicForm";
import { useNavigate } from "react-router-dom";

const SubirComic = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <UsuarioSubirComicForm />
    </div>
  );
};

export default SubirComic;
