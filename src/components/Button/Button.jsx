import React from 'react';
import { FaPlay } from 'react-icons/fa'; // Importa el icono de 'play'
import './Button.css'; // Importa el archivo CSS

const CompileButton = ({onClick}) => {

  return (
    <button className="button" onClick={onClick}>
      <FaPlay className="icon" /> Compile
    </button>
  );
};

export default CompileButton;
