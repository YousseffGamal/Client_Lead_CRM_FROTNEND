import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

const chipDropdown = ({ label, value, onChange, options, disabled }) => {
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.label} // Correct property to display county name
      value={value.value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={`Select ${label}`}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.value} // Use unique value for key
            label={option.label} // Display the county name
            {...getTagProps({ index })}
          />
        ))
      }
      disabled={disabled}
      sx={{ marginBottom: "52px" }} // Adjust margin as needed
    />
  );
};

export default chipDropdown;
