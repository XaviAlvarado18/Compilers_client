import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { materialDark } from '@uiw/codemirror-theme-material';


const GridEditor = () => {
  const [code, setCode] = useState('');

  return (
    <div className="grid-container">
        <div className='editor'>
            <CodeMirror
                value={code}
                height="90vh"
                width="60vw"
                extensions={[basicSetup(), javascript()]} // Asegúrate de llamar a las funciones
                theme={materialDark}
                onChange={(value) => setCode(value)}
            />
        </div>
    </div>
  );
};

export default GridEditor;
