import "./Stats.css";
import React, { useState, useEffect } from "react";
import { selectMarker } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import Navigation from "../navigation/Navigation";

function Stats(props) {
  const allBrigadistas = useSelector(state => state.brigada.allBrigades);
  let orderedArray = allBrigadistas;
  const compare = (a, b) => {
    const elementA = a.acceptRatio;
    const elementB = b.acceptRatio;

    let comparison = 0;
    if (elementA > elementB) {
      comparison = 1;
    } else if (elementA < elementB) {
      comparison = -1;
    }
    return comparison * -1;
  };
  orderedArray.sort(compare);

  console.log(orderedArray);
  let displayStats = orderedArray.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={item.imagen} height="50" width="50" />
        </td>
        <td>{item.nombre + " " + item.apellido}</td>
        <td>{item.accepted}</td>
        <td>{item.receivedNotif}</td>
        <td>{(item.acceptRatio * 100).toFixed(2)}</td>
      </tr>
    );
  });
  const dispatch = useDispatch();

  app.auth().onAuthStateChanged(user => {
    // Para llevarlo a login window si no está conectado
    if (!user) {
      props.history.push("/");
    }
  });

  return (
    <div>
      <Navigation />
      <table className="tableStats">
        <tr>
          <th>Imagen</th>
          <th>Brigadista</th>
          <th>Aceptados</th>
          <th>Totales</th>
          <th>Aceptados%</th>
        </tr>
        {displayStats}
      </table>
    </div>
  );
}

export default withRouter(Stats);
