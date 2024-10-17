import React from "react";
import { Box, InputLabel, Select, MenuItem } from "@mui/material";

const DropDown = ({
  fieldName,
  handleChange,
  list,
  state,
  render,
  disabled,
  placeHolder,
  label,
}) => {
  return (
    <Box sx={{ flex: 1, position: "relative" }}>
      <InputLabel
        htmlFor={fieldName}
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
          fontWeight: 400,
          fontSize: "1rem",
          lineHeight: "1.4375em",
          letterSpacing: "0.00938em",
          padding: 0,
          position: "absolute",
          left: "10px",
          top: "20px",
          backgroundColor: "#FFFFFF",
          padding: "0 5px",
          zIndex: 1,
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          transformOrigin: "top left",
          transform: "translate(0, -1.5px) scale(0.75)",
          maxWidth: "133%",
          transition:
            "color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          WebkitTransform: "translate(0, -1.5px) scale(0.75)",
          MozTransform: "translate(0, -1.5px) scale(0.75)",
          MsTransform: "translate(0, -1.5px) scale(0.75)",
          color: "#191919",
        }}
        shrink={!!state}
      >
        {label}
      </InputLabel>

      <Select
        disabled={disabled ? disabled : ""}
        id={fieldName}
        variant="outlined"
        name={fieldName}
        sx={{
          opacity: "0.6",
          width: "100%",
          backgroundColor: "#FFFFFF !important",
          borderRadius: "20px !important",
          height: "63px",
          "& .MuiSelect-select": {
            textAlign: "center",
            paddingTop: "15px",
          },
          "&:before, &:after": {
            border: "none", // Remove the default underline
          },
          "&.Mui-focused .MuiSelect-select": {
            border: "none", // Remove border when focused
          },
          "&:hover .MuiSelect-select": {
            border: "none", // No border on hover
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // No outline border
          },
          "&:hover": {
            backgroundColor: "#FFFFFF !important", // Maintain background color on hover
          },
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF !important", // Maintain background color when focused
          },
          "&.Mui-active": {
            backgroundColor: "#FFFFFF !important", // Ensure background color stays when active
          },
        }}
        value={state}
        onChange={handleChange}
        displayEmpty
        required
      >
        <MenuItem value="" disabled>
          Select {placeHolder}
        </MenuItem>
        {list.map((item) => render(item))}
      </Select>
    </Box>
  );
};

export default DropDown;
