import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {fillPlace, fillCode, fillCategory, fillDescription} from '../../actions/index'

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const fillCase = useSelector(state => state.fillCase)
  const dispatch = useDispatch();
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.Email}
    </li>
  ));
  let fetch = require("node-fetch"); // Para hacer el http request

  const filterOptions1 = createFilterOptions({options});

  const [valueDescription, setValueDescription] = useState("");
  const [valueCod, setValueCod] = useState(null);
  const [valueCategory, setValueCategory] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null)

  


  return (
    <div className="bod">
      <br />
      <text className="texto">Brigadistas seleccionados:</text>
      <ul className="list">{selectedBrigade}</ul>
      <text className="texto" style={{position:"relative", top:"3vh"}}>Lugar de emergencia:</text>
      <div style={{ width: "26.3vw", marginLeft: "1.8vw", position:"relative", top:"3vh" }}>
        <VirtualizedSelect
          name="lugar"
          value={fillCase.lugarEmergencia}
          options={optionsPlace}
          filterOptions={filterOptions1}
          onChange={val => dispatch(fillPlace(val))}
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
          value={fillCase.codigo}
          options={optionsCod}
          onChange={val => dispatch(fillCode(val))}
        />
        </div>
       
        <div className="div2" style={{ width: "50%",marginLeft: "2.3vw"}}>
         <VirtualizedSelect
          name="lugar"
          value={fillCase.categoria}
          options={optionsCategory}
          onChange={val => dispatch(fillCategory(val))}
        />
        </div>
      </div>
      <div style={{top:"9vh", position:"relative"}}>
      <text className="texti" style={{marginLeft:"2.2vw"}}>Descripción adicional:</text>
      </div>
      <textarea
        placeholder="Añadir información adicional pertinente..."
        className="inputtext"
        value={fillCase.descAdicional}
        onChange={event => dispatch(fillDescription(event.target.value))}
      />
      <button className="but" onClick={sendCase}>
        Enviar Alerta
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
        
    


     brigadistas.selectedBrigade.map(
      brigade => app.database().ref("/Users/" + brigade.UID).update({notif:true}))
     brigadistas.selectedBrigade.map(
     brigade => app.database().ref("/Casos/" + brigade.UID + brigade.receivedNotif.toString()).update({lugar:fillCase.lugarEmergencia.label, codigo:fillCase.codigo.label, categoria:fillCase.categoria.label, descripcion:fillCase.descAdicional}))
      dispatch(fillPlace(null))
      dispatch(fillCode(null))
      dispatch(fillCategory(null))
      dispatch(fillDescription(''))
      setTimeout(function(){
      
      brigadistas.selectedBrigade.map(
      brigade => app.database().ref("/Users/" + brigade.UID).update({notif:false}))
       
      brigadistas.selectedBrigade.map( (brigade)=>
        app.database().ref("/Users/" + brigade.UID).on("value", snapshot =>{
            let data1 = snapshot.val().receivedNotif
            let data2 = snapshot.val().accepted
            let data3 = snapshot.val().UID
            let data4 = data1-data2;
            app.database().ref("/Users/" + data3).update({rejected:data4})
        })
      )
      
     
       }, 10000);  

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
