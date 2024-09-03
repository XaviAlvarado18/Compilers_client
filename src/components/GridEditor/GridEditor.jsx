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
  const [errors, setErrors] = useState('')
  const [symbolData, setSymbolData] = useState(null);


  const handleCompile = async () => {
    console.log("Compilando...");

    try {
      const response = await fetch('http://127.0.0.1:5000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Serializar el contenido del editor en JSON
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Verifica que compile_result existe y tiene las propiedades necesarias
      if (result && result.compile_result) {
        const compileResult = result.compile_result;

        if (compileResult.status === 'success') {
          console.log('Compilación exitosa:', compileResult);
          setParseTree(compileResult.message || compileResult.parse_tree); // Actualiza según tu lógica
        } else if (compileResult.status === 'failure') {
          console.log('Errores semánticos encontrados:');

          // Crear un mensaje o estructura para mostrar los errores
          const errorMessages = compileResult.errors.map(error => 
            `Error: ${error.error_message} en línea ${error.line}, columna ${error.column}`
          ).join('\n');

          console.error(errorMessages); // Muestra los errores en la consola
          
          // Utilizar setParseTree para mostrar los errores en el UI
          setParseTree(errorMessages); // Puedes ajustar esto si necesitas un formato diferente
        }
      } else {
        // Manejar el caso donde compile_result no está presente
        console.error('La respuesta no contiene el campo compile_result:', result);
      }

      // Guardar symbol_data en el estado si está presente
      if (result && result.symbol_data) {
        console.log('Datos de símbolo:', result.symbol_data);
        setSymbolData(result.symbol_data); // Guardar en el estado
      }

    } catch (error) {
      console.error('Error al compilar:', error);
      // Manejar errores que puedan ocurrir durante la llamada fetch
    }

    console.log(JSON.stringify({ code }));
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
        {/* Mostrar symbolData si está disponible */}
        {symbolData && (
          <div className="input">
            <OutputBox output={JSON.stringify(symbolData, null, 2)} border="1px solid blue" backgroundColor="#1F1A24"/>
          </div>
        )}
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
