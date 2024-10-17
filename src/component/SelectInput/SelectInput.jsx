// src/component/SelectInput.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <FormControl fullWidth variant="standard" sx={{ marginBottom: "52px" }}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
