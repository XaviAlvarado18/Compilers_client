import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { materialDark } from '@uiw/codemirror-theme-material';
import OutputBox from '../OutputBox/OutputBox';
import './styles.css'

const GridEditor = () => {
  const [code, setCode] = useState('');

  return (
    <div className="grid-container">
        <div className='editor'>
            <CodeMirror
                value={code}
                height="93.0vh"
                width="64vw"
                extensions={[basicSetup(), javascript()]}
                theme={materialDark}
                onChange={(value) => setCode(value)}
            />
        </div>
        <div className="input">
            <OutputBox output={code} border="1px solid green" backgroundColor="#1F1A24"/>
        </div>
        <div className="output">
            <OutputBox border="0.1px solid white" backgroundColor="#1F1A24"/>
        </div>
    </div>
  );
};

export default GridEditor;
