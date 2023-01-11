import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import DropDown from "./components/DropDown";
import Starting from "./components/Starting";
function App() {
  return (
    <div>
      <NavBar />
      <Starting />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <DropDown />
      </div>
      <div style={{ height: "4rem" }}></div>
    </div>
  );
}

export default App;
