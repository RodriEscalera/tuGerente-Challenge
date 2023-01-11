import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/modal";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function ModalEdit({ idPeople }) {
  //------------------> REDUX

  const results = useSelector((state) => state.results);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  //------------------> REDUX

  //------------------> MODAL
  const handleOpen = () => {
    dispatch(setModal(!modal));
  };
  //------------------> MODAL

  //-------------------> INPUTS
  const [inputs, setInputs] = useState({
    nombre: "",
    razonSocial: "",
    nit: "",
    telefono: "",
    codigo: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = () => {
    addOrEditPerson(inputs);
  };
  //-------------------> INPUTS

  //-------------------> FIREBASE
  const addOrEditPerson = async (object) => {
    try {
      if (idPeople === "") {
        const add = await addDoc(collection(db, "personas"), object);
        alert("Persona añadida con exito!!");
      } else {
        const personRef = doc(db, "personas", idPeople);
        const update = await updateDoc(personRef, object);
        alert("Datos actualizados con exito!!");
      }
    } catch (e) {
      console.log("ERROR!!");
    }
  };

  const getPeopleById = async (idPeople) => {
    const personData = await getDoc(doc(db, "personas", idPeople));
    setInputs({ ...personData.data() });
  };
  //-------------------> FIREBASE

  useEffect(() => {
    if (idPeople === "") {
      setInputs({
        nombre: "",
        razonSocial: "",
        nit: "",
        telefono: "",
        codigo: "",
      });
    } else {
      getPeopleById(idPeople);
    }
  }, [idPeople]);

  return (
    <Modal
      open={modal}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {idPeople === ""
            ? "Añada una nueva persona!"
            : "Actualice los datos!"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={inputs.nombre}
            onChange={handleInputs}
            name="nombre"
            style={inputStyle}
            id="modal-modal-description"
            variant="filled"
            label="Nombre"
          ></TextField>
          <TextField
            value={inputs.razonSocial}
            onChange={handleInputs}
            name="razonSocial"
            style={inputStyle}
            id="modal-modal-description"
            variant="filled"
            label="Razón social"
          ></TextField>
          <TextField
            value={inputs.nit}
            onChange={handleInputs}
            name="nit"
            style={inputStyle}
            id="modal-modal-description"
            variant="filled"
            label="Nit"
          ></TextField>
          <TextField
            value={inputs.telefono}
            onChange={handleInputs}
            name="telefono"
            style={inputStyle}
            id="modal-modal-description"
            variant="filled"
            label="Teléfono"
          ></TextField>
          <TextField
            value={inputs.codigo}
            onChange={handleInputs}
            name="codigo"
            style={inputStyle}
            id="modal-modal-description"
            variant="filled"
            label="Código"
          ></TextField>
        </form>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ width: "6rem", marginTop: "1rem" }}
        >
          {idPeople === "" ? "AÑADIR" : "ACTUALIZAR"}
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalEdit;

const style = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  position: "absolute",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};
const inputStyle = {
  marginTop: "1rem",
  width: "20rem",
};
