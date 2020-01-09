import React from "react";
import { withRouter } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import Navigation from "../navigation/Navigation";
import WrappedMap from "../map/Map";
import _ from 'lodash'


function HomePage(props) {
  
  const brigadistas = useSelector(state => state.brigada)
  let fetch = require('node-fetch')
  app.auth().onAuthStateChanged(user => { 
    // Para llevarlo a login window si no está conectado
    if (!user) {
      props.history.push("/");
    }
  });

  return (
    <div style={{ height: "70vw", width: "100vw" }}>
      
      <Navigation />
     
     
      <WrappedMap
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAXTE9UMazOIBLjnJDwLOKVupyvjoxtVuU"
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    
      <button onClick={sendCase}>Send case</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
  function logout() {
    firebase.logout();
    props.history.replace("/"); //Irse a página de login al hacer logout
  }

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


  function sendCase(){
    console.log("Entré")
    const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
        let data = {
            "to": brigadistas.selectedBrigade,
            "title": "Carlos es un bollito",
            "body": "Vale",
            "sound": "default",
            "data": {
              "name": "Mañe",
              "ape": "Towers"
            },
            "priority": 'high',

        }
    
        fetch(PUSH_ENDPOINT, {
          'mode': 'no-cors',
          'method': 'POST',
          'headers': {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      }).catch(err => alert('No ha seleccionado un brigadista o no hay conexión a internet.'))
      resetSelected()
  }
}

export default withRouter(HomePage);
