import React, { useState, useEffect } from "react";
import { selectMarker } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import Navigation from "../navigation/Navigation";
import _ from "lodash";
import { Map, Popup, TileLayer, Marker } from "react-leaflet";
import "./HomePage.css";
import L from "leaflet";

function HomePage(props) {
  const brigadistas = useSelector(state => state.brigada); // Para acceder a estado global de Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectMarker(brigadistas.brigadeListOnline));
  }, [brigadistas.brigadeListOnline]); // Por ahora solo depende de la lista de brigada Online

  app.auth().onAuthStateChanged(user => {
    // Para llevarlo a login window si no está conectado
    if (!user) {
      props.history.push("/");
    }
  });

  function onMarkerClickHandler(brigadista) {
    app
      .database()
      .ref("/Users/" + brigadista.UID)
      .update({
        selected: !brigadista.selected
      });
  }

  const messageIcon = brigad => { // Crea íconos
    return L.icon({
      iconUrl: brigad ? "icon1.png" : "icon2.png", // Decide colocar ícono dependiendo de estado
      iconSize: brigad ? [30, 30] : [50,50]
    });
  };

  let Markers = brigadistas.brigadeListOnline.map(brigadista => ( // Marcadores
    <Marker
      key={brigadista.UID}
      position={[brigadista.Latitud, brigadista.Longitud]}
      icon={messageIcon(brigadista.selected)}
      onclick={() => onMarkerClickHandler(brigadista)}
    ></Marker>
  ));

  let fetch = require("node-fetch"); // Para hacer el http request

  return (
    <div>
      <Navigation />
      <Map className="map" center={[11.0192471, -74.8505]} zoom={18}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {Markers}
      </Map>

      <button className="but" onClick={sendCase}>
        Send case
      </button>
    </div>
  );


  function resetSelected() {
    // Para al refrescar la página deseleccionar todos los marcadores
    return app
      .database()
      .ref("/Users")
      .once("value", snapshot => {
        const fireData = _.toArray(snapshot.val());
        fireData.forEach(child => {
          app
            .database()
            .ref("/Users/" + child.UID)
            .update({
              selected: false
            });
        });
      });
  }

  function sendCase() {
    //Botón para enviar notificaciones
    const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
    let data = {
      to: brigadistas.selectedBrigade,
      title: "Carlos es un bollito",
      body: "Vale",
      sound: "default",
      data: {
        name: "Mañe",
        ape: "Towers"
      },
      priority: "high"
    };

    fetch(PUSH_ENDPOINT, {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(err =>
      alert("No ha seleccionado un brigadista o no hay conexión a internet.")
    );
    resetSelected();
  }
}

export default withRouter(HomePage);
