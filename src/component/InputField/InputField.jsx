import React from "react";
import { Box, InputLabel, TextField } from "@mui/material";

const InputField = ({
  state,
  fieldName,
  handleChange,
  type,
  label,
  placeHolder,
  required,
}) => {
  return (
    <Box sx={{ flex: 1, position: "relative" }}>
      <InputLabel
        htmlFor={fieldName}
        sx={{
          position: "absolute",
          left: "10px",
          top: "20px",
          backgroundColor: "#FFFFFF",
          padding: "0 5px",
          zIndex: 1,
          color: "#191919",
          fontFamily: "LufgaMedium !important",
        }}
        shrink={!!fieldName}
      >
        {label}
      </InputLabel>
      <TextField
        id={fieldName}
        variant="outlined"
        name={fieldName}
        type={type ? type : ""}
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          height: "63px",
          "& .MuiOutlinedInput-root": {
            border: "none",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
        inputProps={{
          style: { textAlign: "center", paddingTop: "15px" },
        }}
        placeholder={placeHolder}
        value={state}
        onChange={handleChange}
        required={required}
      />
    </Box>
  );
};

export default InputField;
