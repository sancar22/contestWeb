import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import HomePage from "../homePage/HomePage";
import SignUp from "../signUp/SignUp";
import * as ROUTES from "../../routes/Routes";
//import {useSelector, useDispatch} from 'react-redux'
//import {logManager} from '../../actions/index'
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import firebase from "../../routes/Config";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { selectMarker } from "../../actions/index";
import { selectOnlineGuards } from "../../actions/index";

//import Navigation from '../navigation/Navigation'

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  const dispatch = useDispatch();

  function getDataOnlineUsers() {
    // Para obtener información de todos los usuarios online
    return app
      .database()
      .ref("/Users")
      .orderByChild("online")
      .equalTo(true)
      .on("value", snapshot => {
        const firebaseData = _.toArray(snapshot.val()); // Pasar el snapshot a un array
        //console.log(firebaseData)
        dispatch(selectOnlineGuards(firebaseData)); // Se hace un dispatch a la store para guardarlo en el estado global
      });
  }
  function resetSelected() {
    console.log("Pasé por acá");
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

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
      // Esto se actualiza cada vez que se cambie algo en la base de datos
    });
    resetSelected();
    getDataOnlineUsers();
  }, []);

  return firebaseInitialized !== false ? (
    <Router>
      <div>
        <Switch>
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        </Switch>
      </div>
    </Router>
  ) : (
    <h1>Loading</h1>
  );
}

export default App;
