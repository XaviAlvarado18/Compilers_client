import React from 'react';
import { FaTree } from 'react-icons/fa'; // Importa el icono de 'tree'
import './TreeButton.css'; // Importa el archivo CSS

const TreeButton = ({ onClick }) => {
  return (
    <button className="buttonTree" onClick={onClick}>
      <FaTree className="icon" /> Tree
    </button>
  );
};

export default TreeButton;