// CustomTypography.jsx
import React from "react";
import { Typography } from "@mui/material";

const CustomTypography = ({ variant, children, sx, ...otherProps }) => {
  return (
    <Typography variant={variant} sx={sx} {...otherProps}>
      {children}
    </Typography>
  );
};

export default CustomTypography;
