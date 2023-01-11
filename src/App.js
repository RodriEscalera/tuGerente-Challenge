import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import DropDown from "./components/DropDown";
import Starting from "./components/Starting";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { setResults } from "./store/results";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  const fetchPeople = async () => {
    const querySnapShot = await getDocs(collection(db, "personas"));
    let people = [];
    querySnapShot.forEach((doc) => {
      people.push({ ...doc.data(), idf: doc.id });
    });
    people = people.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    dispatch(setResults(people));
  };

  useEffect(() => {
    fetchPeople();
  }, []);
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
