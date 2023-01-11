import { Typography } from "@mui/material";
import React from "react";

function Card({ persona }) {
  return (
    <div
      style={{
        width: "40rem",
        height: "5rem",
        backgroundColor: "#D92323",
        marginTop: "2rem",
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        color: "white",
      }}
    >
      <Typography variant="h5">{persona.nombre}</Typography>
      <Typography variant="h5">{persona.razonSocial}</Typography>
    </div>
  );
}

export default Card;
