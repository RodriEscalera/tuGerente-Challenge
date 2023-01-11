import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import ModalEdit from "./ModalEdit";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/modal";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Card from "../commons/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { setResults } from "../store/results";
import InfiniteScroll from "react-infinite-scroll-component";
function DropDown() {
  //------------------> DROP
  const [isDrop, setIsDrop] = useState(false);
  const handleDrop = () => {
    setIsDrop(!isDrop);
  };
  //------------------> DROP

  //------------------> REDUX
  const results = useSelector((state) => state.results);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  //------------------> REDUX

  //------------------> MODAL
  const handleOpen = () => {
    setIdPeople("");
    dispatch(setModal(!modal));
  };
  //------------------> MODAL

  //------------------> HOVER EFFECT
  const [hoverEffect, setHoverEffect] = useState(false);
  const handleHover = () => {
    setHoverEffect(true);
  };
  const handleLeave = () => {
    setHoverEffect(false);
  };
  //------------------> HOVER EFFECT

  //------------------> FIREBASE
  const fetchPeople = async () => {
    const querySnapShot = await getDocs(collection(db, "personas"));
    const people = [];
    querySnapShot.forEach((doc) => {
      people.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setResults(people));
  };

  const deletePeople = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminarlo?")) {
      await deleteDoc(doc(db, "personas", id));
      fetchPeople();
      alert("Persona eliminada con exito!");
    }
  };

  //------------------> FIREBASE

  //------------------> MAPPING

  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      setData(results[pageNumber]);
    }
  }, [results]);

  const handleScroll = () => {
    const n = pageNumber;
    setPageNumber((previousState) => previousState + 1);

    setData([...data, ...results[n + 1]]);
  };

  const [idPeople, setIdPeople] = useState("");
  const handleUpdate = (id) => {
    setIdPeople(id);
    dispatch(setModal(!modal));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        scale: "0.7",
      }}
    >
      <div
        style={{
          width: "40rem",
          height: "5rem",
          backgroundColor: "#D92323",
          borderRadius: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isDrop ? "-10rem" : "0",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          MOSTRAR LOS RESULTADOS
        </Typography>
        <IconButton onClick={handleDrop}>
          {isDrop ? (
            <KeyboardArrowDownIcon sx={{ fontSize: "2rem", color: "white" }} />
          ) : (
            <KeyboardArrowUpIcon sx={{ fontSize: "2rem", color: "white" }} />
          )}
        </IconButton>
      </div>
      {isDrop ? (
        <div
          id="scrollableDiv"
          style={{
            backgroundColor: "#282828",
            width: "70rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <div
            onClick={handleOpen}
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
            style={{
              ...añadirPersonaStyle,
              color: hoverEffect ? "black" : "white",
            }}
          >
            <Typography variant="h5">AÑADIR PERSONA</Typography>
          </div>
          <ModalEdit idPeople={idPeople} />
          <InfiniteScroll
            hasMore={true}
            dataLength={data.length}
            next={handleScroll}
            height={"50rem"}
            scrollableTarget="scrollableDiv"
          >
            {data?.length > 0
              ? data.map((persona) => (
                  <div style={{ display: "flex" }}>
                    <Card persona={persona} />
                    <Button
                      onClick={() => deletePeople(persona.id)}
                      sx={{
                        height: "3rem",
                        marginTop: "3rem",
                        marginLeft: "1rem",
                        color: "white",
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      onClick={() => handleUpdate(persona.idf)}
                      sx={{
                        height: "3rem",
                        marginTop: "3rem",
                        marginLeft: "1rem",
                        color: "white",
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </div>
                ))
              : null}
          </InfiniteScroll>
          <div style={{ height: "2.5rem" }}></div>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;

const añadirPersonaStyle = {
  width: "20rem",
  height: "4rem",
  backgroundColor: "#D92323",
  marginTop: "2rem",
  borderRadius: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "0.3s",
  cursor: "pointer",
};
