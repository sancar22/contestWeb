import React, { useEffect, useState, useRef } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./ClosedCases.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
function ClosedCases(props) {
  const allCases = useSelector(state => state.casos);
  const counter = useRef(0);
  const [loading, setLoading] = useState(true);
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
  const photoLoader = () => {
    counter.current += 1;
    if (counter.current >= allCases.length * 2) {
      setLoading(false);
    }
  };
  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
      <Navigation />
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
          {allCases.length > 0 &&
            allCases
              .filter(data => data.active === false)
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.nombre + " " + item.apellido}</td>

                    <td>
                      <div
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <div>Lugar: {item.lugar}</div>
                        <div>Código: {item.codigo}</div>
                        <div>Categoría: {item.categoria}</div>
                        <div>Comienzo: {item.inicioFecha}</div>
                        <div>Fin: {item.finalFecha}</div>
                        <div>Tiempo Total: {item.formatTime}</div>
                      </div>
                    </td>
                    <td>
                      <div>{item.descripcion}</div>
                    </td>
                    <td>
                      <div
                        style={{
                          flexDirection: "column",
                          display: "flex"
                        }}
                      >
                        {item.bombero && <div>Bombero</div>}
                        {item.ambulancia && <div>Ambulancia</div>}
                        {item.camilla && <div>Camilla</div>}
                        {item.extintor && <div>Extintor</div>}
                        {item.policia && <div>Policía</div>}
                        {item.apoyo && <div>Apoyo</div>}
                      </div>
                    </td>
                    <td>
                      <div>No disponible por el momento.</div>
                    </td>
                    <td>{item.descBrigadista}</td>
                    <td>
                      <a href={item.image1} target="_blank">
                        <img
                          onLoad={photoLoader}
                          src={item.image1}
                          height="100"
                          width="100"
                        />
                      </a>
                      <a href={item.image2} target="_blank">
                        <img
                          onLoad={photoLoader}
                          src={item.image2}
                          height="100"
                          width="100"
                        />
                      </a>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    </div>
  );
}

export default ClosedCases;
