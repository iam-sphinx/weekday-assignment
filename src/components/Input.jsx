import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Input({ label, state, setState }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      
      noValidate
      autoComplete="off"
    >
      <TextField
        
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </Box>
  );
}
