// src/component/TextInput.js

import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ label, name, value, onChange, type = "text" }) => { // Default type to 'text'
  return (
    <TextField
      fullWidth
      variant="standard"
      label={label}
      name={name}
      type={type} // Set the input type
      value={value}
      onChange={onChange}
      sx={{
        marginBottom: "52px",
        "& .MuiInputBase-root": {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
        },
        "& .MuiInput-underline:before": {
          borderBottom: "1px solid #000000",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "1px solid #000000",
        },
      }}
    />
  );
};

export default TextInput;
