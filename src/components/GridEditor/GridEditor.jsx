import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { materialDark } from '@uiw/codemirror-theme-material';
import OutputBox from '../OutputBox/OutputBox';
import CompileButton from '../Button/Button';
import TreeButton from '../TreeButton/TreeButton';
import './styles.css'

const GridEditor = () => {
  const [code, setCode] = useState('');
  const [parseTree, setParseTree] = useState('');

  const handleCompile = async () => {
    console.log("Compilando...");

    try {
      const response = await fetch('http://127.0.0.1:5000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // serializar el contenido del editor en JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Compilación exitosa:', result);
      setParseTree(result.parse_tree);
      // Aquí puedes actualizar el estado con el resultado de la compilación si es necesario
    } catch (error) {
      console.error('Error al compilar:', error);
    }

    console.log(JSON.stringify({code}));
    // Aquí puedes añadir la lógica que necesites para compilar
  };


  const handleTree = async () => {
    console.log("Obtain tree...");

    try {
      const response = await fetch('http://127.0.0.1:5000/get-tree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // serializar el contenido del editor en JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Compilación exitosa:', result);
      //setParseTree(result.parse_tree);
      // Aquí puedes actualizar el estado con el resultado de la compilación si es necesario
    } catch (error) {
      console.error('Error al compilar:', error);
    }

    console.log(JSON.stringify({ code }));
    // Aquí puedes añadir la lógica que necesites para compilar
};


  return (
    <div className="grid-container">
        <h1 className="header-text">CompiScript</h1>
        <div className='editor'>
            <CodeMirror
                value={code}
                height="93.0vh"
                width="64.0vw"
                extensions={[basicSetup(), javascript()]}
                theme={materialDark}
                onChange={(value) => setCode(value)}
            />
        </div>
        <div className="input">
            <OutputBox output={code} border="1px solid green" backgroundColor="#1F1A24"/>
        </div>
        <div className="output">
            <OutputBox output={parseTree} border="0.1px solid white" backgroundColor="#1F1A24"/>
        </div>
        <div className="buttonCompile">
            <CompileButton onClick={handleCompile}></CompileButton>
        </div>
        <div className="buttonCompile">
            <TreeButton onClick={handleTree}></TreeButton>
        </div>
    </div>
  );
};

export default GridEditor;
