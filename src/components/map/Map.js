import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "../../testData/brigadistas.json";
import { useSelector, useDispatch } from "react-redux";
import { selectMarker } from "../../actions/index";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";

function Map() {
  const [selectedPark, setSelectedPark] = useState();
  const brigadistas = useSelector(state => state.brigada); // Para acceder al estado global de brigadistas
  const dispatch = useDispatch();

  const onMarkerClickHandler = brigadista => {
    app
      .database()
      .ref("/Users/" + brigadista.UID)
      .update({
        selected: !brigadista.selected
      });
  };

  let Markers = brigadistas.brigadeListOnline.map(brigadista => (
    <Marker
      key={brigadista.UID}
      position={{
        lat: brigadista.Latitud,
        lng: brigadista.Longitud
      }}
      //onMouseOver={ ()=>
      //setSelectedPark(park)
      //
      onClick={() => onMarkerClickHandler(brigadista)}
      label={brigadista.Email}
      icon={{
        url: brigadista.selected ? "icon1.png" : "icon2.jpg",
        scaledSize: new window.google.maps.Size(25, 25)
      }}
    />
  ));

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 11.0082944, lng: -74.8340518 }}
    >
      {Markers}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <img src={require("./brigada1.jpg")} />
            <h1>Roberto Gutiérrez</h1>
            <p1>Uno de los brigadistas más destacados</p1>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
