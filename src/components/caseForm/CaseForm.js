import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
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
  let fetch = require("node-fetch"); // Para hacer el http request
  const brigadistas = useSelector(state => state.brigada);
  const fillCase = useSelector(state => state.fillCase)
  const dispatch = useDispatch();
  const [dformat, setDFormat] = useState('')
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.Email}
    </li>
  ));


  const filterOptions1 = createFilterOptions({options});

  return (
    <div className="bod">
      <br />
      <div className="texto">Brigadistas seleccionados:</div>
      <ul className="list">{selectedBrigade}</ul>
      <div className="texto" style={{position:"relative", top:"3vh"}}>Lugar de emergencia:</div>
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
          <div className="texti" style={{marginLeft:"2vw"}}>Código:</div>
        </div>

        <div className="div2" style={{width: "70%"}}>
             <div className="texti" style={{marginLeft:"3.9vw"}}>Categoría:</div>
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
      <div className="texti" style={{marginLeft:"2.2vw"}}>Descripción adicional:</div>
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

 
    function sendCase() {
    //Botón para enviar notificaciones
    dateFormat();
    updateCaseBranch()
    dispatch(fillPlace(null))
    dispatch(fillCode(null))
    dispatch(fillCategory(null))
    dispatch(fillDescription(''))
    setTimeout(() => notifExpired(), 10000);  
    pushNotification()
    resetSelected();
  }

  
  function dateFormat(){
    Number.prototype.padLeft = function(base,chr){
      let  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    let d = new Date,
    dform = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join('/') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
    setDFormat(dform);
  }

  function updateCaseBranch(){
    brigadistas.selectedBrigade.map(
      brigade => 
      app
      .database()
      .ref("/Casos/" + brigade.UID + brigade.receivedNotif.toString())
      .update({
          lugar:fillCase.lugarEmergencia.label, 
          codigo:fillCase.codigo.label, 
          categoria:fillCase.categoria.label, 
          descripcion:fillCase.descAdicional,
          inicioFecha: dformat,
          finalFecha: "",
          tInicial: 0,
          tFinal: 0,
          tTranscurrido: 0
        }))
  }

  function pushNotification(){
    const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
    let data = {
      to: brigadistas.selectedBrigade.map(brigada => brigada.Expotoken),
      title: "He",
      body: "---",
      sound: "default",
      ttl: 5, //MODIFICAR DESPUÉS
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
      alert(err)
    );
  }

  function notifExpired(){
    console.log("lO HICE")
    brigadistas.selectedBrigade.map(
    brigade => app.database().ref("/Users/" + brigade.UID).update({notif:false}))
    
    brigadistas.selectedBrigade.map( (brigade)=>
      app.database().ref("/Users/" + brigade.UID).once("value", snapshot =>{
          let data1 = snapshot.val().receivedNotif
          let data2 = snapshot.val().accepted
          let data3 = snapshot.val().UID
          let data4 = data1-data2;
          app.database().ref("/Users/" + data3).update({rejected:data4})
      })
    )
  
    }

    function resetSelected() {
      // Para al enviar el caso deseleccionar a todos
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
 
}

export default CaseForm;
