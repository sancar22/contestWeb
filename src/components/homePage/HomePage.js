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
import CaseForm from "../caseForm/CaseForm";

function HomePage(props) {
  const brigadistas = useSelector(state => state.brigada); // Para acceder a estado global de Redux
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(null); //responsiveness
  const [windowHeight, setWindowHeight] = useState(null); 
  useEffect(() => {
    dispatch(selectMarker(brigadistas.brigadeListOnline));
  }, [brigadistas.brigadeListOnline]); // Por ahora solo depende de la lista de brigada Online
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(document.body.clientWidth);
    });
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);
  app.auth().onAuthStateChanged(user => {
    // Para llevarlo a login window si no está conectado
    if (!user) {
      props.history.push("/");
    }
  });
 console.log(windowWidth, windowHeight)
  function onMarkerClickHandler(brigadista) {
    app
      .database()
      .ref("/Users/" + brigadista.UID)
      .update({
        selected: !brigadista.selected
      });
  }

  const messageIcon = brigad => {
    // Crea íconos
    return L.icon({
      iconUrl: brigad ? "icon1.png" : "icon2.png", // Decide colocar ícono dependiendo de estado
      iconSize: brigad ? [30, 30] : [50, 50]
    });
  };

  let Markers = brigadistas.brigadeListOnline.map((
    brigadista // Marcadores
  ) => (
    <Marker
      key={brigadista.UID}
      position={[brigadista.Latitud, brigadista.Longitud]}
      icon={messageIcon(brigadista.selected)}
      onclick={() => onMarkerClickHandler(brigadista)}
    ></Marker>
  ));

  return (
    <body
      className="bodyTotal"
      style={{ width: windowWidth, height: windowHeight }}
    >
      <Navigation />
      <div className="dive">
        <CaseForm />
        <Map className="map" center={[11.0192471, -74.8505]} zoom={18}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {Markers}
        </Map>
      </div>
    </body>
  );
}

export default withRouter(HomePage);
