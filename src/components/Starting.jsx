import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setResults } from "../store/results";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
function Starting() {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();

  //----------------> FILTERS STATES
  const [nombre, setNombre] = useState(true);
  const [razonSocial, setRazonSocial] = useState(true);
  const [nit, setNit] = useState(true);
  const [telefono, setTelefono] = useState(true);
  const [codigo, setCodigo] = useState(true);

  const handleNombre = () => {
    setNombre(!nombre);
    setInputs({ ...inputs, nombre: "" });
  };
  const handleRazonSocial = () => {
    setRazonSocial(!razonSocial);

    setInputs({ ...inputs, razonSocial: "" });
  };
  const handleNit = () => {
    setNit(!nit);

    setInputs({ ...inputs, nit: "" });
  };
  const handleTelefono = () => {
    setTelefono(!telefono);

    setInputs({ ...inputs, telefono: "" });
  };
  const handleCodigo = () => {
    setCodigo(!codigo);

    setInputs({ ...inputs, codigo: "" });
  };
  //----------------> FILTERS STATES

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
  const handleSearch = () => {
    dispatch(setResults(filtro()));
  };

  //-------------------> FILTROS

  const filtro = () => {
    let filtros = [];
    let arreglo = [];
    let contador = 0;

    if (inputs.nombre.length > 0) {
      filtros.push("nombre");
    }
    if (inputs.razonSocial.length > 0) {
      filtros.push("razonSocial");
    }
    if (inputs.nit.length > 0) {
      filtros.push("nit");
    }
    if (inputs.telefono.length > 0) {
      filtros.push("telefono");
    }
    if (inputs.codigo.length > 0) {
      filtros.push("codigo");
    }

    const retornar = [];
    results.map((res) => {
      res.filter((result) => {
        for (let i = 0; i < filtros.length; i++) {
          if (result[filtros[i]] == inputs[filtros[i]]) {
            contador += 1;
            //  console.log(contador + filtros[i]);
          }
        }
        if (contador == filtros.length) {
          arreglo.push(result);
          contador = 0;
        }

        //console.log(filtros);
        return arreglo;
      });
    });
    return arreglo;
  };

  //-------------------> FILTROS
  //-------------------> FIREBASE

  const addPerson = async (object) => {
    const add = await addDoc(collection(db, "personas"), object);
    alert("Persona añadida con exito!!");
  };

  const fetchPeople = async () => {
    const querySnapShot = await getDocs(collection(db, "personas"));
    const people = [];
    querySnapShot.forEach((doc) => {
      people.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setResults(people));
  };
  //-------------------> FIREBASE

  const [isAbelToAdd, setIsAbelToAdd] = useState(true);

  useEffect(() => {
    if (
      inputs.nombre.length > 0 &&
      inputs.razonSocial.length > 0 &&
      inputs.nit.length > 0 &&
      inputs.telefono.length > 0 &&
      inputs.codigo.length > 0
    ) {
      setIsAbelToAdd(false);
    } else {
      setIsAbelToAdd(true);
    }
  }, [inputs]);

  return (
    <div
      style={{
        marginTop: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Buscar personas... 🔎
      </Typography>
      {/* --------------------------------------------------------------- */}
      <div>
        <TextField
          value={inputs.nombre}
          disabled={nombre}
          onChange={handleInputs}
          name="nombre"
          autoComplete="off"
          variant="filled"
          label="Nombre"
          sx={{ width: "26rem", marginTop: "1.3rem" }}
        />
        <Button
          onClick={handleNombre}
          variant="contained"
          sx={{
            marginTop: "2rem",
            marginLeft: "2rem",
            backgroundColor: nombre ? "#D92323" : "#08A9FF",
            "&:hover": {
              backgroundColor: nombre ? "#D92323" : "#08A9FF",
            },
          }}
        >
          {nombre ? <CloseIcon /> : <DoneIcon />}
        </Button>
      </div>
      <div>
        <TextField
          value={inputs.razonSocial}
          disabled={razonSocial}
          onChange={handleInputs}
          name="razonSocial"
          autoComplete="off"
          variant="filled"
          label="Razón social"
          sx={{ width: "26rem", marginTop: "1.3rem" }}
        />
        <Button
          onClick={handleRazonSocial}
          variant="contained"
          sx={{
            marginTop: "2rem",
            marginLeft: "2rem",
            backgroundColor: razonSocial ? "#D92323" : "#08A9FF",
            "&:hover": {
              backgroundColor: razonSocial ? "#D92323" : "#08A9FF",
            },
          }}
        >
          {razonSocial ? <CloseIcon /> : <DoneIcon />}
        </Button>
      </div>

      <div>
        <TextField
          disabled={nit}
          onChange={handleInputs}
          name="nit"
          autoComplete="off"
          variant="filled"
          label="Nit"
          sx={{ width: "26rem", marginTop: "1.3rem" }}
        />
        <Button
          onClick={handleNit}
          variant="contained"
          sx={{
            marginTop: "2rem",
            marginLeft: "2rem",
            backgroundColor: nit ? "#D92323" : "#08A9FF",
            "&:hover": {
              backgroundColor: nit ? "#D92323" : "#08A9FF",
            },
          }}
        >
          {nit ? <CloseIcon /> : <DoneIcon />}
        </Button>
      </div>
      <div>
        <TextField
          disabled={telefono}
          onChange={handleInputs}
          name="telefono"
          autoComplete="off"
          variant="filled"
          label="Teléfono"
          sx={{ width: "26rem", marginTop: "1.3rem" }}
        />
        <Button
          onClick={handleTelefono}
          variant="contained"
          sx={{
            marginTop: "2rem",
            marginLeft: "2rem",
            "&:hover": {
              backgroundColor: telefono ? "#D92323" : "#08A9FF",
            },
            backgroundColor: telefono ? "#D92323" : "#08A9FF",
          }}
        >
          {telefono ? <CloseIcon /> : <DoneIcon />}
        </Button>
      </div>
      <div>
        <TextField
          disabled={codigo}
          onChange={handleInputs}
          name="codigo"
          autoComplete="off"
          variant="filled"
          label="Código"
          sx={{ width: "26rem", marginTop: "1.3rem" }}
        />
        <Button
          onClick={handleCodigo}
          variant="contained"
          sx={{
            marginTop: "2rem",
            marginLeft: "2rem",
            backgroundColor: codigo ? "#D92323" : "#08A9FF",
            "&:hover": {
              backgroundColor: codigo ? "#D92323" : "#08A9FF",
            },
          }}
        >
          {codigo ? <CloseIcon /> : <DoneIcon />}
        </Button>
      </div>
      {/* --------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "20rem",
        }}
      >
        <Button
          variant="contained"
          sx={{
            height: "3rem",
            width: "3rem",
            marginTop: "1rem",
            backgroundColor: "#D92323",
            "&:hover": {
              backgroundColor: "#D92323",
            },
          }}
          onClick={async () => {
            for (let i = 0; i < 51; i++) {
              const object = {
                codigo: "4400",
                nit: "44",
                id: i,
                nombre: `Juan ${i}`,
                razonSocial: `Maxi kiosco ${i}`,
                telefono: "911",
              };
              await addDoc(collection(db, "personas"), object);
            }
          }}
        >
          Seed
        </Button>

        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            height: "3rem",
            width: "3rem",
            marginTop: "1rem",
            backgroundColor: "#D92323",
            "&:hover": {
              backgroundColor: "#D92323",
            },
          }}
        >
          <SearchIcon />
        </Button>

        <Button
          onClick={fetchPeople}
          variant="contained"
          sx={{
            height: "3rem",
            width: "3rem",
            marginTop: "1rem",
            backgroundColor: "#D92323",
            "&:hover": {
              backgroundColor: "#D92323",
            },
          }}
        >
          <ReplayIcon />
        </Button>
        <Button
          onClick={() => addPerson(inputs)}
          disabled={isAbelToAdd}
          variant="contained"
          sx={{
            height: "3rem",
            width: "3rem",
            marginTop: "1rem",
            backgroundColor: "#D92323",
            "&:hover": {
              backgroundColor: "#D92323",
            },
          }}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

export default Starting;
