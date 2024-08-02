import React from 'react';
import Button from '@material-ui/core/Button';
import './Button.css'

const CompileButton = ({ onClick }) => {

    return (
      <Button 
        className="button"
        onClick={onClick}
      >
        Compilar
      </Button>
    )
}

export default CompileButton;