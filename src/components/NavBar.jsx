import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import tuGerenteIcon from "../assets/tugerentelogo.png";
import { Box } from "@mui/system";
function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "white" }}>
        <Box sx={{ flexGrow: "0.5" }}></Box>
        <img style={{ width: "20%" }} src={tuGerenteIcon} />
        <Box sx={{ flexGrow: "0.5" }}></Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
