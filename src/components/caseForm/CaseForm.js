import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./CaseForm.css";
import _ from "lodash";
import VirtualizedSelect from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import {options, optionsPlace, optionsCod, optionsCategory} from './Options'

import { TextArea } from "semantic-ui-react";
import { relative } from "path";

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.Email}
    </li>
  ));
  let fetch = require("node-fetch"); // Para hacer el http request

  const filterOptions1 = createFilterOptions({options});

  const [valuePlace, setValuePlace] = useState(null);
  const [valueDescription, setValueDescription] = useState("");
  const [valueCod, setValueCod] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);
console.log(valuePlace)
  return (
    <div className="bod">
      <br />
      <text className="texto">Brigadistas seleccionados:</text>
      <ul className="list">{selectedBrigade}</ul>
      <text className="texto" style={{position:"relative", top:"3vh"}}>Lugar de emergencia:</text>
      <div style={{ width: "26.3vw", marginLeft: "1.8vw", position:"relative", top:"3vh" }}>
        <VirtualizedSelect
          name="lugar"
          value={valuePlace}
          options={optionsPlace}
          filterOptions={filterOptions1}
          onChange={val => setValuePlace(val)}
        />
      </div>

      <div className="div1" style={{top:"5vh", position:"relative"}} >
        <div className="div2" style={{ width: "30%"}}>
          <text className="texti" style={{marginLeft:"2vw"}}>Código:</text>
        </div>

        <div className="div2" style={{width: "70%"}}>
             <text className="texti" style={{marginLeft:"3.9vw"}}>Categoría:</text>
        </div>
      </div>

      <div className="div3" >
        <div className="div2" style={{width: "30%",marginLeft: "1.8vw"}}>
         <VirtualizedSelect
          name="lugar"
          value={valueCod}
          options={optionsCod}
          onChange={val => setValueCod(val)}
        />
        </div>
       
        <div className="div2" style={{ width: "50%",marginLeft: "2.3vw"}}>
         <VirtualizedSelect
          name="lugar"
          value={valueCategory}
          options={optionsCategory}
          onChange={val => setValueCategory(val)}
        />
        </div>
      </div>
      <div style={{top:"9vh", position:"relative"}}>
      <text className="texti" style={{marginLeft:"2.2vw"}}>Descripción adicional:</text>
      </div>
      <textarea
        placeholder="Añadir información adicional pertinente..."
        className="inputtext"
        value={valueDescription}
        onChange={event => setValueDescription(event.target.value)}
      />
      <button className="but" onClick={sendCase}>
        Send Case
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
      to: brigadistas.selectedBrigade.map(brigada => brigada.Expotoken),
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

export default CaseForm;
