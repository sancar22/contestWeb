import React from "react";
import { withRouter } from "react-router-dom";
//import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
//import * as ROUTES from '../../routes/Routes'
//import App from '../app/App'
import {useSelector, useDispatch} from 'react-redux'
//import {logManager} from '../../actions/index'
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import Navigation from "../navigation/Navigation";
import WrappedMap from "../map/Map";
//app.initializeApp(config);

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
  function sendCase(){
    console.log("Entré")
    const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';
        let data = {
            "to": brigadistas.selectedBrigade,
            "title": "Hello",
            "body": "World",
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
      }).catch(err => console.log(err))
  }
}

export default withRouter(HomePage);
