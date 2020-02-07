import React, { useEffect, useState, useRef } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./ClosedCases.css";
import ClipLoader from "react-spinners/ClipLoader";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";
import TableC from "../tableC/TableC";
import { css } from "@emotion/core";
import FilterC from "../filterC/filterC";
function ClosedCases(props) {
  const allCases = useSelector(state => state.casos);
  const counter = useRef(0);
  const [loading, setLoading] = useState(true);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [showName, setShowName] = useState(false);
  const [filterPlace, setFilterPlace] = useState("");
  const [showPlace, setShowPlace] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };
  const override = loading
    ? css`
        display: block;
        margin: 0 auto;
        border-color: red;
        margin-top: 30vh;
      `
    : css`
        display: none;
      `;
  app.auth().onAuthStateChanged(user => {
    // Para llevarlo a login window si no está conectado
    if (!user) {
      props.history.push("/");
    }
  });
  const photoLoader = length => {
    counter.current += 1;

    if (counter.current >= length * 2) {
      setLoading(false);
    }
  };

  const filterNow = (field, option) => {
    if (option.label === "Nombre") {
      setShowPlace(false);
      setShowCategory(false);
      setShowName(true);
      setFilterName(
        allCases
          .filter(
            data =>
              data.active === false &&
              data.nombre + " " + data.apellido === field.label
          )
          .map((item, index) => {
            const length = allCases.filter(
              data =>
                data.active === false &&
                data.nombre + " " + data.apellido === field.label
            ).length;
            return (
              <TableC
                index={index}
                photoLoader={photoLoader}
                item={item}
                length={length}
              />
            );
          })
      );
    } else if (option.label === "Lugar") {
      setShowPlace(true);
      setShowCategory(false);
      setShowName(false);
      setFilterPlace(
        allCases
          .filter(data => data.active === false && data.lugar === field.label)
          .map((item, index) => {
            const length = allCases.filter(
              data => data.active === false && data.lugar === field.label
            ).length;
            return (
              <TableC
                index={index}
                photoLoader={photoLoader}
                item={item}
                length={length}
              />
            );
          })
      );
    } else if (option.label === "Categoría") {
      setShowPlace(false); // Acuerda de agregar nuevas cosas y cambiar estados
      setShowCategory(true);
      setShowName(false);
      setFilterCategory(
        allCases
          .filter(
            data => data.active === false && data.categoria === field.label
          )
          .map((item, index) => {
            const length = allCases.filter(
              data => data.active === false && data.categoria === field.label
            ).length;
            return (
              <TableC
                index={index}
                photoLoader={photoLoader}
                item={item}
                length={length}
              />
            );
          })
      );
    }
  };

  let showArray =
    allCases.length > 0 &&
    allCases
      .filter(data => data.active === false)
      .map((item, index) => {
        const length = allCases.filter(data => data.active === false).length;

        return (
          <TableC
            index={index}
            photoLoader={photoLoader}
            item={item}
            length={length}
          />
        );
      });
  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
      <Navigation sideFunction={drawerToggleClickHandler} />
      {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
      <SideDrawer shown={sideDrawerOpen} click={drawerToggleClickHandler} />
      <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={"#123abc"}
        loading={loading}
      />

      <div
        style={{
          overflow: "auto",
          width: "100%",
          height: "87%",
          display: loading ? "none" : "block"
        }}
      >
        <FilterC filterNow={filterNow} />
        <table className="tableClosed">
          <tr>
            <th>Brigadista</th>
            <th>Detalles</th>
            <th>Descripción</th>
            <th>Apoyos</th>
            <th>Otros Brigadistas</th>
            <th>Proceder</th>
            <th>Fotos</th>
          </tr>
          {allCases.length > 0 && showName === true
            ? filterName
            : showCategory === true
            ? filterCategory
            : showPlace === true
            ? filterPlace
            : showArray}
        </table>
      </div>
    </div>
  );
}

export default ClosedCases;
