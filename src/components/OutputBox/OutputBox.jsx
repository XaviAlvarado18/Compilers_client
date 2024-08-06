import React from 'react';
import './OutputBox.css';


const OutputBox = ({ output, border, backgroundColor }) => {

    return (
      <div 
        className="output-box"
        style={{border, backgroundColor}}
      >
        <pre>{output}</pre>
      </div>
    );
  }

export default OutputBox;