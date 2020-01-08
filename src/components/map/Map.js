import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import { selectMarker } from "../../actions/index";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";

function Map() {
  const [selectedBrigade, setSelectedBrigade] = useState();
  const brigadistas = useSelector(state => state.brigada); // Para acceder al estado global de brigadistas
  const dispatch = useDispatch();
  

  function onMarkerClickHandler(brigadista) {
    // Para manejar el estado de seleccionado en el mapa
      app
      .database()
      .ref("/Users/" + brigadista.UID)
      .update({
        selected: !brigadista.selected
      })
        
      //setSelectedBrigade(brigadista) // Para mostrar info window
       // Para añadirlo al estado global de seleccionado
  };

  useEffect(()=>{
    dispatch(selectMarker(brigadistas.brigadeListOnline))
  },[brigadistas.brigadeListOnline]) // Por ahora solo depende de la lista de brigada Online
  
 
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

      {selectedBrigade && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedBrigade(null);
          }}
          position={{
            lat: selectedBrigade.Latitud,
            lng: selectedBrigade.Longitud
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
